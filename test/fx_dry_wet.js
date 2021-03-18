import test from "ava"
import Redis from "ioredis"
import waitForValue from "src/wait-for-value"
import path from "path"
import delay from "src/delay"
import { registerSharedWorker } from "ava/plugin"
import { SharedContext } from "@ava/cooperate"

registerSharedWorker({
  filename: path.resolve(__dirname, "worker.js"),
  supportedProtocols: ["experimental"]
})

test.before(async (t) => {
  t.timeout(10_000)
  t.context.redis = new Redis()

  const context = new SharedContext("purple")
  const lock = context.createLock("fx")
  await lock.acquire()
})

for (const unit of ["fx1", "fx2", "fx3", "fx4"]) {
  test.serial(`${unit} dry/wet`, async (t) => {
    let result
    const { redis } = t.context

    redis.publish("purple-sector", `command__${unit}__dry_wet__0`)
    await delay(100)
    redis.publish("purple-sector", `command__${unit}__dry_wet__20`)
    result = await waitForValue(`status__${unit}__dry_wet`, "19", 1_000)
    t.true(result)
    redis.publish("purple-sector", `command__${unit}__dry_wet__105`)
    result = await waitForValue(`status__${unit}__dry_wet`, "105", 1_000)
    t.true(result)
    redis.publish("purple-sector", `command__${unit}__dry_wet__63`)
    result = await waitForValue(`status__${unit}__dry_wet`, "63", 1_000)
    t.true(result)
  })
}
