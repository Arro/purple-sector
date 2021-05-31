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

for (const unit of ["fx1", "fx2", "fx3", "fx4"]) {
  test(`${unit} mode`, async (t) => {
    let result
    redis.publish(`command__${unit}__fx_mode__group`)
    await delay(100)
    redis.publish(`command__${unit}__fx_mode__single`)
    await delay(100)
    redis.publish(`command__${unit}__fx_mode__group`)
    result = await redis.waitForValue(`status__${unit}__fx_mode`, "false")
    t.true(result)
    redis.publish(`command__${unit}__fx_mode__single`)
    result = await redis.waitForValue(`status__${unit}__fx_mode`, "true")
    t.true(result)
  })
}
