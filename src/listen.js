#!/usr/bin/env node
import midi from "midi"
import value_to_size from "constants/value-to-size.json"
import size_to_value from "constants/size-to-value.json"
import statuses from "constants/statuses.json"
import commands from "constants/commands.json"
import ora from "ora"
import { redis, redis_sub, redis_key } from "./redis"

export default async function () {
  const input = new midi.Input()

  redis.config("set", "notify-keyspace-events", "KEA")

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

    if (status?.ShortName === "beat_phase") {
      if (message[2] === 8) {
        redis.incr(`status__${status.Deck}__beats`)
      }
      return
    }

    spinner.info(`Receive midi message ${key}`)
    if (!status) {
      spinner.fail(`We don't have a status for that key`)
      spinner.start(active_message)
      return
    }

    let val = message[2]

    if (status.Convert) {
      val = value_to_size?.[message[2]]
    } else if (status[`Is Binary`]) {
      val = message[2] === 127
    }

    spinner.info(`id: ${status.Id}, val: ${val}`)
    spinner.start(active_message)

    redis.set(status.Id, val)
  })

  const output = new midi.Output()
  output.openPort(1)

  await redis_key.subscribe("__keyevent@0__:set")
  await redis_key.subscribe("__keyevent@0__:incrby")
  redis_key.on("message", (channel, key) => {
    spinner.info(`Receive redis (2) message ${key}`)
    spinner.start(active_message)
  })

  await redis_sub.subscribe("purple-sector")
  redis_sub.on("message", (channel, key) => {
    spinner.info(`Receive redis message ${key}`)
    let [, deck, short_name, val] = key.split("__")

    if (val === "{val}") {
      spinner.fail("Don't pass in {val} like that in the key")
      spinner.start(active_message)
      return
    }

    if (val.indexOf("1_") !== -1) {
      key = `command__${deck}__${short_name}__{val}`
    } else if (parseInt(val) || val === "0") {
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

    if (command.Convert) {
      val = size_to_value?.[val]
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
}
