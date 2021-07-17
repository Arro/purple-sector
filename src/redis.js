import Redis from "ioredis"
import delay from "src/delay"
import midi from "midi"
import EventEmitter from "events"

import value_to_size from "constants/value-to-size.json"
import size_to_value from "constants/size-to-value.json"
import statuses from "constants/statuses.json"
import commands from "constants/commands.json"

import moveToBeat from "src/move-to-beat"
import moveByBeats from "src/move-by-beats"
import loadSong from "src/load-song"

export default {
  targets: {},
  redis: new Redis(),
  redis_sub: new Redis(),
  initialized: false,
  beat_emitter: new EventEmitter(),

  init: async function () {
    if (this.initialized) return
    this.initialized = true

    this.redis.config("set", "notify-keyspace-events", "KEA")
    const input = new midi.Input()

    input.openPort(0)
    input.on(`message`, async (delta_time, message) => {
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
          const beats = await this.redis.incr(`status__${status.Deck}__beats`)
          this.beat_emitter.emit(status.Deck, beats)
          const _key = `status__${status.Deck}__beats---${beats}`
          if (this.targets[_key]) {
            this.targets[_key](true)
            delete this.targets[_key]
          }
        }
        return
      }

      let val = message[2]

      if (status.Convert) {
        val = value_to_size?.[message[2]]
      } else if (status[`Is Binary`]) {
        val = message[2] === 127
      }

      this.redis.set(status.Id, val)
    })

    const output = new midi.Output()
    output.openPort(1)

    await this.redis_sub.subscribe("purple-sector")
    this.redis_sub.on("message", (channel, key) => {
      let [, deck, short_name, val] = key.split("__")

      if (val === "{val}") {
        return
      }

      if (val?.indexOf("1_") !== -1) {
        key = `command__${deck}__${short_name}__{val}`
      } else if (parseInt(val) || val === "0") {
        key = `command__${deck}__${short_name}__{val}`
        val = parseInt(val)
      } else {
        val = 127
      }

      const command = commands[key]

      if (command.Convert) {
        val = size_to_value?.[val]
      }

      const midi_message = [
        175 + parseInt(command.Channel),
        parseInt(command.CC),
        val
      ]
      output.sendMessage(midi_message)
    })

    for (const midi_key in statuses) {
      const status = statuses[midi_key]
      const sub2 = new Redis()
      const key = `__keyspace@0__:${status.Id}`
      await sub2.subscribe(key)
      sub2.on("message", async () => {
        const value = await this.redis.get(status.Id)
        const _key = `${status.Id}---${value}`
        if (this.targets[_key]) {
          this.targets[_key](true)
          delete this.targets[_key]
        }
      })
    }
    return delay(1000)
  },

  waitForValue: async function (key, target) {
    const value = await this.redis.get(key)
    if (value === target) {
      return new Promise((resolve) => {
        resolve(true)
      })
    }

    const _key = `${key}---${target}`
    const new_promise = new Promise((resolve) => {
      this.targets[_key] = resolve
    })
    return new_promise
  },

  publish: function (value) {
    this.redis.publish("purple-sector", value)
  },

  get: async function (value) {
    return await this.redis.get(value)
  },

  set: async function (key, value) {
    return await this.redis.set(key, value)
  },

  async incrby(key, value) {
    return await this.redis.incrby(key, value)
  },

  issueCommand: function (deck, short_name, val) {
    this.publish(`command__${deck}__${short_name}__${val}`)
  },

  getValue: async function (deck, short_name) {
    return await this.get(`status__${deck}__${short_name}`)
  },

  moveByBeats,
  moveToBeat,
  loadSong
}
