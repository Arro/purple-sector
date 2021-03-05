#!/usr/bin/env node
import midi from "midi"
import fs from "fs-extra"
import { val_to_size } from "constants/conversions"
import Redis from "ioredis"
import ora from "ora"
;(async function () {
  let statuses = await fs.readFile("./constants/statuses.json", "utf-8")
  statuses = JSON.parse(statuses)

  const input = new midi.Input()
  const redis = new Redis()
  const redis_sub = new Redis()

  const spinner = ora()
  const active_message = "listening for midi / redis"
  spinner.start(active_message)

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

    const status = statuses[key]

    spinner.info(`Receive midi message ${key}`)
    if (!status) {
      spinner.fail(`We don't have a status for that key`)
      spinner.start(active_message)
      return
    }

    console.log(message)
    let val = message[2]

    if (status[`Is Conversion`]) {
      val = val_to_size[message[2]]
    } else if (status[`Is Binary`]) {
      val = message[2] === 127
    }

    spinner.info(`id: ${status.Id}, val: ${val}`)

    redis.set(status.Id, val)
  })

  let commands = await fs.readFile("./constants/commands.json", "utf-8")
  commands = JSON.parse(commands)

  const output = new midi.Output()
  output.openPort(1)

  await redis_sub.subscribe("purple-sector")
  redis_sub.on("message", (channel, key) => {
    spinner.info(`Receive redis message ${key}`)
    let [, deck, short_name, val] = key.split("__")

    if (val === "{val}") {
      spinner.fail("Don't pass in {val} like that in the key")
      spinner.start(active_message)
      return
    }

    if (parseInt(val)) {
      key = `command__${deck}__${short_name}__{val}`
      val = parseInt(val)
    } else {
      val = 127
    }

    const command = commands[key]

    if (!command) {
      spinner.fail(`We don't have a command for that redis message`)
      spinner.start(active_message)
      return
    }

    const midi_message = [
      175 + parseInt(command.Channel),
      parseInt(command.CC),
      val
    ]
    spinner.info(`sending ${JSON.stringify(midi_message)}`)
    output.sendMessage(midi_message)

    spinner.start(active_message)
  })
})()
