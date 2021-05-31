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
  test(`${deck} filter`, async (t) => {
    let result

    redis.publish(`command__${deck}__filter__0`)
    await delay(100)
    redis.publish(`command__${deck}__filter__25`)
    result = await redis.waitForValue(`status__${deck}__filter`, "26")
    t.true(result)
    redis.publish(`command__${deck}__filter__124`)
    result = await redis.waitForValue(`status__${deck}__filter`, "123")
    t.true(result)
    redis.publish(`command__${deck}__filter__63`)
    result = await redis.waitForValue(`status__${deck}__filter`, "63")
    t.true(result)
  })

  test(`${deck} filter on/off`, async (t) => {
    let result
    redis.publish(`command__${deck}__filter__on`)
    await delay(100)
    redis.publish(`command__${deck}__filter__off`)
    await delay(100)
    redis.publish(`command__${deck}__filter__on`)
    result = await redis.waitForValue(`status__${deck}__filter_on_off`, "true")
    t.true(result)
    redis.publish(`command__${deck}__filter__off`)
    result = await redis.waitForValue(`status__${deck}__filter_on_off`, "false")
    t.true(result)
  })
}
