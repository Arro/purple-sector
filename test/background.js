import test from "ava"
import { spawn } from "child_process"
import Redis from "ioredis"

const delay = async function (time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  })
}

const waitForValue = async function (redis, redis_sub) {
  await redis_sub.subscribe("__keyspace@0__:num_active_tests")
  return new Promise(function (resolve) {
    redis_sub.on("message", async () => {
      const num_active_tests = await redis.get("num_active_tests")
      if (num_active_tests === "0") {
        resolve()
      }
    })

    setTimeout(resolve, 60_000)
  })
}

test.before(async (t) => {
  t.context.purple = spawn("./dist/cli.js", [], {})
  t.context.redis_sub = new Redis()
  t.context.redis = new Redis()
  t.context.redis.set("num_active_tests", 0)
  await delay(2000)
})

test.after("cleanup", async (t) => {
  await delay(1000)
  t.context.purple.kill()
})

test("background", async (t) => {
  t.timeout(60_000)
  const { redis_sub, redis } = t.context

  await waitForValue(redis, redis_sub)
  await t.pass()
})
