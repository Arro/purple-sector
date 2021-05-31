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
  test(`${unit} dry/wet`, async (t) => {
    let result

    redis.publish(`command__${unit}__dry_wet__0`)
    await delay(100)
    redis.publish(`command__${unit}__dry_wet__20`)
    result = await redis.waitForValue(`status__${unit}__dry_wet`, "19")
    t.true(result)
    redis.publish(`command__${unit}__dry_wet__105`)
    result = await redis.waitForValue(`status__${unit}__dry_wet`, "105")
    t.true(result)
    redis.publish(`command__${unit}__dry_wet__63`)
    result = await redis.waitForValue(`status__${unit}__dry_wet`, "63")
    t.true(result)
  })
}
