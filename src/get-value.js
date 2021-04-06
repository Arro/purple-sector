import Redis from "ioredis"
export default async function (deck, short_name) {
  const redis = new Redis()
  const value = await redis.get(`status__${deck}__${short_name}`)
  redis.disconnect()
  return value
}
