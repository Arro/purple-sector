//import { redis, redis_sub } from "./redis"
import { singleton } from "./redis"
const { redis, redis_sub } = singleton

export default async function (key, target, timeout) {
  const ks = `__keyspace@0__:${key}`
  console.log(ks)
  await redis_sub.subscribe(ks)

  let value = await redis.get(key)
  let evaluation = value === target

  return new Promise(function (resolve, reject) {
    if (evaluation) {
      resolve(true)
      return
    }

    redis_sub.on("message", async () => {
      value = await redis.get(key)
      evaluation = value === target
      if (evaluation) {
        redis_sub.unsubscribe(ks)
        resolve(true)
        return
      }
    })

    setTimeout(() => {
      if (!evaluation) {
        redis_sub.unsubscribe(ks)
        reject(
          `waited ${timeout}ms on key ${key}, wanted ${target} and got ${value}`
        )
      }
    }, timeout)
  })
}
