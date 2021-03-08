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

test("load into a", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__a__unload__trigger")

  await delay(300)
  value = await redis.get("status__a__load")
  t.is(value, "false")

  redis_pub.publish("purple-sector", "command__global__select__top")
  await delay(40)
  for (let i = 0; i < 16; i++) {
    redis_pub.publish("purple-sector", "command__global__select__down")
    await delay(40)
  }

  redis_pub.publish("purple-sector", "command__a__load__trigger")

  await delay(500)

  value = await redis.get("status__a__load")
  t.is(value, "true")
})

test("load into b", async (t) => {
  const { redis, redis_pub } = t.context
  let value
  redis_pub.publish("purple-sector", "command__b__unload__trigger")
  await delay(300)
  value = await redis.get("status__b__load")
  t.is(value, "false")

  await delay(3000)
  redis_pub.publish("purple-sector", "command__global__select__top")
  await delay(40)
  for (let i = 0; i < 6; i++) {
    redis_pub.publish("purple-sector", "command__global__select__down")
    await delay(40)
  }

  redis_pub.publish("purple-sector", "command__b__load__trigger")
  await delay(500)
  value = await redis.get("status__b__load")
  t.is(value, "true")
})

test("load into c", async (t) => {
  const { redis, redis_pub } = t.context
  let value
  redis_pub.publish("purple-sector", "command__c__unload__trigger")
  await delay(300)
  value = await redis.get("status__c__load")
  t.is(value, "false")

  await delay(6000)
  redis_pub.publish("purple-sector", "command__global__select__top")
  await delay(40)
  for (let i = 0; i < 16; i++) {
    redis_pub.publish("purple-sector", "command__global__select__down")
    await delay(40)
  }

  redis_pub.publish("purple-sector", "command__c__load__trigger")
  await delay(500)
  value = await redis.get("status__c__load")
  t.is(value, "true")
})

test("load into d", async (t) => {
  const { redis, redis_pub } = t.context
  let value
  redis_pub.publish("purple-sector", "command__d__unload__trigger")
  await delay(300)
  value = await redis.get("status__d__load")
  t.is(value, "false")

  await delay(9000)
  redis_pub.publish("purple-sector", "command__global__select__top")
  await delay(40)
  for (let i = 0; i < 6; i++) {
    redis_pub.publish("purple-sector", "command__global__select__down")
    await delay(40)
  }

  redis_pub.publish("purple-sector", "command__d__load__trigger")
  await delay(500)

  value = await redis.get("status__d__load")
  t.is(value, "true")
})
