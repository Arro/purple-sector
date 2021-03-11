import test from "ava"
import Redis from "ioredis"
import waitForValue from "src/wait-for-value"
import path from "path"
import delay from "src/delay"
import { registerSharedWorker } from "ava/plugin"
import { SharedContext } from "@ava/cooperate"
import { move_size_to_val } from "constants/conversions"

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

    await redis.publish("purple-sector", `command__${deck}__size__63`)
    await delay(100)
    await redis.publish("purple-sector", `command__${deck}__size__0`)
    await delay(100)
    for (const size in move_size_to_val) {
      const val = move_size_to_val[size]
      await redis.publish("purple-sector", `command__${deck}__size__${val}`)

      await waitForValue(`status__${deck}__size`, `${val}`, 1_000)
    }

    t.pass()
  })
}
