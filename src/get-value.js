import redis from "src/redis"
export default async function (deck, short_name) {
  await redis.init()
  return await redis.get(`status__${deck}__${short_name}`)
}
