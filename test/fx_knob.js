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
  t.context.redis_pub = new Redis()

  const context = new SharedContext("purple")
  const lock = context.createLock("fx")
  await lock.acquire()
})

for (const unit of ["fx1", "fx2", "fx3", "fx4"]) {
  for (const knob of ["1", "2", "3"]) {
    test.serial(`${unit} knob ${knob}`, async (t) => {
      let result
      const { redis_pub } = t.context

      await redis_pub.publish(
        "purple-sector",
        `command__${unit}__knob_${knob}__0`
      )
      await delay(100)
      await redis_pub.publish(
        "purple-sector",
        `command__${unit}__knob_${knob}__20`
      )
      result = await waitForValue(`status__${unit}__knob_${knob}`, "19", 1_000)
      t.true(result)
      await redis_pub.publish(
        "purple-sector",
        `command__${unit}__knob_${knob}__105`
      )
      result = await waitForValue(`status__${unit}__knob_${knob}`, "105", 1_000)
      t.true(result)
      await redis_pub.publish(
        "purple-sector",
        `command__${unit}__knob_${knob}__63`
      )
      result = await waitForValue(`status__${unit}__knob_${knob}`, "63", 1_000)
      t.true(result)
    })
  }
}
