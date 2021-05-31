import test from "ava"
import loadSong from "src/load-song"
import moveToBeat from "src/move-to-beat"
import moveByBeats from "src/move-by-beats"
import { SharedContext } from "@ava/cooperate"
import redis from "src/redis"

test.before(async (t) => {
  t.timeout(20_000)
  await redis.init()
  const context = new SharedContext("purple")
  const lock = context.createLock("deck")
  await lock.acquire()
})

for (const deck of ["a", "b", "c", "d"]) {
  test.serial(`${deck} move`, async (t) => {
    await loadSong(0, deck)

    await moveToBeat(16, deck)

    await redis.waitForValue(`status__${deck}__beats`, "16", 1_000)

    await moveByBeats(16, deck)

    await redis.waitForValue(`status__${deck}__beats`, "32", 1_000)

    t.pass()
  })
}
