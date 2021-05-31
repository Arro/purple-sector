import delay from "src/delay"
import realSizeToSize from "constants/real-size-to-size.json"
import redis from "src/redis"

export default async function (beat, deck) {
  await redis.init()

  redis.publish(`command__${deck}__size__1`)
  await delay(40)
  redis.publish(`command__${deck}__size__4`)
  await delay(40)

  redis.publish(`command__${deck}__mode__loop`)
  await delay(40)
  redis.publish(`command__${deck}__mode__beatjump`)

  let current_beat = await redis.get(`status__${deck}__beats`)
  current_beat = parseInt(current_beat)
  let move_direction = current_beat < beat ? "forward" : "back"

  while (current_beat !== beat) {
    let [real_size, size_to_move] = realSizeToSize.find((s) => {
      if (move_direction === "forward") {
        return beat - current_beat >= s[0]
      } else {
        return current_beat - beat >= s[0]
      }
    })
    redis.publish(`command__${deck}__size__${size_to_move}`)
    await redis.waitForValue(`status__${deck}__size`, size_to_move, 1_000)
    redis.publish(`command__${deck}__move__${move_direction}`)
    await delay(40)
    if (move_direction === "forward") {
      current_beat += real_size
    } else {
      current_beat -= real_size
    }
  }
  redis.set(`status__${deck}__beats`, beat)
}
