#!/usr/bin/env node
"use strict";

var _midi = _interopRequireDefault(require("midi"));

var _lodash = require("lodash");

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _conversions = require("../constants/conversions");

var _ioredis = _interopRequireDefault(require("ioredis"));

var _ora = _interopRequireDefault(require("ora"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(async function () {
  let commands = await _fsExtra.default.readFile("./constants/commands.json", "utf-8");
  commands = JSON.parse(commands);
  commands = (0, _lodash.keyBy)(commands, cmd => {
    return `${cmd.Channel}-${cmd.CC}`;
  });
  const input = new _midi.default.Input();
  const redis = new _ioredis.default();
  (0, _ora.default)().start("listening for midi from the DJ software");
  input.openPort(0);
  input.on(`message`, (delta_time, message) => {
    let channel = message[0] - 175;
    let cc = message[1];

    if (channel < 10) {
      channel = `0` + channel;
    }

    if (cc < 100) {
      cc = `0` + cc;
    }

    if (parseInt(cc) < 10) {
      cc = `0` + cc;
    }

    const key = `${channel}-${cc}`;
    const command = commands[key];
    /*
    if (!command) {
      console.log(`--key: ${key}`)
      console.log(`not found :(`)
    }
    */

    if (command) {
      let val = message[2];

      if (command[`Is Conversion`]) {
        val = _conversions.val_to_size[message[2]];
      } else if (command[`Is Binary`]) {
        val = message[2] === 127;
      } else if (command[`Is Fraction`]) {
        val = message[2] / 127;
      }

      const deck = _conversions.deck_transform[command.Assignment];
      const short_name = command[`Short Name`];
      const redis_key = `${deck}__${short_name}`;
      redis.set(redis_key, val);
    }
  });
})();
