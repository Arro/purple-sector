import test from "ava"
import Redis from "ioredis"

const delay = async function (time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  })
}

test.before(async (t) => {
  t.context.redis = new Redis()
  t.context.redis_pub = new Redis()
  await delay(100)
  t.context.redis.incr("num_active_tests")
  await delay(3000)
})

test.after("cleanup", (t) => {
  t.context.redis.decr("num_active_tests")
})

test("a cue", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__a__cue__off")
  await delay(300)
  redis_pub.publish("purple-sector", "command__a__cue__on")
  await delay(300)
  value = await redis.get("status__a__cue")
  t.is(value, "true")
  redis_pub.publish("purple-sector", "command__a__cue__off")
  await delay(300)
  value = await redis.get("status__a__cue")
  t.is(value, "false")
})
