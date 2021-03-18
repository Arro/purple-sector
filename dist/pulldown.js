"use strict";

var _lodash = require("lodash");

var _airtableJson = _interopRequireDefault(require("airtable-json"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _ora = _interopRequireDefault(require("ora"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

(async function () {
  const spinner = (0, _ora.default)();
  spinner.start("Pulling down entries from Airtable");
  let entries = await (0, _airtableJson.default)({
    auth_key: process.env.airtable_key,
    base_name: process.env.airtable_base,
    primary: "Entries",
    view: "Main"
  });
  spinner.succeed(`Pulled down ${entries.length} commands from Airtable`);
  entries = entries.map(entry => {
    delete entry.__id;
    return entry;
  });
  spinner.start("Writing commands to constants folder");
  let commands = entries.filter(cmd => {
    return cmd.IO === "command";
  });
  commands = (0, _lodash.keyBy)(commands, "Id");
  await _fsExtra.default.writeFile("./constants/commands.json", JSON.stringify(commands, null, 2), "utf-8");
  spinner.succeed("Wrote commands to constants folder");
  spinner.start("Writing statuses to constants folder");
  let statuses = entries.filter(cmd => {
    return cmd.IO === "status";
  });
  statuses = (0, _lodash.keyBy)(statuses, cmd => {
    return `${cmd.Channel}-${cmd.CC}`;
  });
  await _fsExtra.default.writeFile("./constants/statuses.json", JSON.stringify(statuses, null, 2), "utf-8");
  spinner.succeed("Wrote statuses to constants folder");
  spinner.start("Pulling down conversions from Airtable");
  let conversions = await (0, _airtableJson.default)({
    auth_key: process.env.airtable_key,
    base_name: process.env.airtable_base,
    primary: "Conversions",
    view: "Main"
  });
  spinner.succeed(`Pulled down ${conversions.length} conversions from Airtable`);
  let size_to_value = {};
  let value_to_size = {};
  conversions.forEach(({
    Size,
    Value
  }) => {
    size_to_value[Size] = Value;
    value_to_size[Value] = Size;
  });
  spinner.start("Writing conversions to constants folder");
  await _fsExtra.default.writeFile("./constants/size-to-value.json", JSON.stringify(size_to_value, null, 2), "utf-8");
  await _fsExtra.default.writeFile("./constants/value-to-size.json", JSON.stringify(value_to_size, null, 2), "utf-8");
  spinner.succeed("Wrote statuses to constants folder");
})();