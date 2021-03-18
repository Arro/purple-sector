"use strict";

var _waitForValue = _interopRequireDefault(require("./wait-for-value"));

var _waitForBeat = _interopRequireDefault(require("./wait-for-beat"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  waitForValue: _waitForValue.default,
  waitForBeat: _waitForBeat.default
};