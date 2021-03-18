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
  test.serial(`load into ${deck}`, async (t) => {
    await delay(50)
    let result
    const { redis } = t.context

    redis.publish("purple-sector", `command__${deck}__unload__trigger`)
    await delay(100)

    redis.publish("purple-sector", `command__global__select__top`)

    await delay(40)
    for (let i = 0; i < 16; i++) {
      redis.publish("purple-sector", `command__global__select__down`)
      await delay(40)
    }

    redis.publish("purple-sector", `command__${deck}__load__trigger`)

    result = await waitForValue(`status__${deck}__load`, "true", 3_000)
    t.true(result)

    redis.publish("purple-sector", `command__${deck}__unload__trigger`)

    result = await waitForValue(`status__${deck}__load`, "false", 3_000)
    t.true(result)
  })
}
