#!/usr/bin/env node
"use strict";

var _listen = _interopRequireDefault(require("./listen"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(async function () {
  await (0, _listen.default)();
})();