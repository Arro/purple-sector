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

test("a filter", async (t) => {
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__a__filter__0")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__a__filter__25")
  result = await waitForValue("status__a__filter", "26", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__a__filter__124")
  result = await waitForValue("status__a__filter", "123", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__a__filter__63")
  result = await waitForValue("status__a__filter", "63", 1_000)
  t.true(result)
})

test("b filter", async (t) => {
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__b__filter__0")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__b__filter__25")
  result = await waitForValue("status__b__filter", "26", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__b__filter__124")
  result = await waitForValue("status__b__filter", "123", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__b__filter__63")
  result = await waitForValue("status__b__filter", "63", 1_000)
  t.true(result)
})

test("c filter", async (t) => {
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__c__filter__0")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__c__filter__25")
  result = await waitForValue("status__c__filter", "26", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__c__filter__124")
  result = await waitForValue("status__c__filter", "123", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__c__filter__63")
  result = await waitForValue("status__c__filter", "63", 1_000)
  t.true(result)
})

test("d filter", async (t) => {
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__d__filter__0")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__d__filter__25")
  result = await waitForValue("status__d__filter", "26", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__d__filter__124")
  result = await waitForValue("status__d__filter", "123", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__d__filter__63")
  result = await waitForValue("status__d__filter", "63", 1_000)
  t.true(result)
})

test("a filter on/off", async (t) => {
  let result
  const { redis_pub } = t.context
  await redis_pub.publish("purple-sector", "command__a__filter__off")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__a__filter__on")
  result = await waitForValue("status__a__filter_on_off", "true", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__a__filter__off")
  result = await waitForValue("status__a__filter_on_off", "false", 1_000)
  t.true(result)
})

test("b filter on/off", async (t) => {
  let result
  const { redis_pub } = t.context
  await redis_pub.publish("purple-sector", "command__b__filter__off")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__b__filter__on")
  result = await waitForValue("status__b__filter_on_off", "true", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__b__filter__off")
  result = await waitForValue("status__b__filter_on_off", "false", 1_000)
  t.true(result)
})

test("c filter on/off", async (t) => {
  let result
  const { redis_pub } = t.context
  await redis_pub.publish("purple-sector", "command__c__filter__off")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__c__filter__on")
  result = await waitForValue("status__c__filter_on_off", "true", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__c__filter__off")
  result = await waitForValue("status__c__filter_on_off", "false", 1_000)
  t.true(result)
})

test("d filter on/off", async (t) => {
  let result
  const { redis_pub } = t.context
  await redis_pub.publish("purple-sector", "command__d__filter__off")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__d__filter__on")
  result = await waitForValue("status__d__filter_on_off", "true", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__d__filter__off")
  result = await waitForValue("status__d__filter_on_off", "false", 1_000)
  t.true(result)
})
