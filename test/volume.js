import test from "ava"
import delay from "src/delay"
import { SharedContext } from "@ava/cooperate"
import redis from "src/redis"

test.before(async (t) => {
  t.timeout(20_000)
  await redis.init()

  const context = new SharedContext("purple")
  const lock = context.createLock("mixer")
  await lock.acquire()
})

for (const deck of ["a", "b", "c", "d"]) {
  test(`${deck} volume`, async (t) => {
    let result

    redis.publish(`command__${deck}__volume__0`)
    await delay(100)
    redis.publish(`command__${deck}__volume__25`)
    result = await redis.waitForValue(`status__${deck}__volume`, "25")
    t.true(result)
    redis.publish(`command__${deck}__volume__124`)
    result = await redis.waitForValue(`status__${deck}__volume`, "124")
    t.true(result)
    redis.publish(`command__${deck}__volume__110`)
    result = await redis.waitForValue(`status__${deck}__volume`, "110")
    t.true(result)
  })
}
