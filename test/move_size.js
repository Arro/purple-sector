import test from "ava"
import Redis from "ioredis"
import waitForValue from "src/wait-for-value"
import path from "path"
import delay from "src/delay"
import { registerSharedWorker } from "ava/plugin"
import { SharedContext } from "@ava/cooperate"
import size_to_value from "constants/size-to-value.json"

registerSharedWorker({
  filename: path.resolve(__dirname, "worker.js"),
  supportedProtocols: ["experimental"]
})

test.before(async (t) => {
  t.timeout(10_000)
  t.context.redis = new Redis()
  const context = new SharedContext("purple")
  const lock = context.createLock("deck")
  await lock.acquire()
})

for (const deck of ["a", "b", "c", "d"]) {
  test(`${deck} move`, async (t) => {
    const { redis } = t.context

    await redis.publish("purple-sector", `command__${deck}__size__1`)
    await delay(100)
    await redis.publish("purple-sector", `command__${deck}__size__1_64`)
    await delay(100)
    for (const size in size_to_value) {
      await redis.publish("purple-sector", `command__${deck}__size__${size}`)

      await waitForValue(`status__${deck}__size`, `${size}`, 1_000)
    }

    t.pass()
  })
}
