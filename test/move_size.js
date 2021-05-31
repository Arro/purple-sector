import test from "ava"
import delay from "src/delay"
import { SharedContext } from "@ava/cooperate"
import redis from "src/redis"
import size_to_value from "constants/size-to-value.json"

test.before(async (t) => {
  t.timeout(20_000)
  await redis.init()
  const context = new SharedContext("purple")
  const lock = context.createLock("deck")
  await lock.acquire()
})

for (const deck of ["a", "b", "c", "d"]) {
  test(`${deck} move`, async (t) => {
    redis.publish(`command__${deck}__size__1`)
    await delay(100)
    redis.publish(`command__${deck}__size__1_64`)
    await delay(100)
    for (const size in size_to_value) {
      redis.publish(`command__${deck}__size__${size}`)

      await redis.waitForValue(`status__${deck}__size`, `${size}`)
    }

    t.pass()
  })
}
