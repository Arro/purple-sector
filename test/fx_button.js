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
  for (const button of ["2", "3"]) {
    test.serial(`${unit} button ${button}`, async (t) => {
      let result
      const { redis } = t.context
      redis.publish("purple-sector", `command__${unit}__button_${button}__on`)
      await delay(100)
      redis.publish("purple-sector", `command__${unit}__button_${button}__off`)
      await delay(100)
      redis.publish("purple-sector", `command__${unit}__button_${button}__on`)
      result = await waitForValue(
        `status__${unit}__button_${button}`,
        "true",
        1_000
      )
      t.true(result)
      redis.publish("purple-sector", `command__${unit}__button_${button}__off`)
      result = await waitForValue(
        `status__${unit}__button_${button}`,
        "false",
        1_000
      )
      t.true(result)
    })
  }
}
