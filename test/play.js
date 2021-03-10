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
  test.serial(`${deck} play`, async (t) => {
    let result
    const { redis_pub } = t.context
    await redis_pub.publish(
      "purple-sector",
      `command__${deck}__unload__trigger`
    )
    await delay(100)
    await redis_pub.publish("purple-sector", `command__${deck}__volume__0`)
    await redis_pub.publish("purple-sector", "command__global__select__top")
    await delay(40)

    await redis_pub.publish("purple-sector", `command__${deck}__load__trigger`)
    await waitForValue(`status__${deck}__load`, "true", 3_000)

    await redis_pub.publish("purple-sector", `command__${deck}__play__start`)
    await delay(100)
    await redis_pub.publish("purple-sector", `command__${deck}__play__stop`)
    await delay(100)
    await redis_pub.publish("purple-sector", `command__${deck}__play__start`)
    result = await waitForValue(`status__${deck}__play`, "true", 1_000)
    t.true(result)
    await redis_pub.publish("purple-sector", `command__${deck}__play__stop`)
    result = await waitForValue(`status__${deck}__play`, "false", 1_000)
    t.true(result)
    await redis_pub.publish("purple-sector", `command__${deck}__volume__110`)
  })
}
