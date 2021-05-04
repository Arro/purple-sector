import { redis } from "./redis"
export default function (deck, short_name, val) {
  redis.publish("purple-sector", `command__${deck}__${short_name}__${val}`)
}
