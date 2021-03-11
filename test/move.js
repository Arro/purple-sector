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
  const lock = context.createLock("deck")
  await lock.acquire()
})

for (const deck of ["a", "b", "c", "d"]) {
  test.serial(`${deck} move`, async (t) => {
    let result
    const { redis } = t.context
    await delay(100)
    await redis.publish("purple-sector", "command__global__select__top")

    await delay(100)
    await redis.publish("purple-sector", `command__${deck}__unload__trigger`)
    await delay(100)

    await redis.publish("purple-sector", `command__${deck}__load__trigger`)
    await waitForValue(`status__${deck}__load`, "true", 3_000)

    await redis.publish("purple-sector", `command__${deck}__position__0`)
    result = await waitForValue(`status__${deck}__position`, "0", 1_000)
    t.true(result)

    await redis.publish("purple-sector", `command__${deck}__jump_next__trigger`)
    await delay(100)

    await redis.publish("purple-sector", `command__${deck}__mode__loop`)
    await delay(100)
    await redis.publish("purple-sector", `command__${deck}__mode__beatjump`)
    await delay(100)
    await redis.publish("purple-sector", `command__${deck}__size__0`)
    await delay(100)
    await redis.publish("purple-sector", `command__${deck}__size__105`)

    await waitForValue(`status__${deck}__size`, "105", 1_000)

    await redis.publish("purple-sector", `command__${deck}__move__forward`)

    await waitForValue(`status__${deck}__position`, "6", 1_000)

    await redis.publish("purple-sector", `command__${deck}__move__back`)
    await waitForValue(`status__${deck}__position`, "0", 1_000)
    t.pass()
  })
}
