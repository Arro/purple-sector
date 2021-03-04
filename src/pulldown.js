import airtableJson from "airtable-json"
import fs from "fs-extra"
import ora from "ora"
import dotenv from "dotenv"

dotenv.config()
;(async function () {
  const spinner = ora()
  spinner.start("Pulling down commands from Airtable")
  let commands = await airtableJson({
    auth_key: process.env.airtable_key,
    base_name: process.env.airtable_base,
    primary: "Commands",
    view: "Main"
  })
  spinner.succeed(`Pulled down ${commands.length} commands from Airtable`)

  commands = commands.map((command) => {
    delete command.__id
    return command
  })

  spinner.start("Writing commands to constants folder")
  await fs.writeFile(
    "./constants/commands.json",
    JSON.stringify(commands, null, 2),
    "utf-8"
  )
  spinner.suceed("Wrote commands to constants folder")
})()
