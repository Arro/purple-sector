"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _ioredis = _interopRequireDefault(require("ioredis"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function _default(key, target, timeout) {
  const redis = new _ioredis.default();
  const redis_sub = new _ioredis.default();
  const ks = `__keyspace@0__:${key}`;
  await redis_sub.subscribe(ks);
  let value = await redis.get(key);
  let evaluation = value === target;
  return new Promise(function (resolve, reject) {
    if (evaluation) {
      resolve(true);
      return;
    }

    redis_sub.on("message", async () => {
      value = await redis.get(key);
      let evaluation = value === target;

      if (evaluation) {
        redis_sub.unsubscribe(ks);
        resolve(true);
        return;
      }
    });
    setTimeout(() => {
      redis_sub.unsubscribe(ks);
      reject(`waited ${timeout}ms on key ${key}, wanted ${target} and got ${value}`);
    }, timeout);
  });
}