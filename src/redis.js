import Redis from "ioredis"
import delay from "src/delay"

/*
export const redis = new Redis()
export const redis_2 = new Redis()
export const redis_sub = new Redis()
export const redis_key = new Redis()
*/

class Singleton {
  constructor() {
    this.targets = {}
    this.redis = new Redis()
    this.redis_sub = new Redis()
    this.redis_key = new Redis()

    this.redis.config("set", "notify-keyspace-events", "KEA")
  }

  async go(statuses) {
    console.log(`\n\n\nGO\n\n\n`)

    for (const midi_key in statuses) {
      const status = statuses[midi_key]
      const sub2 = new Redis()
      const key = `__keyspace@0__:${status.Id}`
      console.log(key)
      await sub2.subscribe(key)
      sub2.on("message", async () => {
        const value = await this.redis.get(status.Id)
        console.log(`\n\n`)
        console.log(status.Id)
        console.log(value)
        const _key = `${status.Id}---${value}`
        console.log(_key)
        console.log(`\n\n`)
        if (this.targets[_key]) {
          console.log(`YES`)
          this.targets[_key](true)
          delete this.targets[_key]
        }
      })
    }
    return delay(1000)
  }

  async waitForValue(key, target) {
    const value = await this.redis.get(key)
    console.log(`key: ${key}, value: ${value}, target: ${target}`)
    if (value === target) {
      console.log(`already good`)
      return new Promise((resolve) => {
        resolve(true)
      })
    }

    const _key = `${key}---${target}`

    const new_promise = new Promise((resolve) => {
      this.targets[_key] = resolve
    })
    return new_promise
  }
}

export const singleton = new Singleton()

/*
      if (command.endsWith("__{val}")) {
        //console.log(command)
        const key = `__keyspace@0__:${command.substr(0, command.length - 7)}__*`
        console.log(key)
        await sub2.psubscribe(key)
        sub2.on("pmessage", async () => {
          console.log(command)
        })
      }
     */
