import test from "ava"
import delay from "src/delay"
import { SharedContext } from "@ava/cooperate"
import redis from "src/redis"
import loadSong from "src/load-song"

test.before(async (t) => {
  t.timeout(20_000)
  await redis.init()
  const context = new SharedContext("purple")
  const lock = context.createLock("deck")
  await lock.acquire()
})

for (const deck of ["a", "b", "c", "d"]) {
  test.serial(`${deck} play`, async (t) => {
    let result
    await loadSong(0, deck)
    await redis.waitForValue(`status__${deck}__load`, "true")

    redis.publish(`command__${deck}__play__start`)
    await delay(100)
    redis.publish(`command__${deck}__play__stop`)
    await delay(100)
    redis.publish(`command__${deck}__play__start`)
    result = await redis.waitForValue(`status__${deck}__play`, "true")
    t.true(result)
    redis.publish(`command__${deck}__play__stop`)
    result = await redis.waitForValue(`status__${deck}__play`, "false")
    t.true(result)
  })
}
