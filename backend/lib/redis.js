import Redis from "ioredis";

export const redis = new Redis(process.env.REDIS_URL);

const LOCK_TTL = 10;

export async function acquireLock(key) {
  const result = await redis.set(
    key,
    "locked",
    "NX",
    "EX",
    LOCK_TTL
  );

  return result === "OK";
}

export async function releaseLock(key) {
  await redis.del(key);
}