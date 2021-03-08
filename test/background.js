import test from "ava"
import { spawn } from "child_process"
import Redis from "ioredis"
import waitForValue from "src/wait-for-value"

test.before(async (t) => {
  t.context.purple = spawn("./dist/cli.js", [], {})
  const redis = new Redis()
  await redis.set("num_active_tests", 0)
  await redis.set("test_batch", 0)
})

test.after.always(async (t) => {
  const redis = new Redis()
  await redis.set("test_batch", null)
  t.context.purple.kill()
})

test("background", async (t) => {
  t.timeout(60_000)
  let result

  // wait for num_active_tests to go above 0 once
  result = await waitForValue("num_active_tests", "0", 5_000, true)
  await t.true(result)

  // and then wait for it to return to 0
  result = await waitForValue("num_active_tests", "0", 60_000)
  await t.true(result)
})
