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
  const lock = context.createLock("mixer")
  await lock.acquire()
})

for (const deck of ["a", "b", "c", "d"]) {
  test(`${deck} volume`, async (t) => {
    let result
    const { redis_pub } = t.context

    await redis_pub.publish("purple-sector", `command__${deck}__volume__0`)
    await delay(100)
    await redis_pub.publish("purple-sector", `command__${deck}__volume__25`)
    result = await waitForValue(`status__${deck}__volume`, "25", 1_000)
    t.true(result)
    await redis_pub.publish("purple-sector", `command__${deck}__volume__124`)
    result = await waitForValue(`status__${deck}__volume`, "124", 1_000)
    t.true(result)
    await redis_pub.publish("purple-sector", `command__${deck}__volume__110`)
    result = await waitForValue(`status__${deck}__volume`, "110", 1_000)
    t.true(result)
  })
}
