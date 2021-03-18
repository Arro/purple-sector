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
  test.serial(`${unit} mode`, async (t) => {
    let result
    const { redis } = t.context
    redis.publish("purple-sector", `command__${unit}__fx_mode__group`)
    await delay(100)
    redis.publish("purple-sector", `command__${unit}__fx_mode__single`)
    await delay(100)
    redis.publish("purple-sector", `command__${unit}__fx_mode__group`)
    result = await waitForValue(`status__${unit}__fx_mode`, "false", 1_500)
    t.true(result)
    redis.publish("purple-sector", `command__${unit}__fx_mode__single`)
    result = await waitForValue(`status__${unit}__fx_mode`, "true", 1_500)
    t.true(result)
  })
}
