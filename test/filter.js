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

test("a filter", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__a__filter__0")
  await delay(300)
  redis_pub.publish("purple-sector", "command__a__filter__25")
  await delay(300)
  value = await redis.get("status__a__filter")
  t.is(value, "26")
  redis_pub.publish("purple-sector", "command__a__filter__124")
  await delay(300)
  value = await redis.get("status__a__filter")
  t.is(value, "123")
  redis_pub.publish("purple-sector", "command__a__filter__63")
  await delay(300)
  value = await redis.get("status__a__filter")
  t.is(value, "63")
})

test("b filter", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__b__filter__0")
  await delay(300)
  redis_pub.publish("purple-sector", "command__b__filter__25")
  await delay(300)
  value = await redis.get("status__b__filter")
  t.is(value, "26")
  redis_pub.publish("purple-sector", "command__b__filter__124")
  await delay(300)
  value = await redis.get("status__b__filter")
  t.is(value, "123")
  redis_pub.publish("purple-sector", "command__b__filter__63")
  await delay(300)
  value = await redis.get("status__b__filter")
  t.is(value, "63")
})

test("c filter", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__c__filter__0")
  await delay(300)
  redis_pub.publish("purple-sector", "command__c__filter__25")
  await delay(300)
  value = await redis.get("status__c__filter")
  t.is(value, "26")
  redis_pub.publish("purple-sector", "command__c__filter__124")
  await delay(300)
  value = await redis.get("status__c__filter")
  t.is(value, "123")
  redis_pub.publish("purple-sector", "command__c__filter__63")
  await delay(300)
  value = await redis.get("status__c__filter")
  t.is(value, "63")
})

test("d filter", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__d__filter__0")
  await delay(300)
  redis_pub.publish("purple-sector", "command__d__filter__25")
  await delay(300)
  value = await redis.get("status__d__filter")
  t.is(value, "26")
  redis_pub.publish("purple-sector", "command__d__filter__124")
  await delay(300)
  value = await redis.get("status__d__filter")
  t.is(value, "123")
  redis_pub.publish("purple-sector", "command__d__filter__63")
  await delay(300)
  value = await redis.get("status__d__filter")
  t.is(value, "63")
})

test("a filter on/off", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__a__filter__off")
  await delay(300)
  redis_pub.publish("purple-sector", "command__a__filter__on")
  await delay(300)
  value = await redis.get("status__a__filter_on_off")
  t.is(value, "true")
  redis_pub.publish("purple-sector", "command__a__filter__off")
  await delay(300)
  value = await redis.get("status__a__filter_on_off")
  t.is(value, "false")
})

test("b filter on/off", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__b__filter__off")
  await delay(300)
  redis_pub.publish("purple-sector", "command__b__filter__on")
  await delay(300)
  value = await redis.get("status__b__filter_on_off")
  t.is(value, "true")
  redis_pub.publish("purple-sector", "command__b__filter__off")
  await delay(300)
  value = await redis.get("status__b__filter_on_off")
  t.is(value, "false")
})

test("c filter on/off", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__c__filter__off")
  await delay(300)
  redis_pub.publish("purple-sector", "command__c__filter__on")
  await delay(300)
  value = await redis.get("status__c__filter_on_off")
  t.is(value, "true")
  redis_pub.publish("purple-sector", "command__c__filter__off")
  await delay(300)
  value = await redis.get("status__c__filter_on_off")
  t.is(value, "false")
})

test("d filter on/off", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__d__filter__off")
  await delay(300)
  redis_pub.publish("purple-sector", "command__d__filter__on")
  await delay(300)
  value = await redis.get("status__d__filter_on_off")
  t.is(value, "true")
  redis_pub.publish("purple-sector", "command__d__filter__off")
  await delay(300)
  value = await redis.get("status__d__filter_on_off")
  t.is(value, "false")
})
