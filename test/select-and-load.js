import test from "ava"
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
  const context = new SharedContext("purple")
  const lock = context.createLock("deck")
  await lock.acquire()
})

for (const deck of ["a", "b", "c", "d"]) {
  test.serial(`load into ${deck}`, async (t) => {
    await delay(50)
    let result
    await loadSong(16, deck)

    result = await waitForValue(`status__${deck}__load`, "true", 3_000)
    t.true(result)
  })
}
