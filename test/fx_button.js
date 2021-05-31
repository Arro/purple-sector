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
  for (const button of ["2", "3"]) {
    test(`${unit} button ${button}`, async (t) => {
      let result
      redis.publish(`command__${unit}__button_${button}__on`)
      await delay(100)
      redis.publish(`command__${unit}__button_${button}__off`)
      await delay(100)
      redis.publish(`command__${unit}__button_${button}__on`)
      result = await redis.waitForValue(
        `status__${unit}__button_${button}`,
        "true"
      )
      t.true(result)
      redis.publish(`command__${unit}__button_${button}__off`)
      result = await redis.waitForValue(
        `status__${unit}__button_${button}`,
        "false"
      )
      t.true(result)
    })
  }
}
