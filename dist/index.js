"use strict";

var _listen = _interopRequireDefault(require("./listen"));

var _waitForValue = _interopRequireDefault(require("./wait-for-value"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(async function () {
  return await (0, _listen.default)();
})();

exports.waitForValue = _waitForValue.default;