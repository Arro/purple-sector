import waitForValue from "src/wait-for-value"
import waitForBeat from "src/wait-for-beat"
import loadSong from "src/load-song"

import { spawn } from "child_process"
import path from "path"

function listen() {
  const exe = path.join(__dirname, "..", "dist", "cli.js")
  const purple = spawn(exe, [], {})
  return () => {
    purple.kill()
    process.exit()
  }
}

module.exports = {
  waitForValue,
  waitForBeat,
  loadSong,
  listen
}
