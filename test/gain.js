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
  const lock = context.createLock("mixer")
  await lock.acquire()
})

test("a gain", async (t) => {
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__a__gain__0")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__a__gain__25")
  result = await waitForValue("status__a__gain", "26", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__a__gain__124")
  result = await waitForValue("status__a__gain", "123", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__a__gain__63")
  result = await waitForValue("status__a__gain", "63", 1_000)
  t.true(result)
})

test("b gain", async (t) => {
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__b__gain__0")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__b__gain__25")
  result = await waitForValue("status__b__gain", "26", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__b__gain__124")
  result = await waitForValue("status__b__gain", "123", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__b__gain__63")
  result = await waitForValue("status__b__gain", "63", 1_000)
  t.true(result)
})
test("c gain", async (t) => {
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__c__gain__0")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__c__gain__25")
  result = await waitForValue("status__c__gain", "26", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__c__gain__124")
  result = await waitForValue("status__c__gain", "123", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__c__gain__63")
  result = await waitForValue("status__c__gain", "63", 1_000)
  t.true(result)
})
test("d gain", async (t) => {
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__d__gain__0")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__d__gain__25")
  result = await waitForValue("status__d__gain", "26", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__d__gain__124")
  result = await waitForValue("status__d__gain", "123", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__d__gain__63")
  result = await waitForValue("status__d__gain", "63", 1_000)
  t.true(result)
})
