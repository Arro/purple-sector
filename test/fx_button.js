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
  await delay(5000)
})

test.after("cleanup", async (t) => {
  await delay(1000)
  t.context.purple.kill()
})

test("fx1 button 2", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__fx1__button_2__off")
  await delay(300)
  redis_pub.publish("purple-sector", "command__fx1__button_2__on")
  await delay(300)
  value = await redis.get("status__fx1__button_2")
  t.is(value, "true")
  redis_pub.publish("purple-sector", "command__fx1__button_2__off")
  await delay(300)
  value = await redis.get("status__fx1__button_2")
  t.is(value, "false")
})

test("fx2 button 2", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__fx2__button_2__off")
  await delay(300)
  redis_pub.publish("purple-sector", "command__fx2__button_2__on")
  await delay(300)
  value = await redis.get("status__fx2__button_2")
  t.is(value, "true")
  redis_pub.publish("purple-sector", "command__fx2__button_2__off")
  await delay(300)
  value = await redis.get("status__fx2__button_2")
  t.is(value, "false")
})

test("fx3 button 2", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__fx3__button_2__off")
  await delay(300)
  redis_pub.publish("purple-sector", "command__fx3__button_2__on")
  await delay(300)
  value = await redis.get("status__fx3__button_2")
  t.is(value, "true")
  redis_pub.publish("purple-sector", "command__fx3__button_2__off")
  await delay(300)
  value = await redis.get("status__fx3__button_2")
  t.is(value, "false")
})

test("fx4 button 2", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__fx4__button_2__off")
  await delay(300)
  redis_pub.publish("purple-sector", "command__fx4__button_2__on")
  await delay(300)
  value = await redis.get("status__fx4__button_2")
  t.is(value, "true")
  redis_pub.publish("purple-sector", "command__fx4__button_2__off")
  await delay(300)
  value = await redis.get("status__fx4__button_2")
  t.is(value, "false")
})

test("fx1 button 3", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__fx1__button_3__off")
  await delay(300)
  redis_pub.publish("purple-sector", "command__fx1__button_3__on")
  await delay(300)
  value = await redis.get("status__fx1__button_3")
  t.is(value, "true")
  redis_pub.publish("purple-sector", "command__fx1__button_3__off")
  await delay(300)
  value = await redis.get("status__fx1__button_3")
  t.is(value, "false")
})

test("fx2 button 3", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__fx2__button_3__off")
  await delay(300)
  redis_pub.publish("purple-sector", "command__fx2__button_3__on")
  await delay(300)
  value = await redis.get("status__fx2__button_3")
  t.is(value, "true")
  redis_pub.publish("purple-sector", "command__fx2__button_3__off")
  await delay(300)
  value = await redis.get("status__fx2__button_3")
  t.is(value, "false")
})

test("fx3 button 3", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__fx3__button_3__off")
  await delay(300)
  redis_pub.publish("purple-sector", "command__fx3__button_3__on")
  await delay(300)
  value = await redis.get("status__fx3__button_3")
  t.is(value, "true")
  redis_pub.publish("purple-sector", "command__fx3__button_3__off")
  await delay(300)
  value = await redis.get("status__fx3__button_3")
  t.is(value, "false")
})

test("fx4 button 3", async (t) => {
  const { redis, redis_pub } = t.context
  let value

  redis_pub.publish("purple-sector", "command__fx4__button_3__off")
  await delay(300)
  redis_pub.publish("purple-sector", "command__fx4__button_3__on")
  await delay(300)
  value = await redis.get("status__fx4__button_3")
  t.is(value, "true")
  redis_pub.publish("purple-sector", "command__fx4__button_3__off")
  await delay(300)
  value = await redis.get("status__fx4__button_3")
  t.is(value, "false")
})
