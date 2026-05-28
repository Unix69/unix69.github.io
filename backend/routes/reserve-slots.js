import { acquireLock, releaseLock } from "@/lib/lock";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { start } = req.body;

  const lockKey = `lock:cal-slot:${start}`;

  const { acquired, token } = await acquireLock(lockKey);

  if (!acquired) {
    return res.status(409).json({
      error: "Slot temporarily reserved",
    });
  }

  return res.status(200).json({
    success: true,
    token,
  });
}