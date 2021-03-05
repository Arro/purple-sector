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
  let out_commands = commands.filter(cmd => {
    return cmd.IO === "Out";
  });
  out_commands = (0, _lodash.keyBy)(out_commands, cmd => {
    return `${cmd.Channel}-${cmd.CC}`;
  });
  const input = new _midi.default.Input();
  const redis = new _ioredis.default();
  const redis_sub = new _ioredis.default();
  const spinner = (0, _ora.default)();
  const active_message = "listening for midi / redis";
  spinner.start(active_message);
  input.openPort(1);
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
    const command = out_commands[key];
    spinner.info(`Receive midi message ${key}`);

    if (!command) {
      spinner.fail(`We don't have a command for that key`);
      spinner.start(active_message);
      return;
    }

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
    spinner.info(`redis_key: ${redis_key}, val: ${val}`);
    redis.set(redis_key, val);
  });
  let in_commands = commands.filter(cmd => {
    return cmd.IO === "In";
  });
  in_commands = (0, _lodash.keyBy)(in_commands, cmd => {
    const deck = _conversions.deck_transform[cmd.Assignment];
    return `${deck}__${cmd["Short Name"]}`;
  });
  const output = new _midi.default.Output();
  output.openPort(0);
  await redis_sub.subscribe("purple-sector");
  redis_sub.on("message", (channel, key) => {
    spinner.info(`Receive redis message ${key}`);
    let [deck, control, val] = key.split("__");

    if (val === "{val}") {
      spinner.fail("Don't pass in {val} like that in the key");
      spinner.start(active_message);
      return;
    }

    if (parseInt(val)) {
      key = `${deck}__${control}__{val}`;
      val = parseInt(val);
    } else {
      val = 127;
    }

    const command = in_commands[key];

    if (!command) {
      spinner.fail(`We don't have a command for that key`);
      spinner.start(active_message);
      return;
    }

    const midi_message = [175 + parseInt(command.Channel), parseInt(command.CC), val];
    spinner.info(`sending ${JSON.stringify(midi_message)}`);
    output.sendMessage(midi_message);
    spinner.start(active_message);
  });
})();
