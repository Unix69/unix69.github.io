import axios from "axios";
import { redis } from "@/lib/redis";

export default async function handler(req, res) {
  try {
    const { data } = await axios.get(
      "https://api.cal.com/v1/slots",
      {
        headers: {
          Authorization: `Bearer ${process.env.CAL_API_KEY}`,
        },
        params: {
          eventTypeId: process.env.CAL_EVENT_TYPE_ID,
          startTime: new Date().toISOString(),
          endTime: new Date(Date.now() + 7 * 86400000).toISOString(),
        },
      }
    );

    // 1. fetch active locks
    const keys = await redis.keys("lock:cal-slot:*");

    // 2. convert locks → blocked slots
    const lockedSlots = new Set(
      keys.map(k => k.replace("lock:cal-slot:", ""))
    );

    // 3. filter availability
    const filtered = {
      ...data,
      slots: data.slots.filter(slot => {
        return !lockedSlots.has(slot.startTime);
      }),
    };

    return res.status(200).json(filtered);

  } catch (err) {
    return res.status(500).json({
      error: "Failed to fetch availability",
      details: err.message,
    });
  }
}