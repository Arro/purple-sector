import Redis from "ioredis"
import delay from "src/delay"
import waitForValue from "src/wait-for-value"

export default async function (beat, deck) {
  const redis = new Redis()
  redis.publish("purple-sector", `command__${deck}__size__4`)
  await delay(40)

  redis.publish("purple-sector", `command__${deck}__mode__loop`)
  await delay(40)
  redis.publish("purple-sector", `command__${deck}__mode__beatjump`)

  let current_beat = 0
  while (current_beat !== beat) {
    if (beat - current_beat >= 16) {
      redis.publish("purple-sector", `command__${deck}__size__16`)
      await waitForValue(`status__${deck}__size`, "16", 1_000)
      redis.publish("purple-sector", `command__${deck}__move__forward`)
      await delay(40)
      current_beat += 16
    } else {
      redis.publish("purple-sector", `command__${deck}__size__1`)
      await waitForValue(`status__${deck}__size`, "1", 1_000)
      redis.publish("purple-sector", `command__${deck}__move__forward`)
      await delay(40)
      current_beat += 1
    }
  }
  redis.set(`status__${deck}__beats`, beat)
}
