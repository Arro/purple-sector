import test from "ava"
import { spawn } from "child_process"
import Redis from "ioredis"
import waitForValue from "src/wait-for-value"

test.before(async (t) => {
  t.context.purple = spawn("./dist/cli.js", [], {})
  t.context.redis = new Redis()
  t.context.redis.set("stage", "start")
})

test.after.always(async (t) => {
  t.context.purple.kill()
})

test("background", async (t) => {
  t.timeout(60_000)
  let result
  await t.context.redis.set("stage", "first_wave")

  result = await waitForValue("stage", "first_wave", 5_000)
  await t.true(result)

  result = await waitForValue("stage", "done", 60_000)
  await t.true(result)
})
