import delay from "src/delay"
import redis from "src/redis"

export default async function (num, deck) {
  await redis.init()

  await delay(100)
  redis.publish(`command__${deck}__unload__trigger`)
  await delay(40)
  redis.publish("command__global__select__bottom")
  await delay(40)
  redis.publish("command__global__select__top")
  await delay(40)

  let current_pos = 0
  while (current_pos !== num) {
    if (num - current_pos >= 100) {
      redis.publish("command__global__select__down_100")
      current_pos += 100
    } else if (num - current_pos >= 10) {
      redis.publish("command__global__select__down_10")
      current_pos += 10
    } else {
      redis.publish("command__global__select__down")
      current_pos += 1
    }
    await delay(40)
  }
  redis.publish(`command__${deck}__load__trigger`)
  await redis.waitForValue(`status__${deck}__load`, "true", 3_000)

  redis.publish(`command__${deck}__waveform_zoom__0`)
  await redis.waitForValue(`status__${deck}__waveform_zoom`, "0", 3_000)

  redis.publish(`command__${deck}__position__50`)
  await redis.waitForValue(`status__${deck}__position`, "50", 3_000)

  redis.publish(`command__${deck}__position__0`)
  await redis.waitForValue(`status__${deck}__position`, "0", 3_000)

  redis.publish(`command__${deck}__jump_next__trigger`)
  redis.set(`status__${deck}__beats`, 0)
}
