import test from "ava"
import delay from "src/delay"
import { SharedContext } from "@ava/cooperate"
import redis from "src/redis"

test.before(async (t) => {
  t.timeout(20_000)
  await redis.init()
  const context = new SharedContext("purple")
  const lock = context.createLock("deck")
  await lock.acquire()
})

for (const deck of ["a", "b", "c", "d"]) {
  test(`${deck} cue`, async (t) => {
    let result
    redis.publish(`command__${deck}__cue__on`)
    await delay(100)
    redis.publish(`command__${deck}__cue__off`)
    await delay(100)
    redis.publish(`command__${deck}__cue__on`)
    result = await redis.waitForValue(`status__${deck}__cue`, "true")
    t.true(result)
    redis.publish(`command__${deck}__cue__off`)
    result = await redis.waitForValue(`status__${deck}__cue`, "false")
    t.true(result)
  })
}
