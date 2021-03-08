import Redis from "ioredis"

export default async function (key, target, timeout, negate) {
  const redis = new Redis()
  const redis_sub = new Redis()

  const ks = `__keyspace@0__:${key}`
  await redis_sub.subscribe(ks)

  let value = await redis.get(key)
  let evaluation = value === target
  if (negate) {
    evaluation = !evaluation
  }

  return new Promise(function (resolve) {
    if (evaluation) {
      resolve(true)
      return
    }

    redis_sub.on("message", async () => {
      value = await redis.get(key)
      let evaluation = value === target
      if (negate) {
        evaluation = !evaluation
      }
      if (evaluation) {
        redis_sub.unsubscribe(ks)
        resolve(true)
        return
      }
    })

    setTimeout(() => {
      redis_sub.unsubscribe(ks)
      resolve(false)
    }, timeout)
  })
}
