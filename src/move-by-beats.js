import Redis from "ioredis"
import delay from "src/delay"
import waitForValue from "src/wait-for-value"

export default async function (beats, deck) {
  const redis = new Redis()

  redis.publish("purple-sector", `command__${deck}__size__4`)
  await delay(40)

  await redis.publish("purple-sector", `command__${deck}__size__1`)
  await waitForValue(`status__${deck}__size`, "1", 1_000)

  redis.publish("purple-sector", `command__${deck}__mode__loop`)
  await delay(40)
  redis.publish("purple-sector", `command__${deck}__mode__beatjump`)

  let current_beat = 0
  while (current_beat !== beats) {
    if (current_beat < beats) {
      await redis.publish("purple-sector", `command__${deck}__move__forward`)
      await delay(40)
      current_beat += 1
    } else {
      await redis.publish("purple-sector", `command__${deck}__move__back`)
      await delay(40)
      current_beat -= 1
    }
  }

  redis.incrby(`status__${deck}__beats`, beats)
}
