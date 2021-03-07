import test from "ava"
import { spawn } from "child_process"

const delay = async function (time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  })
}

test.before(async (t) => {
  t.context.purple = spawn("./dist/cli.js", [], {})
  await delay(2000)
})

test.after("cleanup", async (t) => {
  await delay(1000)
  t.context.purple.kill()
})

test("background", async (t) => {
  await delay(30000)
  t.pass()
})
