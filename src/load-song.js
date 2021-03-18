import Redis from "ioredis"
import delay from "./delay"
import { waitForValue } from "src/wait-for-value"

export default async function (num, deck) {
  const redis = new Redis()

  await delay(100)
  redis.publish("purple-sector", `command__${deck}__unload__trigger`)
  await delay(40)
  redis.publish("purple-sector", "command__global__select__bottom")
  await delay(40)
  redis.publish("purple-sector", "command__global__select__top")
  await delay(40)

  let current_pos = 0
  while (current_pos !== num) {
    if (num - current_pos >= 100) {
      redis.publish("purple-sector", "command__global__select__down_100")
      current_pos += 100
    } else if (num - current_pos >= 10) {
      redis.publish("purple-sector", "command__global__select__down_10")
      current_pos += 10
    } else {
      redis.publish("purple-sector", "command__global__select__down")
      current_pos += 1
    }
    await delay(40)
  }
  redis.publish("purple-sector", `command__${deck}__load__trigger`)
  await waitForValue(`status__${deck}__load`, "true", 3_000)
}
