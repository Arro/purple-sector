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
  await delay(5000)
})

test("fx1 knob 1", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__fx1__knob_1__0")
  await delay(300)
  redis_pub.publish("purple-sector", "command__fx1__knob_1__20")
  await delay(300)
  value = await redis.get("status__fx1__knob_1")
  t.is(value, "19")
  redis_pub.publish("purple-sector", "command__fx1__knob_1__105")
  await delay(300)
  value = await redis.get("status__fx1__knob_1")
  t.is(value, "105")
  redis_pub.publish("purple-sector", "command__fx1__knob_1__63")
  await delay(300)
  value = await redis.get("status__fx1__knob_1")
  t.is(value, "63")
})

test("fx2 knob 1", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__fx2__knob_1__0")
  await delay(300)
  redis_pub.publish("purple-sector", "command__fx2__knob_1__20")
  await delay(300)
  value = await redis.get("status__fx2__knob_1")
  t.is(value, "19")
  redis_pub.publish("purple-sector", "command__fx2__knob_1__105")
  await delay(300)
  value = await redis.get("status__fx2__knob_1")
  t.is(value, "105")
  redis_pub.publish("purple-sector", "command__fx2__knob_1__63")
  await delay(300)
  value = await redis.get("status__fx2__knob_1")
  t.is(value, "63")
})

test("fx3 knob 1", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__fx3__knob_1__0")
  await delay(300)
  redis_pub.publish("purple-sector", "command__fx3__knob_1__20")
  await delay(300)
  value = await redis.get("status__fx3__knob_1")
  t.is(value, "19")
  redis_pub.publish("purple-sector", "command__fx3__knob_1__105")
  await delay(300)
  value = await redis.get("status__fx3__knob_1")
  t.is(value, "105")
  redis_pub.publish("purple-sector", "command__fx3__knob_1__63")
  await delay(300)
  value = await redis.get("status__fx3__knob_1")
  t.is(value, "63")
})

test("fx4 knob 1", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__fx4__knob_1__0")
  await delay(300)
  redis_pub.publish("purple-sector", "command__fx4__knob_1__20")
  await delay(300)
  value = await redis.get("status__fx4__knob_1")
  t.is(value, "19")
  redis_pub.publish("purple-sector", "command__fx4__knob_1__105")
  await delay(300)
  value = await redis.get("status__fx4__knob_1")
  t.is(value, "105")
  redis_pub.publish("purple-sector", "command__fx4__knob_1__63")
  await delay(300)
  value = await redis.get("status__fx4__knob_1")
  t.is(value, "63")
})

test("fx1 knob 2", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__fx1__knob_2__0")
  await delay(300)
  redis_pub.publish("purple-sector", "command__fx1__knob_2__20")
  await delay(300)
  value = await redis.get("status__fx1__knob_2")
  t.is(value, "19")
  redis_pub.publish("purple-sector", "command__fx1__knob_2__105")
  await delay(300)
  value = await redis.get("status__fx1__knob_2")
  t.is(value, "105")
  redis_pub.publish("purple-sector", "command__fx1__knob_2__63")
  await delay(300)
  value = await redis.get("status__fx1__knob_2")
  t.is(value, "63")
})

test("fx2 knob 2", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__fx2__knob_2__0")
  await delay(300)
  redis_pub.publish("purple-sector", "command__fx2__knob_2__20")
  await delay(300)
  value = await redis.get("status__fx2__knob_2")
  t.is(value, "19")
  redis_pub.publish("purple-sector", "command__fx2__knob_2__105")
  await delay(300)
  value = await redis.get("status__fx2__knob_2")
  t.is(value, "105")
  redis_pub.publish("purple-sector", "command__fx2__knob_2__63")
  await delay(300)
  value = await redis.get("status__fx2__knob_2")
  t.is(value, "63")
})

test("fx3 knob 2", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__fx3__knob_2__0")
  await delay(300)
  redis_pub.publish("purple-sector", "command__fx3__knob_2__20")
  await delay(300)
  value = await redis.get("status__fx3__knob_2")
  t.is(value, "19")
  redis_pub.publish("purple-sector", "command__fx3__knob_2__105")
  await delay(300)
  value = await redis.get("status__fx3__knob_2")
  t.is(value, "105")
  redis_pub.publish("purple-sector", "command__fx3__knob_2__63")
  await delay(300)
  value = await redis.get("status__fx3__knob_2")
  t.is(value, "63")
})

test("fx4 knob 2", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__fx4__knob_2__0")
  await delay(300)
  redis_pub.publish("purple-sector", "command__fx4__knob_2__20")
  await delay(300)
  value = await redis.get("status__fx4__knob_2")
  t.is(value, "19")
  redis_pub.publish("purple-sector", "command__fx4__knob_2__105")
  await delay(300)
  value = await redis.get("status__fx4__knob_2")
  t.is(value, "105")
  redis_pub.publish("purple-sector", "command__fx4__knob_2__63")
  await delay(300)
  value = await redis.get("status__fx4__knob_2")
  t.is(value, "63")
})

test("fx1 knob 3", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__fx1__knob_3__0")
  await delay(300)
  redis_pub.publish("purple-sector", "command__fx1__knob_3__20")
  await delay(300)
  value = await redis.get("status__fx1__knob_3")
  t.is(value, "19")
  redis_pub.publish("purple-sector", "command__fx1__knob_3__105")
  await delay(300)
  value = await redis.get("status__fx1__knob_3")
  t.is(value, "105")
  redis_pub.publish("purple-sector", "command__fx1__knob_3__63")
  await delay(300)
  value = await redis.get("status__fx1__knob_3")
  t.is(value, "63")
})

test("fx2 knob 3", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__fx2__knob_3__0")
  await delay(300)
  redis_pub.publish("purple-sector", "command__fx2__knob_3__20")
  await delay(300)
  value = await redis.get("status__fx2__knob_3")
  t.is(value, "19")
  redis_pub.publish("purple-sector", "command__fx2__knob_3__105")
  await delay(300)
  value = await redis.get("status__fx2__knob_3")
  t.is(value, "105")
  redis_pub.publish("purple-sector", "command__fx2__knob_3__63")
  await delay(300)
  value = await redis.get("status__fx2__knob_3")
  t.is(value, "63")
})

test("fx3 knob 3", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__fx3__knob_3__0")
  await delay(300)
  redis_pub.publish("purple-sector", "command__fx3__knob_3__20")
  await delay(300)
  value = await redis.get("status__fx3__knob_3")
  t.is(value, "19")
  redis_pub.publish("purple-sector", "command__fx3__knob_3__105")
  await delay(300)
  value = await redis.get("status__fx3__knob_3")
  t.is(value, "105")
  redis_pub.publish("purple-sector", "command__fx3__knob_3__63")
  await delay(300)
  value = await redis.get("status__fx3__knob_3")
  t.is(value, "63")
})

test("fx4 knob 3", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__fx4__knob_3__0")
  await delay(300)
  redis_pub.publish("purple-sector", "command__fx4__knob_3__20")
  await delay(300)
  value = await redis.get("status__fx4__knob_3")
  t.is(value, "19")
  redis_pub.publish("purple-sector", "command__fx4__knob_3__105")
  await delay(300)
  value = await redis.get("status__fx4__knob_3")
  t.is(value, "105")
  redis_pub.publish("purple-sector", "command__fx4__knob_3__63")
  await delay(300)
  value = await redis.get("status__fx4__knob_3")
  t.is(value, "63")
})
