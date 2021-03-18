"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _ioredis = _interopRequireDefault(require("ioredis"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function _default(target_deck, target_value, num_beats = 1, timeout = 3000) {
  const redis_sub = new _ioredis.default();
  const ks = "purple-sector-beat";
  await redis_sub.subscribe(ks);
  let times_seen = 0;
  return new Promise(function (resolve, reject) {
    redis_sub.on("message", async (channel, key) => {
      let [deck, value] = key.split("__");

      if (deck === target_deck && value === target_value) {
        times_seen += 1;
      }

      if (times_seen === num_beats) {
        redis_sub.unsubscribe(ks);
        resolve();
        return;
      }
    });
    setTimeout(() => {
      redis_sub.unsubscribe(ks);
      reject();
    }, timeout);
  });
}