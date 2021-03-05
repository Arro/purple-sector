import test from "ava"
import { spawn } from "child_process"
import Redis from "ioredis"

const delay = async function (time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  })
}

test.before(async (t) => {
  t.context.redis = new Redis()
  t.context.redis_pub = new Redis()
  t.context.purple = spawn("./dist/cli.js", [], {})
  await delay(2000)
})

test.after("cleanup", async (t) => {
  await delay(1000)
  t.context.purple.kill()
})

test("a gain", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__a__gain__0")
  await delay(300)
  redis_pub.publish("purple-sector", "command__a__gain__20")
  await delay(300)
  value = await redis.get("status__a__gain")
  t.is(value, "20")
  redis_pub.publish("purple-sector", "command__a__gain__127")
  await delay(300)
  value = await redis.get("status__a__gain")
  t.is(value, "127")
  redis_pub.publish("purple-sector", "command__a__gain__20")
  await delay(300)
  value = await redis.get("status__a__gain")
  t.is(value, "20")
})
