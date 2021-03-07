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

test("a fx1", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__a__fx1__off")
  await delay(300)
  redis_pub.publish("purple-sector", "command__a__fx1__on")
  await delay(300)
  value = await redis.get("status__a__fx1")
  t.is(value, "true")
  redis_pub.publish("purple-sector", "command__a__fx1__off")
  await delay(300)
  value = await redis.get("status__a__fx1")
  t.is(value, "false")
})

test("a fx2", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__a__fx2__off")
  await delay(300)
  redis_pub.publish("purple-sector", "command__a__fx2__on")
  await delay(300)
  value = await redis.get("status__a__fx2")
  t.is(value, "true")
  redis_pub.publish("purple-sector", "command__a__fx2__off")
  await delay(300)
  value = await redis.get("status__a__fx2")
  t.is(value, "false")
})

test("a fx3", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__a__fx3__off")
  await delay(300)
  redis_pub.publish("purple-sector", "command__a__fx3__on")
  await delay(300)
  value = await redis.get("status__a__fx3")
  t.is(value, "true")
  redis_pub.publish("purple-sector", "command__a__fx3__off")
  await delay(300)
  value = await redis.get("status__a__fx3")
  t.is(value, "false")
})

test("a fx4", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__a__fx4__off")
  await delay(300)
  redis_pub.publish("purple-sector", "command__a__fx4__on")
  await delay(300)
  value = await redis.get("status__a__fx4")
  t.is(value, "true")
  redis_pub.publish("purple-sector", "command__a__fx4__off")
  await delay(300)
  value = await redis.get("status__a__fx4")
  t.is(value, "false")
})

test("b fx1", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__b__fx1__off")
  await delay(300)
  redis_pub.publish("purple-sector", "command__b__fx1__on")
  await delay(300)
  value = await redis.get("status__b__fx1")
  t.is(value, "true")
  redis_pub.publish("purple-sector", "command__b__fx1__off")
  await delay(300)
  value = await redis.get("status__b__fx1")
  t.is(value, "false")
})

test("b fx2", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__b__fx2__off")
  await delay(300)
  redis_pub.publish("purple-sector", "command__b__fx2__on")
  await delay(300)
  value = await redis.get("status__b__fx2")
  t.is(value, "true")
  redis_pub.publish("purple-sector", "command__b__fx2__off")
  await delay(300)
  value = await redis.get("status__b__fx2")
  t.is(value, "false")
})

test("b fx3", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__b__fx3__off")
  await delay(300)
  redis_pub.publish("purple-sector", "command__b__fx3__on")
  await delay(300)
  value = await redis.get("status__b__fx3")
  t.is(value, "true")
  redis_pub.publish("purple-sector", "command__b__fx3__off")
  await delay(300)
  value = await redis.get("status__b__fx3")
  t.is(value, "false")
})

test("b fx4", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__b__fx4__off")
  await delay(300)
  redis_pub.publish("purple-sector", "command__b__fx4__on")
  await delay(300)
  value = await redis.get("status__b__fx4")
  t.is(value, "true")
  redis_pub.publish("purple-sector", "command__b__fx4__off")
  await delay(300)
  value = await redis.get("status__b__fx4")
  t.is(value, "false")
})

test("c fx1", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__c__fx1__off")
  await delay(300)
  redis_pub.publish("purple-sector", "command__c__fx1__on")
  await delay(300)
  value = await redis.get("status__c__fx1")
  t.is(value, "true")
  redis_pub.publish("purple-sector", "command__c__fx1__off")
  await delay(300)
  value = await redis.get("status__c__fx1")
  t.is(value, "false")
})

test("c fx2", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__c__fx2__off")
  await delay(300)
  redis_pub.publish("purple-sector", "command__c__fx2__on")
  await delay(300)
  value = await redis.get("status__c__fx2")
  t.is(value, "true")
  redis_pub.publish("purple-sector", "command__c__fx2__off")
  await delay(300)
  value = await redis.get("status__c__fx2")
  t.is(value, "false")
})

test("c fx3", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__c__fx3__off")
  await delay(300)
  redis_pub.publish("purple-sector", "command__c__fx3__on")
  await delay(300)
  value = await redis.get("status__c__fx3")
  t.is(value, "true")
  redis_pub.publish("purple-sector", "command__c__fx3__off")
  await delay(300)
  value = await redis.get("status__c__fx3")
  t.is(value, "false")
})

test("c fx4", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__c__fx4__off")
  await delay(300)
  redis_pub.publish("purple-sector", "command__c__fx4__on")
  await delay(300)
  value = await redis.get("status__c__fx4")
  t.is(value, "true")
  redis_pub.publish("purple-sector", "command__c__fx4__off")
  await delay(300)
  value = await redis.get("status__c__fx4")
  t.is(value, "false")
})

test("d fx1", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__d__fx1__off")
  await delay(300)
  redis_pub.publish("purple-sector", "command__d__fx1__on")
  await delay(300)
  value = await redis.get("status__d__fx1")
  t.is(value, "true")
  redis_pub.publish("purple-sector", "command__d__fx1__off")
  await delay(300)
  value = await redis.get("status__d__fx1")
  t.is(value, "false")
})

test("d fx2", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__d__fx2__off")
  await delay(300)
  redis_pub.publish("purple-sector", "command__d__fx2__on")
  await delay(300)
  value = await redis.get("status__d__fx2")
  t.is(value, "true")
  redis_pub.publish("purple-sector", "command__d__fx2__off")
  await delay(300)
  value = await redis.get("status__d__fx2")
  t.is(value, "false")
})

test("d fx3", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__d__fx3__off")
  await delay(300)
  redis_pub.publish("purple-sector", "command__d__fx3__on")
  await delay(300)
  value = await redis.get("status__d__fx3")
  t.is(value, "true")
  redis_pub.publish("purple-sector", "command__d__fx3__off")
  await delay(300)
  value = await redis.get("status__d__fx3")
  t.is(value, "false")
})

test("d fx4", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__d__fx4__off")
  await delay(300)
  redis_pub.publish("purple-sector", "command__d__fx4__on")
  await delay(300)
  value = await redis.get("status__d__fx4")
  t.is(value, "true")
  redis_pub.publish("purple-sector", "command__d__fx4__off")
  await delay(300)
  value = await redis.get("status__d__fx4")
  t.is(value, "false")
})
