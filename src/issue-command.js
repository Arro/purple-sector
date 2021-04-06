import Redis from "ioredis"
export default function (deck, short_name, val) {
  const redis = new Redis()
  redis.publish("purple-sector", `command__${deck}__${short_name}__${val}`)
  redis.disconnect()
}
