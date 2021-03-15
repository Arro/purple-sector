"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

async function _default(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}