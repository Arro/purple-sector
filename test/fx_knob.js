import test from "ava"
import delay from "src/delay"
import { SharedContext } from "@ava/cooperate"
import redis from "src/redis"

test.before(async (t) => {
  t.timeout(10_000)
  await redis.init()

  const context = new SharedContext("purple")
  const lock = context.createLock("fx")
  await lock.acquire()
})

for (const unit of ["fx1", "fx2", "fx3", "fx4"]) {
  for (const knob of ["1", "2", "3"]) {
    test(`${unit} knob ${knob}`, async (t) => {
      let result

      redis.publish(`command__${unit}__knob_${knob}__0`)
      await delay(100)
      redis.publish(`command__${unit}__knob_${knob}__20`)
      result = await redis.waitForValue(`status__${unit}__knob_${knob}`, "19")
      t.true(result)
      redis.publish(`command__${unit}__knob_${knob}__105`)
      result = await redis.waitForValue(`status__${unit}__knob_${knob}`, "105")
      t.true(result)
      redis.publish(`command__${unit}__knob_${knob}__63`)
      result = await redis.waitForValue(`status__${unit}__knob_${knob}`, "63")
      t.true(result)
    })
  }
}
