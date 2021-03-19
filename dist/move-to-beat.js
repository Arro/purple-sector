"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _ioredis = _interopRequireDefault(require("ioredis"));

var _delay = _interopRequireDefault(require("./delay"));

var _waitForValue = _interopRequireDefault(require("./wait-for-value"));

var _realSizeToSize = _interopRequireDefault(require("../constants/real-size-to-size.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function _default(beat, deck) {
  const redis = new _ioredis.default();
  const redis_2 = new _ioredis.default();
  redis.publish("purple-sector", `command__${deck}__size__4`);
  await (0, _delay.default)(40);
  redis.publish("purple-sector", `command__${deck}__mode__loop`);
  await (0, _delay.default)(40);
  redis.publish("purple-sector", `command__${deck}__mode__beatjump`);
  let current_beat = await redis_2.get(`status__${deck}__beats`);
  current_beat = parseInt(current_beat);
  let move_direction = current_beat < beat ? "forward" : "back";
  console.log(move_direction);

  while (current_beat !== beat) {
    console.log(`current_beat:  ${current_beat}`);
    console.log(`beat difference:  ${beat - current_beat}`);

    let [real_size, size_to_move] = _realSizeToSize.default.find(s => {
      if (move_direction === "forward") {
        return beat - current_beat >= s[0];
      } else {
        return current_beat - beat >= s[0];
      }
    });

    console.log(real_size, size_to_move);
    redis.publish("purple-sector", `command__${deck}__size__${size_to_move}`);
    await (0, _waitForValue.default)(`status__${deck}__size`, size_to_move, 1_000);
    redis.publish("purple-sector", `command__${deck}__move__${move_direction}`);
    await (0, _delay.default)(40);

    if (move_direction === "forward") {
      current_beat += real_size;
    } else {
      current_beat -= real_size;
    }
  }

  redis.set(`status__${deck}__beats`, beat);
}