import test from "ava"
import delay from "src/delay"
import { SharedContext } from "@ava/cooperate"
import redis from "src/redis"

test.before(async (t) => {
  t.timeout(20_000)
  await redis.init()
  const context = new SharedContext("purple")
  const lock = context.createLock("fx")
  await lock.acquire()
})

for (const deck of ["a", "b", "c", "d"]) {
  for (const unit of ["fx1", "fx2", "fx3", "fx4"]) {
    test(`${deck} ${unit}`, async (t) => {
      let result

      redis.publish(`command__${deck}__${unit}__on`)
      await delay(100)
      redis.publish(`command__${deck}__${unit}__off`)
      await delay(100)
      redis.publish(`command__${deck}__${unit}__on`)
      result = await redis.waitForValue(`status__${deck}__${unit}`, "true")
      t.true(result)
      redis.publish(`command__${deck}__${unit}__off`)
      result = await redis.waitForValue(`status__${deck}__${unit}`, "false")
      t.true(result)
    })
  }
}
