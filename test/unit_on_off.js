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
  test(`${unit} unit on/off`, async (t) => {
    let result

    redis.publish(`command__${unit}__unit__on`)
    await delay(100)
    redis.publish(`command__${unit}__unit__off`)
    await delay(100)
    redis.publish(`command__${unit}__unit__on`)
    result = await redis.waitForValue(`status__${unit}__unit_on_off`, "true")
    t.true(result)
    redis.publish(`command__${unit}__unit__off`)
    result = await redis.waitForValue(`status__${unit}__unit_on_off`, "true")
    t.true(result)
  })
}
