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
  t.timeout(15_000)
  t.context.redis_pub = new Redis()
  const context = new SharedContext("purple")
  const lock = context.createLock("fx")
  await lock.acquire()
})

for (const deck of ["a", "b", "c", "d"]) {
  for (const unit of ["fx1", "fx2", "fx3", "fx4"]) {
    test.serial(`${deck} ${unit}`, async (t) => {
      let result
      const { redis_pub } = t.context

      await redis_pub.publish("purple-sector", `command__${deck}__${unit}__on`)
      await delay(100)
      await redis_pub.publish("purple-sector", `command__${deck}__${unit}__off`)
      await delay(100)
      await redis_pub.publish("purple-sector", `command__${deck}__${unit}__on`)
      result = await waitForValue(`status__${deck}__${unit}`, "true", 1_000)
      t.true(result)
      await redis_pub.publish("purple-sector", `command__${deck}__${unit}__off`)
      result = await waitForValue(`status__${deck}__${unit}`, "false", 1_000)
      t.true(result)
    })
  }
}
