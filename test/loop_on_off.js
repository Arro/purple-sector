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
  test(`${deck} loop on/off`, async (t) => {
    let result
    redis.publish(`command__${deck}__loop__on`)
    await delay(100)
    redis.publish(`command__${deck}__loop__off`)
    await delay(100)
    redis.publish(`command__${deck}__loop__on`)
    result = await redis.waitForValue(`status__${deck}__loop_on_off`, "true")
    t.true(result)
    redis.publish(`command__${deck}__loop__off`)
    result = await redis.waitForValue(`status__${deck}__loop_on_off`, "false")
    t.true(result)
  })
}
