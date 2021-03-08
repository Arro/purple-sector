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

test("a volume", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__a__volume__0")
  await delay(300)
  redis_pub.publish("purple-sector", "command__a__volume__20")
  await delay(300)
  value = await redis.get("status__a__volume")
  t.is(value, "19")
  redis_pub.publish("purple-sector", "command__a__volume__105")
  await delay(300)
  value = await redis.get("status__a__volume")
  t.is(value, "105")
  redis_pub.publish("purple-sector", "command__a__volume__115")
  await delay(300)
  value = await redis.get("status__a__volume")
  t.is(value, "115")
})

test("b volume", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__b__volume__0")
  await delay(300)
  redis_pub.publish("purple-sector", "command__b__volume__20")
  await delay(300)
  value = await redis.get("status__b__volume")
  t.is(value, "19")
  redis_pub.publish("purple-sector", "command__b__volume__105")
  await delay(300)
  value = await redis.get("status__b__volume")
  t.is(value, "105")
  redis_pub.publish("purple-sector", "command__b__volume__115")
  await delay(300)
  value = await redis.get("status__b__volume")
  t.is(value, "115")
})

test("c volume", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__c__volume__0")
  await delay(300)
  redis_pub.publish("purple-sector", "command__c__volume__20")
  await delay(300)
  value = await redis.get("status__c__volume")
  t.is(value, "19")
  redis_pub.publish("purple-sector", "command__c__volume__105")
  await delay(300)
  value = await redis.get("status__c__volume")
  t.is(value, "105")
  redis_pub.publish("purple-sector", "command__c__volume__115")
  await delay(300)
  value = await redis.get("status__c__volume")
  t.is(value, "115")
})

test("d volume", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__d__volume__0")
  await delay(300)
  redis_pub.publish("purple-sector", "command__d__volume__20")
  await delay(300)
  value = await redis.get("status__d__volume")
  t.is(value, "19")
  redis_pub.publish("purple-sector", "command__d__volume__105")
  await delay(300)
  value = await redis.get("status__d__volume")
  t.is(value, "105")
  redis_pub.publish("purple-sector", "command__d__volume__115")
  await delay(300)
  value = await redis.get("status__d__volume")
  t.is(value, "115")
})
