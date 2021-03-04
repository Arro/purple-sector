import midi from "midi"
import { keyBy } from "lodash"
import fs from "fs-extra"
import { val_to_size, deck_transform } from "constants/conversions"
import Redis from "ioredis"
import ora from "ora"
;(async function () {
  let commands = await fs.readFile("./constants/commands.json", "utf-8")
  commands = JSON.parse(commands)
  commands = keyBy(commands, (cmd) => {
    return `${cmd.Channel}-${cmd.CC}`
  })

  const input = new midi.Input()
  const redis = new Redis()

  ora().start("listening for midi from the DJ software")

  input.openPort(0)
  input.on(`message`, (delta_time, message) => {
    let channel = message[0] - 175
    let cc = message[1]

    if (channel < 10) {
      channel = `0` + channel
    }

    if (cc < 100) {
      cc = `0` + cc
    }
    if (parseInt(cc) < 10) {
      cc = `0` + cc
    }
    const key = `${channel}-${cc}`

    const command = commands[key]

    /*
    if (!command) {
      console.log(`--key: ${key}`)
      console.log(`not found :(`)
    }
   */

    if (command) {
      let val = message[2]

      if (command[`Is Conversion`]) {
        val = val_to_size[message[2]]
      } else if (command[`Is Binary`]) {
        val = message[2] === 127
      } else if (command[`Is Fraction`]) {
        val = message[2] / 127
      }

      const deck = deck_transform[command.Assignment]
      const short_name = command[`Short Name`]
      const redis_key = `${deck}__${short_name}`

      redis.set(redis_key, val)
    }
  })
})()
