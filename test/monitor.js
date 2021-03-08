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
  await waitForValue("stage", "first_wave", 5_000)
})

test("a cue", async (t) => {
  let result
  const { redis_pub } = t.context
  await redis_pub.publish("purple-sector", "command__a__cue__off")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__a__cue__on")
  result = await waitForValue("status__a__cue", "true", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__a__cue__off")
  result = await waitForValue("status__a__cue", "false", 1_000)
  t.true(result)
})

test("b cue", async (t) => {
  let result
  const { redis_pub } = t.context
  await redis_pub.publish("purple-sector", "command__b__cue__off")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__b__cue__on")
  result = await waitForValue("status__b__cue", "true", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__b__cue__off")
  result = await waitForValue("status__b__cue", "false", 1_000)
  t.true(result)
})

test("c cue", async (t) => {
  let result
  const { redis_pub } = t.context
  await redis_pub.publish("purple-sector", "command__c__cue__off")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__c__cue__on")
  result = await waitForValue("status__c__cue", "true", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__c__cue__off")
  result = await waitForValue("status__c__cue", "false", 1_000)
  t.true(result)
})

test("d cue", async (t) => {
  let result
  const { redis_pub } = t.context
  await redis_pub.publish("purple-sector", "command__d__cue__off")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__d__cue__on")
  result = await waitForValue("status__d__cue", "true", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__d__cue__off")
  result = await waitForValue("status__d__cue", "false", 1_000)
  t.true(result)
})
