import test from "ava"
import Redis from "ioredis"
import waitForValue from "src/wait-for-value"

const delay = async function (time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  })
}

test.before(async (t) => {
  t.timeout(10_000)
  t.context.redis = new Redis()
  t.context.redis_pub = new Redis()
  await waitForValue("stage", "first_wave", 10_000)
})

test("a sync", async (t) => {
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__a__sync__on")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__a__sync__off")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__a__sync__on")
  result = await waitForValue("status__a__sync", "true", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__a__sync__off")
  result = await waitForValue("status__a__sync", "false", 1_000)
  t.true(result)
})

test("b sync", async (t) => {
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__b__sync__on")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__b__sync__off")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__b__sync__on")
  result = await waitForValue("status__b__sync", "true", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__b__sync__off")
  result = await waitForValue("status__b__sync", "false", 1_000)
  t.true(result)
})

test("c sync", async (t) => {
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__c__sync__on")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__c__sync__off")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__c__sync__on")
  result = await waitForValue("status__c__sync", "true", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__c__sync__off")
  result = await waitForValue("status__c__sync", "false", 1_000)
  t.true(result)
})

test("d sync", async (t) => {
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__d__sync__on")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__d__sync__off")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__d__sync__on")
  result = await waitForValue("status__d__sync", "true", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__d__sync__off")
  result = await waitForValue("status__d__sync", "false", 1_000)
  t.true(result)
})
