const { spawn } = require("child_process")

exports.default = async function ({ negotiateProtocol }) {
  const main = negotiateProtocol(["experimental"])
  const purple = await spawn("./dist/cli.js", [], {})
  main.ready()

  let num = 0
  for await (const worker of main.testWorkers()) {
    num += 1
    worker.teardown(() => {
      num -= 1
      if (num === 0) {
        purple.kill()
      }
    })
  }
}
