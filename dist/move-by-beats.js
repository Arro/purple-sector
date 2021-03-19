"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _ioredis = _interopRequireDefault(require("ioredis"));

var _delay = _interopRequireDefault(require("./delay"));

var _waitForValue = _interopRequireDefault(require("./wait-for-value"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function _default(beats, deck) {
  const redis = new _ioredis.default();
  redis.publish("purple-sector", `command__${deck}__size__4`);
  await (0, _delay.default)(40);
  await redis.publish("purple-sector", `command__${deck}__size__1`);
  await (0, _waitForValue.default)(`status__${deck}__size`, "1", 1_000);
  redis.publish("purple-sector", `command__${deck}__mode__loop`);
  await (0, _delay.default)(40);
  redis.publish("purple-sector", `command__${deck}__mode__beatjump`);
  let current_beat = 0;

  while (current_beat !== beats) {
    if (current_beat < beats) {
      await redis.publish("purple-sector", `command__${deck}__move__forward`);
      await (0, _delay.default)(40);
      current_beat += 1;
    } else {
      await redis.publish("purple-sector", `command__${deck}__move__back`);
      await (0, _delay.default)(40);
      current_beat -= 1;
    }
  }

  redis.incrby(`status__${deck}__beats`, beats);
}