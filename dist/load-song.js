"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _ioredis = _interopRequireDefault(require("ioredis"));

var _delay = _interopRequireDefault(require("./delay"));

var _waitForValue = _interopRequireDefault(require("./wait-for-value"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function _default(num, deck) {
  const redis = new _ioredis.default();
  await (0, _delay.default)(100);
  redis.publish("purple-sector", `command__${deck}__unload__trigger`);
  await (0, _delay.default)(40);
  redis.publish("purple-sector", "command__global__select__bottom");
  await (0, _delay.default)(40);
  redis.publish("purple-sector", "command__global__select__top");
  await (0, _delay.default)(40);
  let current_pos = 0;

  while (current_pos !== num) {
    if (num - current_pos >= 100) {
      redis.publish("purple-sector", "command__global__select__down_100");
      current_pos += 100;
    } else if (num - current_pos >= 10) {
      redis.publish("purple-sector", "command__global__select__down_10");
      current_pos += 10;
    } else {
      redis.publish("purple-sector", "command__global__select__down");
      current_pos += 1;
    }

    await (0, _delay.default)(40);
  }

  redis.publish("purple-sector", `command__${deck}__load__trigger`);
  await (0, _waitForValue.default)(`status__${deck}__load`, "true", 3_000);
}