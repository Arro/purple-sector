"use strict";

var _waitForValue = _interopRequireDefault(require("./wait-for-value"));

var _moveToBeat = _interopRequireDefault(require("./move-to-beat"));

var _loadSong = _interopRequireDefault(require("./load-song"));

var _child_process = require("child_process");

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function listen() {
  const exe = _path.default.join(__dirname, "..", "dist", "cli.js");

  const purple = (0, _child_process.spawn)(exe, [], {});
  return () => {
    purple.kill();
    process.exit();
  };
}

module.exports = {
  waitForValue: _waitForValue.default,
  moveToBeat: _moveToBeat.default,
  loadSong: _loadSong.default,
  listen
};