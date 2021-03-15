import listen from "src/listen"
import waitForValue from "src/wait-for-value"
;(async function () {
  return await listen()
})()

exports.waitForValue = waitForValue
