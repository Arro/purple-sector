import test from "ava"
import Redis from "ioredis"
import waitForValue from "src/wait-for-value"

const delay = async function (time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  })
}

test.before(async (t) => {
  t.timeout(15_000)
  t.context.redis = new Redis()
  t.context.redis_pub = new Redis()
  await waitForValue("stage", "first_wave", 15_000)
})

test.after.always(async (t) => {
  await delay(2_000)
  await t.context.redis.set("stage", "second_wave")
})

test("a fx1", async (t) => {
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__a__fx1__on")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__a__fx1__off")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__a__fx1__on")
  result = await waitForValue("status__a__fx1", "true", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__a__fx1__off")
  result = await waitForValue("status__a__fx1", "false", 1_000)
  t.true(result)
})

test("a fx2", async (t) => {
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__a__fx2__on")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__a__fx2__off")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__a__fx2__on")
  result = await waitForValue("status__a__fx2", "true", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__a__fx2__off")
  result = await waitForValue("status__a__fx2", "false", 1_000)
  t.true(result)
})

test("a fx3", async (t) => {
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__a__fx3__on")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__a__fx3__off")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__a__fx3__on")
  result = await waitForValue("status__a__fx3", "true", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__a__fx3__off")
  result = await waitForValue("status__a__fx3", "false", 1_000)
  t.true(result)
})

test("a fx4", async (t) => {
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__a__fx4__on")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__a__fx4__off")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__a__fx4__on")
  result = await waitForValue("status__a__fx4", "true", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__a__fx4__off")
  result = await waitForValue("status__a__fx4", "false", 1_000)
  t.true(result)
})

test("b fx1", async (t) => {
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__b__fx1__on")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__b__fx1__off")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__b__fx1__on")
  result = await waitForValue("status__b__fx1", "true", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__b__fx1__off")
  result = await waitForValue("status__b__fx1", "false", 1_000)
  t.true(result)
})

test("b fx2", async (t) => {
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__b__fx2__on")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__b__fx2__off")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__b__fx2__on")
  result = await waitForValue("status__b__fx2", "true", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__b__fx2__off")
  result = await waitForValue("status__b__fx2", "false", 1_000)
  t.true(result)
})

test("b fx3", async (t) => {
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__b__fx3__on")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__b__fx3__off")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__b__fx3__on")
  result = await waitForValue("status__b__fx3", "true", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__b__fx3__off")
  result = await waitForValue("status__b__fx3", "false", 1_000)
  t.true(result)
})

test("b fx4", async (t) => {
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__b__fx4__on")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__b__fx4__off")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__b__fx4__on")
  result = await waitForValue("status__b__fx4", "true", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__b__fx4__off")
  result = await waitForValue("status__b__fx4", "false", 1_000)
  t.true(result)
})

test("c fx1", async (t) => {
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__c__fx1__on")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__c__fx1__off")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__c__fx1__on")
  result = await waitForValue("status__c__fx1", "true", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__c__fx1__off")
  result = await waitForValue("status__c__fx1", "false", 1_000)
  t.true(result)
})

test("c fx2", async (t) => {
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__c__fx2__on")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__c__fx2__off")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__c__fx2__on")
  result = await waitForValue("status__c__fx2", "true", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__c__fx2__off")
  result = await waitForValue("status__c__fx2", "false", 1_000)
  t.true(result)
})

test("c fx3", async (t) => {
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__c__fx3__on")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__c__fx3__off")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__c__fx3__on")
  result = await waitForValue("status__c__fx3", "true", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__c__fx3__off")
  result = await waitForValue("status__c__fx3", "false", 1_000)
  t.true(result)
})

test("c fx4", async (t) => {
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__c__fx4__on")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__c__fx4__off")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__c__fx4__on")
  result = await waitForValue("status__c__fx4", "true", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__c__fx4__off")
  result = await waitForValue("status__c__fx4", "false", 1_000)
  t.true(result)
})

test("d fx1", async (t) => {
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__d__fx1__on")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__d__fx1__off")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__d__fx1__on")
  result = await waitForValue("status__d__fx1", "true", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__d__fx1__off")
  result = await waitForValue("status__d__fx1", "false", 1_000)
  t.true(result)
})

test("d fx2", async (t) => {
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__d__fx2__on")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__d__fx2__off")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__d__fx2__on")
  result = await waitForValue("status__d__fx2", "true", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__d__fx2__off")
  result = await waitForValue("status__d__fx2", "false", 1_000)
  t.true(result)
})

test("d fx3", async (t) => {
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__d__fx3__on")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__d__fx3__off")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__d__fx3__on")
  result = await waitForValue("status__d__fx3", "true", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__d__fx3__off")
  result = await waitForValue("status__d__fx3", "false", 1_000)
  t.true(result)
})

test("d fx4", async (t) => {
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__d__fx4__on")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__d__fx4__off")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__d__fx4__on")
  result = await waitForValue("status__d__fx4", "true", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__d__fx4__off")
  result = await waitForValue("status__d__fx4", "false", 1_000)
  t.true(result)
})
