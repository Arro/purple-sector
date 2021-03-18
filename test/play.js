import test from "ava"
import Redis from "ioredis"
import waitForValue from "src/wait-for-value"
import loadSong from "src/load-song"
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
  test.serial(`${deck} play`, async (t) => {
    let result
    const { redis } = t.context
    await loadSong(0, deck)
    await waitForValue(`status__${deck}__load`, "true", 3_000)

    redis.publish("purple-sector", `command__${deck}__play__start`)
    await delay(100)
    redis.publish("purple-sector", `command__${deck}__play__stop`)
    await delay(100)
    redis.publish("purple-sector", `command__${deck}__play__start`)
    result = await waitForValue(`status__${deck}__play`, "true", 1_000)
    t.true(result)
    redis.publish("purple-sector", `command__${deck}__play__stop`)
    result = await waitForValue(`status__${deck}__play`, "false", 1_000)
    t.true(result)
  })
}
