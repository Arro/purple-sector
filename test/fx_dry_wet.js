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
  await waitForValue("stage", "second_wave", 5_000)
})

test.after.always(async (t) => {
  await t.context.redis.set("stage", "third_wave")
})

test("fx1 dry/wet", async (t) => {
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__fx1__dry_wet__0")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__fx1__dry_wet__20")
  result = await waitForValue("status__fx1__dry_wet", "19", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__fx1__dry_wet__105")
  result = await waitForValue("status__fx1__dry_wet", "105", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__fx1__dry_wet__63")
  result = await waitForValue("status__fx1__dry_wet", "63", 1_000)
  t.true(result)
})

test("fx2 dry/wet", async (t) => {
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__fx2__dry_wet__0")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__fx2__dry_wet__20")
  result = await waitForValue("status__fx2__dry_wet", "19", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__fx2__dry_wet__105")
  result = await waitForValue("status__fx2__dry_wet", "105", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__fx2__dry_wet__63")
  result = await waitForValue("status__fx2__dry_wet", "63", 1_000)
  t.true(result)
})

test("fx3 dry/wet", async (t) => {
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__fx3__dry_wet__0")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__fx3__dry_wet__20")
  result = await waitForValue("status__fx3__dry_wet", "19", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__fx3__dry_wet__105")
  result = await waitForValue("status__fx3__dry_wet", "105", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__fx3__dry_wet__63")
  result = await waitForValue("status__fx3__dry_wet", "63", 1_000)
  t.true(result)
})

test("fx4 dry/wet", async (t) => {
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__fx4__dry_wet__0")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__fx4__dry_wet__20")
  result = await waitForValue("status__fx4__dry_wet", "19", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__fx4__dry_wet__105")
  result = await waitForValue("status__fx4__dry_wet", "105", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__fx4__dry_wet__63")
  result = await waitForValue("status__fx4__dry_wet", "63", 1_000)
  t.true(result)
})
