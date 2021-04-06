import Redis from "ioredis"

export default async function (key, target, timeout) {
  const redis = new Redis()
  const redis_sub = new Redis()

  const ks = `__keyspace@0__:${key}`
  await redis_sub.subscribe(ks)

  let value = await redis.get(key)
  let evaluation = value === target

  return new Promise(function (resolve, reject) {
    if (evaluation) {
      redis.disconnect()
      redis_sub.disconnect()
      resolve(true)
      return
    }

    redis_sub.on("message", async () => {
      value = await redis.get(key)
      evaluation = value === target
      if (evaluation) {
        redis_sub.unsubscribe(ks)
        redis_sub.disconnect()
        redis.disconnect()
        resolve(true)
        return
      }
    })

    setTimeout(() => {
      if (!evaluation) {
        redis_sub.unsubscribe(ks)
        redis_sub.disconnect()
        redis.disconnect()
        reject(
          `waited ${timeout}ms on key ${key}, wanted ${target} and got ${value}`
        )
      }
    }, timeout)
  })
}
