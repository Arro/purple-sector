# Purple Sector

An API for DJ software.

## Instructions

1. On a Mac, open "Audio MIDI Studio" application
1. On the top bar, select "Show MIDI Studio"
1. Double click IAC Driver
1. Check the checkbox that says "Device is online"
1. Make 2 ports. Ideally, one called `purple-sector-statuses` and one called
   `purple-status-commands`
1. Close Audio MIDI Studio
1. Open Traktor and choose "Preferences"
1. Go to "Controller Manager" and the bottom left
1. Click "Add...", then "Import TSI...", then "Import Other...".
1. Choose `tsi/purple-sector.tsi` from in this codebase
1. Choose "In-Port" as `purple-sector-commands`
1. Choose "Out-Port" as `purple-sector-statuses`
1. Close Traktor preferences
1. Run `npm run listen` in this codebase
