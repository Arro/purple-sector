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
  redis_pub.publish("purple-sector", "command__a__gain__63")
  await delay(300)
  value = await redis.get("status__a__gain")
  t.is(value, "63")
})

test("b gain", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__b__gain__0")
  await delay(300)
  redis_pub.publish("purple-sector", "command__b__gain__20")
  await delay(300)
  value = await redis.get("status__b__gain")
  t.is(value, "20")
  redis_pub.publish("purple-sector", "command__b__gain__127")
  await delay(300)
  value = await redis.get("status__b__gain")
  t.is(value, "127")
  redis_pub.publish("purple-sector", "command__b__gain__63")
  await delay(300)
  value = await redis.get("status__b__gain")
  t.is(value, "63")
})
test("c gain", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__c__gain__0")
  await delay(300)
  redis_pub.publish("purple-sector", "command__c__gain__20")
  await delay(300)
  value = await redis.get("status__c__gain")
  t.is(value, "20")
  redis_pub.publish("purple-sector", "command__c__gain__127")
  await delay(300)
  value = await redis.get("status__c__gain")
  t.is(value, "127")
  redis_pub.publish("purple-sector", "command__c__gain__63")
  await delay(300)
  value = await redis.get("status__d__gain")
  t.is(value, "63")
})
test("d gain", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__d__gain__0")
  await delay(300)
  redis_pub.publish("purple-sector", "command__d__gain__20")
  await delay(300)
  value = await redis.get("status__d__gain")
  t.is(value, "20")
  redis_pub.publish("purple-sector", "command__d__gain__127")
  await delay(300)
  value = await redis.get("status__d__gain")
  t.is(value, "127")
  redis_pub.publish("purple-sector", "command__d__gain__63")
  await delay(300)
  value = await redis.get("status__d__gain")
  t.is(value, "63")
})
