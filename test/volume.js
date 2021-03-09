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
  await delay(500)
  await waitForValue("stage", "second_wave", 10_000)
})

test("a volume", async (t) => {
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__a__volume__0")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__a__volume__25")
  result = await waitForValue("status__a__volume", "25", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__a__volume__124")
  result = await waitForValue("status__a__volume", "124", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__a__volume__110")
  result = await waitForValue("status__a__volume", "110", 1_000)
  t.true(result)
})

test("b volume", async (t) => {
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__b__volume__0")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__b__volume__25")
  result = await waitForValue("status__b__volume", "25", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__b__volume__124")
  result = await waitForValue("status__b__volume", "124", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__b__volume__110")
  result = await waitForValue("status__b__volume", "110", 1_000)
  t.true(result)
})

test("c volume", async (t) => {
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__c__volume__0")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__c__volume__25")
  result = await waitForValue("status__c__volume", "25", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__c__volume__124")
  result = await waitForValue("status__c__volume", "124", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__c__volume__110")
  result = await waitForValue("status__c__volume", "110", 1_000)
  t.true(result)
})

test("d volume", async (t) => {
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__d__volume__0")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__d__volume__25")
  result = await waitForValue("status__d__volume", "25", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__d__volume__124")
  result = await waitForValue("status__d__volume", "124", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__d__volume__110")
  result = await waitForValue("status__d__volume", "110", 1_000)
  t.true(result)
})
