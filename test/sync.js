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
  t.context.redis_pub = new Redis()
  const context = new SharedContext("purple")
  const lock = context.createLock("deck")
  await lock.acquire()
})

for (const deck of ["a", "b", "c", "d"]) {
  test(`${deck} sync`, async (t) => {
    let result
    const { redis_pub } = t.context

    await redis_pub.publish("purple-sector", `command__${deck}__sync__on`)
    await delay(100)
    await redis_pub.publish("purple-sector", `command__${deck}__sync__off`)
    await delay(100)
    await redis_pub.publish("purple-sector", `command__${deck}__sync__on`)
    result = await waitForValue(`status__${deck}__sync`, "true", 1_000)
    t.true(result)
    await redis_pub.publish("purple-sector", `command__${deck}__sync__off`)
    result = await waitForValue(`status__${deck}__sync`, "false", 1_000)
    t.true(result)
  })
}
