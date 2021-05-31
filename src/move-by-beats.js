import delay from "src/delay"
import redis from "src/redis"

export default async function (beats, deck) {
  await redis.init()
  redis.publish(`command__${deck}__size__4`)
  await delay(40)

  await redis.publish(`command__${deck}__size__1`)
  await redis.waitForValue(`status__${deck}__size`, "1", 1_000)

  redis.publish(`command__${deck}__mode__loop`)
  await delay(40)
  redis.publish(`command__${deck}__mode__beatjump`)

  let current_beat = 0
  while (current_beat !== beats) {
    if (current_beat < beats) {
      await redis.publish(`command__${deck}__move__forward`)
      await delay(40)
      current_beat += 1
    } else {
      await redis.publish(`command__${deck}__move__back`)
      await delay(40)
      current_beat -= 1
    }
  }

  redis.incrby(`status__${deck}__beats`, beats)
}
