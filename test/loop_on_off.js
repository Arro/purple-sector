import test from "ava"
import Redis from "ioredis"
import waitForValue from "src/wait-for-value"
import path from "path"
import delay from "src/delay"
import { registerSharedWorker } from "ava/plugin"

registerSharedWorker({
  filename: path.resolve(__dirname, "worker.js"),
  supportedProtocols: ["experimental"]
})

test.before(async (t) => {
  t.timeout(10_000)
  t.context.redis_pub = new Redis()
})

test("a loop on/off", async (t) => {
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__a__loop__on")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__a__loop__off")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__a__loop__on")
  result = await waitForValue("status__a__loop_on_off", "true", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__a__loop__off")
  result = await waitForValue("status__a__loop_on_off", "false", 1_000)
  t.true(result)
})

test("b loop on/off", async (t) => {
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__b__loop__on")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__b__loop__off")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__b__loop__on")
  result = await waitForValue("status__b__loop_on_off", "true", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__b__loop__off")
  result = await waitForValue("status__b__loop_on_off", "false", 1_000)
  t.true(result)
})
test("c loop on/off", async (t) => {
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__c__loop__on")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__c__loop__off")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__c__loop__on")
  result = await waitForValue("status__c__loop_on_off", "true", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__c__loop__off")
  result = await waitForValue("status__c__loop_on_off", "false", 1_000)
  t.true(result)
})
test("d loop on/off", async (t) => {
  let result
  const { redis_pub } = t.context

  await redis_pub.publish("purple-sector", "command__d__loop__on")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__d__loop__off")
  await delay(100)
  await redis_pub.publish("purple-sector", "command__d__loop__on")
  result = await waitForValue("status__d__loop_on_off", "true", 1_000)
  t.true(result)
  await redis_pub.publish("purple-sector", "command__d__loop__off")
  result = await waitForValue("status__d__loop_on_off", "false", 1_000)
  t.true(result)
})
