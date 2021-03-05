import test from "ava"
import { spawn } from "child_process"
import Redis from "ioredis"

const delay = async function (time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  })
}

test("main", async (t) => {
  // const redis = new Redis()
  const redis_pub = new Redis()
  const purple = spawn("./dist/cli.js", [], {})

  await delay(2000)

  redis_pub.publish("purple-sector", "b__filter__off")

  await delay(1000)
  redis_pub.publish("purple-sector", "b__filter__on")

  await delay(1000)
  //redis.get(
  redis_pub.publish("purple-sector", "b__filter__off")

  await delay(1000)

  purple.kill()
  t.pass()
})
