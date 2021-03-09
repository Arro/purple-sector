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
  await waitForValue("stage", "third_wave", 5_000)
})

test("fx1 button 2", async (t) => {
  let result
  const { redis_pub } = t.context
  await redis_pub.publish("purple-sector", "command__fx1__button_2__on")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__fx1__button_2__off")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__fx1__button_2__on")
  result = await waitForValue("status__fx1__button_2", "true", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__fx1__button_2__off")
  result = await waitForValue("status__fx1__button_2", "false", 1_000)
  t.true(result)
})
test("fx2 button 2", async (t) => {
  let result
  const { redis_pub } = t.context
  await redis_pub.publish("purple-sector", "command__fx2__button_2__on")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__fx2__button_2__off")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__fx2__button_2__on")
  result = await waitForValue("status__fx2__button_2", "true", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__fx2__button_2__off")
  result = await waitForValue("status__fx2__button_2", "false", 1_000)
  t.true(result)
})
test("fx3 button 2", async (t) => {
  let result
  const { redis_pub } = t.context
  await redis_pub.publish("purple-sector", "command__fx3__button_2__on")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__fx3__button_2__off")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__fx3__button_2__on")
  result = await waitForValue("status__fx3__button_2", "true", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__fx3__button_2__off")
  result = await waitForValue("status__fx3__button_2", "false", 1_000)
  t.true(result)
})
test("fx4 button 2", async (t) => {
  let result
  const { redis_pub } = t.context
  await redis_pub.publish("purple-sector", "command__fx4__button_2__on")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__fx4__button_2__off")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__fx4__button_2__on")
  result = await waitForValue("status__fx4__button_2", "true", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__fx4__button_2__off")
  result = await waitForValue("status__fx4__button_2", "false", 1_000)
  t.true(result)
})

test("fx1 button 3", async (t) => {
  let result
  const { redis_pub } = t.context
  await redis_pub.publish("purple-sector", "command__fx1__button_3__on")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__fx1__button_3__off")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__fx1__button_3__on")
  result = await waitForValue("status__fx1__button_3", "true", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__fx1__button_3__off")
  result = await waitForValue("status__fx1__button_3", "false", 1_000)
  t.true(result)
})
test("fx2 button 3", async (t) => {
  let result
  const { redis_pub } = t.context
  await redis_pub.publish("purple-sector", "command__fx2__button_3__on")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__fx2__button_3__off")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__fx2__button_3__on")
  result = await waitForValue("status__fx2__button_3", "true", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__fx2__button_3__off")
  result = await waitForValue("status__fx2__button_3", "false", 1_000)
  t.true(result)
})
test("fx3 button 3", async (t) => {
  let result
  const { redis_pub } = t.context
  await redis_pub.publish("purple-sector", "command__fx3__button_3__on")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__fx3__button_3__off")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__fx3__button_3__on")
  result = await waitForValue("status__fx3__button_3", "true", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__fx3__button_3__off")
  result = await waitForValue("status__fx3__button_3", "false", 1_000)
  t.true(result)
})
test("fx4 button 3", async (t) => {
  let result
  const { redis_pub } = t.context
  await redis_pub.publish("purple-sector", "command__fx4__button_3__on")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__fx4__button_3__off")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__fx4__button_3__on")
  result = await waitForValue("status__fx4__button_3", "true", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__fx4__button_3__off")
  result = await waitForValue("status__fx4__button_3", "false", 1_000)
  t.true(result)
})
