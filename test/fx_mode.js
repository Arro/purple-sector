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
  await delay(2000)
})

test("fx1 mode", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__fx1__fx_mode__single")
  await delay(300)
  redis_pub.publish("purple-sector", "command__fx1__fx_mode__group")
  await delay(300)
  value = await redis.get("status__fx1__fx_mode")
  t.is(value, "false")
  redis_pub.publish("purple-sector", "command__fx1__fx_mode__single")
  await delay(300)
  value = await redis.get("status__fx1__fx_mode")
  t.is(value, "true")
})

test("fx2 mode", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__fx2__fx_mode__single")
  await delay(300)
  redis_pub.publish("purple-sector", "command__fx2__fx_mode__group")
  await delay(300)
  value = await redis.get("status__fx2__fx_mode")
  t.is(value, "false")
  redis_pub.publish("purple-sector", "command__fx2__fx_mode__single")
  await delay(300)
  value = await redis.get("status__fx2__fx_mode")
  t.is(value, "true")
})

test("fx3 mode", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__fx3__fx_mode__single")
  await delay(300)
  redis_pub.publish("purple-sector", "command__fx3__fx_mode__group")
  await delay(300)
  value = await redis.get("status__fx3__fx_mode")
  t.is(value, "false")
  redis_pub.publish("purple-sector", "command__fx3__fx_mode__single")
  await delay(300)
  value = await redis.get("status__fx3__fx_mode")
  t.is(value, "true")
})

test("fx4 mode", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__fx4__fx_mode__single")
  await delay(300)
  redis_pub.publish("purple-sector", "command__fx4__fx_mode__group")
  await delay(300)
  value = await redis.get("status__fx4__fx_mode")
  t.is(value, "false")
  redis_pub.publish("purple-sector", "command__fx4__fx_mode__single")
  await delay(300)
  value = await redis.get("status__fx4__fx_mode")
  t.is(value, "true")
})
