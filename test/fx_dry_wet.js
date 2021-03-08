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
  await delay(5000)
})

test.after("cleanup", (t) => {
  t.context.redis.decr("num_active_tests")
})

test("fx1 dry/wet", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__fx1__dry_wet__0")
  await delay(300)
  redis_pub.publish("purple-sector", "command__fx1__dry_wet__20")
  await delay(300)
  value = await redis.get("status__fx1__dry_wet")
  t.is(value, "19")
  redis_pub.publish("purple-sector", "command__fx1__dry_wet__105")
  await delay(300)
  value = await redis.get("status__fx1__dry_wet")
  t.is(value, "105")
  redis_pub.publish("purple-sector", "command__fx1__dry_wet__63")
  await delay(300)
  value = await redis.get("status__fx1__dry_wet")
  t.is(value, "63")
})

test("fx2 dry/wet", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__fx2__dry_wet__0")
  await delay(300)
  redis_pub.publish("purple-sector", "command__fx2__dry_wet__20")
  await delay(300)
  value = await redis.get("status__fx2__dry_wet")
  t.is(value, "19")
  redis_pub.publish("purple-sector", "command__fx2__dry_wet__105")
  await delay(300)
  value = await redis.get("status__fx2__dry_wet")
  t.is(value, "105")
  redis_pub.publish("purple-sector", "command__fx2__dry_wet__63")
  await delay(300)
  value = await redis.get("status__fx2__dry_wet")
  t.is(value, "63")
})

test("fx3 dry/wet", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__fx3__dry_wet__0")
  await delay(300)
  redis_pub.publish("purple-sector", "command__fx3__dry_wet__20")
  await delay(300)
  value = await redis.get("status__fx3__dry_wet")
  t.is(value, "19")
  redis_pub.publish("purple-sector", "command__fx3__dry_wet__105")
  await delay(300)
  value = await redis.get("status__fx3__dry_wet")
  t.is(value, "105")
  redis_pub.publish("purple-sector", "command__fx3__dry_wet__63")
  await delay(300)
  value = await redis.get("status__fx3__dry_wet")
  t.is(value, "63")
})

test("fx4 dry/wet", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__fx4__dry_wet__0")
  await delay(300)
  redis_pub.publish("purple-sector", "command__fx4__dry_wet__20")
  await delay(300)
  value = await redis.get("status__fx4__dry_wet")
  t.is(value, "19")
  redis_pub.publish("purple-sector", "command__fx4__dry_wet__105")
  await delay(300)
  value = await redis.get("status__fx4__dry_wet")
  t.is(value, "105")
  redis_pub.publish("purple-sector", "command__fx4__dry_wet__63")
  await delay(300)
  value = await redis.get("status__fx4__dry_wet")
  t.is(value, "63")
})
