import test from "ava"
import Redis from "ioredis"
import waitForValue from "src/wait-for-value"

const delay = async function (time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  })
}

test.before(async (t) => {
  t.timeout(20_000)
  t.context.redis = new Redis()
  t.context.redis_pub = new Redis()
  await waitForValue("stage", "third_wave", 20_000)
})

test.after.always(async (t) => {
  await delay(1000)
  await t.context.redis.set("stage", "fourth_wave")
})

test.serial("load into a", async (t) => {
  await delay(50)
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__a__unload__trigger")
  await delay(100)

  await redis_pub.publish("purple-sector", "command__global__select__top")

  await delay(40)
  for (let i = 0; i < 16; i++) {
    await redis_pub.publish("purple-sector", "command__global__select__down")
    await delay(40)
  }

  await redis_pub.publish("purple-sector", "command__a__load__trigger")

  result = await waitForValue("status__a__load", "true", 3_000)
  t.true(result)

  await redis_pub.publish("purple-sector", "command__a__unload__trigger")

  result = await waitForValue("status__a__load", "false", 3_000)
  t.true(result)
})

test.serial("load into b", async (t) => {
  await delay(50)
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__b__unload__trigger")
  await delay(100)

  await redis_pub.publish("purple-sector", "command__global__select__top")

  await delay(40)
  for (let i = 0; i < 6; i++) {
    await redis_pub.publish("purple-sector", "command__global__select__down")
    await delay(40)
  }

  await redis_pub.publish("purple-sector", "command__b__load__trigger")

  result = await waitForValue("status__b__load", "true", 3_000)
  t.true(result)

  await redis_pub.publish("purple-sector", "command__b__unload__trigger")

  result = await waitForValue("status__b__load", "false", 3_000)
  t.true(result)
})

test.serial("load into c", async (t) => {
  await delay(50)
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__c__unload__trigger")
  await delay(100)

  await redis_pub.publish("purple-sector", "command__global__select__top")

  await delay(40)
  for (let i = 0; i < 6; i++) {
    await redis_pub.publish("purple-sector", "command__global__select__down")
    await delay(40)
  }

  await redis_pub.publish("purple-sector", "command__c__load__trigger")

  result = await waitForValue("status__c__load", "true", 3_000)
  t.true(result)

  await redis_pub.publish("purple-sector", "command__c__unload__trigger")

  result = await waitForValue("status__c__load", "false", 3_000)
  t.true(result)
})

test.serial("load into d", async (t) => {
  await delay(50)
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__d__unload__trigger")
  await delay(100)

  await redis_pub.publish("purple-sector", "command__global__select__top")

  await delay(40)
  for (let i = 0; i < 6; i++) {
    await redis_pub.publish("purple-sector", "command__global__select__down")
    await delay(40)
  }

  await redis_pub.publish("purple-sector", "command__d__load__trigger")

  result = await waitForValue("status__d__load", "true", 3_000)
  t.true(result)

  await redis_pub.publish("purple-sector", "command__d__unload__trigger")

  result = await waitForValue("status__d__load", "false", 3_000)
  t.true(result)
})
