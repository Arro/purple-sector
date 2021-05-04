import { redis } from "./redis"
export default async function (deck, short_name) {
  return await redis.get(`status__${deck}__${short_name}`)
}
