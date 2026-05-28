import axios from "axios";
import { releaseLock } from "@/lib/lock";
import { redis } from "@/lib/redis";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    start,
    end,
    name,
    email,
    title,
    lockToken,
    idempotencyKey,
  } = req.body;

  if (!idempotencyKey) {
    return res.status(400).json({ error: "Missing idempotencyKey" });
  }

  const lockKey = `lock:cal-slot:${start}`;

  try {
    // 1. IDEMPOTENCY CHECK (fast path)
    const existing = await redis.get(`booking:${idempotencyKey}`);
    if (existing) {
      return res.status(200).json(JSON.parse(existing));
    }

    // 2. VERIFY LOCK
    const currentToken = await redis.get(lockKey);

    if (!currentToken || currentToken !== lockToken) {
      return res.status(409).json({
        error: "Invalid or expired reservation",
      });
    }

    // 3. BOOK (source of truth = Cal.com)
    const { data } = await axios.post(
      "https://api.cal.com/v1/bookings",
      {
        eventTypeId: process.env.CAL_EVENT_TYPE_ID,
        start,
        end,
        title,
        timeZone: "Europe/Rome",
        attendees: [{ name, email }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.CAL_API_KEY}`,
        },
      }
    );

    // 4. SAVE IDEMPOTENCY RESULT
    await redis.set(
      `booking:${idempotencyKey}`,
      JSON.stringify(data),
      "EX",
      60 * 60 * 24
    );

    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({
      error: "Booking failed",
      details: err.message,
    });

  } finally {
    // 5. SAFE LOCK RELEASE (IMPORTANT)
    await releaseLock(lockKey, lockToken);
  }
}