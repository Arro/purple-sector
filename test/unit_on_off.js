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

test("fx1 unit on/off", async (t) => {
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__fx1__unit__on")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__fx1__unit__off")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__fx1__unit__on")
  result = await waitForValue("status__fx1__unit_on_off", "true", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__fx1__unit__off")
  result = await waitForValue("status__fx1__unit_on_off", "true", 1_000)
  t.true(result)
})

test("fx2 unit on/off", async (t) => {
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__fx2__unit__on")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__fx2__unit__off")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__fx2__unit__on")
  result = await waitForValue("status__fx2__unit_on_off", "true", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__fx2__unit__off")
  result = await waitForValue("status__fx2__unit_on_off", "true", 1_000)
  t.true(result)
})

test("fx3 unit on/off", async (t) => {
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__fx3__unit__on")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__fx3__unit__off")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__fx3__unit__on")
  result = await waitForValue("status__fx3__unit_on_off", "true", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__fx3__unit__off")
  result = await waitForValue("status__fx3__unit_on_off", "true", 1_000)
  t.true(result)
})

test("fx4 unit on/off", async (t) => {
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__fx4__unit__on")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__fx4__unit__off")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__fx4__unit__on")
  result = await waitForValue("status__fx4__unit_on_off", "true", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__fx4__unit__off")
  result = await waitForValue("status__fx4__unit_on_off", "true", 1_000)
  t.true(result)
})
