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
  t.timeout(15_000)
  t.context.redis = new Redis()
  t.context.redis_pub = new Redis()

  const context = new SharedContext("purple")
  const lock = context.createLock("fx")
  await lock.acquire()
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
