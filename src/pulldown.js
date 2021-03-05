import { keyBy } from "lodash"
import airtableJson from "airtable-json"
import fs from "fs-extra"
import ora from "ora"
import dotenv from "dotenv"

dotenv.config()
;(async function () {
  const spinner = ora()
  spinner.start("Pulling down entries from Airtable")
  let entries = await airtableJson({
    auth_key: process.env.airtable_key,
    base_name: process.env.airtable_base,
    primary: "Entries",
    view: "Main"
  })
  spinner.succeed(`Pulled down ${entries.length} commands from Airtable`)

  entries = entries.map((entry) => {
    delete entry.__id
    return entry
  })

  spinner.start("Writing commands to constants folder")
  let commands = entries.filter((cmd) => {
    return cmd.IO === "command"
  })
  commands = keyBy(commands, "Id")
  await fs.writeFile(
    "./constants/commands.json",
    JSON.stringify(commands, null, 2),
    "utf-8"
  )
  spinner.succeed("Wrote commands to constants folder")

  spinner.start("Writing statuses to constants folder")
  let statuses = entries.filter((cmd) => {
    return cmd.IO === "status"
  })
  statuses = keyBy(statuses, (cmd) => {
    return `${cmd.Channel}-${cmd.CC}`
  })
  await fs.writeFile(
    "./constants/statuses.json",
    JSON.stringify(statuses, null, 2),
    "utf-8"
  )
  spinner.succeed("Wrote statuses to constants folder")
})()
