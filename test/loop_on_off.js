import test from "ava"
import Redis from "ioredis"
import waitForValue from "src/wait-for-value"
import path from "path"
import delay from "src/delay"
import { registerSharedWorker } from "ava/plugin"

registerSharedWorker({
  filename: path.resolve(__dirname, "worker.js"),
  supportedProtocols: ["experimental"]
})

test.before(async (t) => {
  t.timeout(10_000)
  t.context.redis = new Redis()
})

for (const deck of ["a", "b", "c", "d"]) {
  test(`${deck} loop on/off`, async (t) => {
    let result
    const { redis } = t.context

    redis.publish("purple-sector", `command__${deck}__loop__on`)
    await delay(100)
    redis.publish("purple-sector", `command__${deck}__loop__off`)
    await delay(100)
    redis.publish("purple-sector", `command__${deck}__loop__on`)
    result = await waitForValue(`status__${deck}__loop_on_off`, "true", 1_000)
    t.true(result)
    redis.publish("purple-sector", `command__${deck}__loop__off`)
    result = await waitForValue(`status__${deck}__loop_on_off`, "false", 1_000)
    t.true(result)
  })
}
