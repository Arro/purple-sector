import test from "ava"
import waitForValue from "src/wait-for-value"
import loadSong from "src/load-song"
import moveToBeat from "src/move-to-beat"
import moveByBeats from "src/move-by-beats"
import path from "path"
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
  test.serial(`${deck} move`, async (t) => {
    await loadSong(0, deck)

    await moveToBeat(16, deck)

    await waitForValue(`status__${deck}__beats`, "16", 1_000)

    await moveByBeats(16, deck)

    await waitForValue(`status__${deck}__beats`, "32", 1_000)

    t.pass()
  })
}
