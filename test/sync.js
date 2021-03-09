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
  const lock = context.createLock("deck")
  await lock.acquire()
})

test("a sync", async (t) => {
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__a__sync__on")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__a__sync__off")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__a__sync__on")
  result = await waitForValue("status__a__sync", "true", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__a__sync__off")
  result = await waitForValue("status__a__sync", "false", 1_000)
  t.true(result)
})

test("b sync", async (t) => {
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__b__sync__on")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__b__sync__off")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__b__sync__on")
  result = await waitForValue("status__b__sync", "true", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__b__sync__off")
  result = await waitForValue("status__b__sync", "false", 1_000)
  t.true(result)
})

test("c sync", async (t) => {
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__c__sync__on")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__c__sync__off")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__c__sync__on")
  result = await waitForValue("status__c__sync", "true", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__c__sync__off")
  result = await waitForValue("status__c__sync", "false", 1_000)
  t.true(result)
})

test("d sync", async (t) => {
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__d__sync__on")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__d__sync__off")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__d__sync__on")
  result = await waitForValue("status__d__sync", "true", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__d__sync__off")
  result = await waitForValue("status__d__sync", "false", 1_000)
  t.true(result)
})
