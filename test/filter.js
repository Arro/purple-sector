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
  const lock = context.createLock("mixer")
  await lock.acquire()
})

for (const deck of ["a", "b", "c", "d"]) {
  test(`${deck} filter`, async (t) => {
    let result
    const { redis } = t.context

    redis.publish("purple-sector", `command__${deck}__filter__0`)
    await delay(100)
    redis.publish("purple-sector", `command__${deck}__filter__25`)
    result = await waitForValue(`status__${deck}__filter`, "26", 1_000)
    t.true(result)
    redis.publish("purple-sector", `command__${deck}__filter__124`)
    result = await waitForValue(`status__${deck}__filter`, "123", 1_000)
    t.true(result)
    redis.publish("purple-sector", `command__${deck}__filter__63`)
    result = await waitForValue(`status__${deck}__filter`, "63", 1_000)
    t.true(result)
  })

  test(`${deck} filter on/off`, async (t) => {
    let result
    const { redis } = t.context
    redis.publish("purple-sector", `command__${deck}__filter__on`)
    await delay(100)
    redis.publish("purple-sector", `command__${deck}__filter__off`)
    await delay(100)
    redis.publish("purple-sector", `command__${deck}__filter__on`)
    result = await waitForValue(`status__${deck}__filter_on_off`, "true", 1_000)
    t.true(result)
    redis.publish("purple-sector", `command__${deck}__filter__off`)
    result = await waitForValue(
      `status__${deck}__filter_on_off`,
      "false",
      1_000
    )
    t.true(result)
  })
}
