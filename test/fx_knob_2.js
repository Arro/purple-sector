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

test("fx1 knob 2", async (t) => {
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__fx1__knob_2__0")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__fx1__knob_2__20")
  result = await waitForValue("status__fx1__knob_2", "19", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__fx1__knob_2__105")
  result = await waitForValue("status__fx1__knob_2", "105", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__fx1__knob_2__63")
  result = await waitForValue("status__fx1__knob_2", "63", 1_000)
  t.true(result)
})

test("fx2 knob 2", async (t) => {
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__fx2__knob_2__0")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__fx2__knob_2__20")
  result = await waitForValue("status__fx2__knob_2", "19", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__fx2__knob_2__105")
  result = await waitForValue("status__fx2__knob_2", "105", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__fx2__knob_2__63")
  result = await waitForValue("status__fx2__knob_2", "63", 1_000)
  t.true(result)
})
test("fx3 knob 2", async (t) => {
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__fx3__knob_2__0")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__fx3__knob_2__20")
  result = await waitForValue("status__fx3__knob_2", "19", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__fx3__knob_2__105")
  result = await waitForValue("status__fx3__knob_2", "105", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__fx3__knob_2__63")
  result = await waitForValue("status__fx3__knob_2", "63", 1_000)
  t.true(result)
})
test("fx4 knob 2", async (t) => {
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__fx4__knob_2__0")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__fx4__knob_2__20")
  result = await waitForValue("status__fx4__knob_2", "19", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__fx4__knob_2__105")
  result = await waitForValue("status__fx4__knob_2", "105", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__fx4__knob_2__63")
  result = await waitForValue("status__fx4__knob_2", "63", 1_000)
  t.true(result)
})
