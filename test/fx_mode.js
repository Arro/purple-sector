import test from "ava"
import Redis from "ioredis"
import waitForValue from "src/wait-for-value"
import path from "path"
import delay from "src/delay"
import { registerSharedWorker } from "ava/plugin"
import { SharedContext } from "@ava/cooperate"

registerSharedWorker({
  filename: path.resolve(__dirname, "worker.js"),
  supportedProtocols: ["experimental"]
})

test.before(async (t) => {
  t.timeout(10_000)
  t.context.redis_pub = new Redis()

  const context = new SharedContext("purple")
  const lock = context.createLock("fx")
  await lock.acquire()
})

test("fx1 mode", async (t) => {
  let result
  const { redis_pub } = t.context
  await redis_pub.publish("purple-sector", "command__fx1__fx_mode__group")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__fx1__fx_mode__single")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__fx1__fx_mode__group")
  result = await waitForValue("status__fx1__fx_mode", "false", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__fx1__fx_mode__single")
  result = await waitForValue("status__fx1__fx_mode", "true", 1_000)
  t.true(result)
})

test("fx2 mode", async (t) => {
  let result
  const { redis_pub } = t.context
  await redis_pub.publish("purple-sector", "command__fx2__fx_mode__group")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__fx2__fx_mode__single")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__fx2__fx_mode__group")
  result = await waitForValue("status__fx2__fx_mode", "false", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__fx2__fx_mode__single")
  result = await waitForValue("status__fx2__fx_mode", "true", 1_000)
  t.true(result)
})

test("fx3 mode", async (t) => {
  let result
  const { redis_pub } = t.context
  await redis_pub.publish("purple-sector", "command__fx3__fx_mode__group")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__fx3__fx_mode__single")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__fx3__fx_mode__group")
  result = await waitForValue("status__fx3__fx_mode", "false", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__fx3__fx_mode__single")
  result = await waitForValue("status__fx3__fx_mode", "true", 1_000)
  t.true(result)
})

test("fx4 mode", async (t) => {
  let result
  const { redis_pub } = t.context
  await redis_pub.publish("purple-sector", "command__fx4__fx_mode__group")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__fx4__fx_mode__single")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__fx4__fx_mode__group")
  result = await waitForValue("status__fx4__fx_mode", "false", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__fx4__fx_mode__single")
  result = await waitForValue("status__fx4__fx_mode", "true", 1_000)
  t.true(result)
})
