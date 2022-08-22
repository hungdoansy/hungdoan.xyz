#!/usr/bin/env zx
const prompts = require("prompts")

const response = await prompts({
    type: "text",
    name: "name",
    message: "Name (with spaces): ",
    validate: (name) => name.length < 100,
})

const name = response.name.replaceAll(/\s+/g, "-")
await $`echo "Article slug: ${name}"`

const today = new Date().toISOString().slice(0, 10)

const folderPath = `public/notes/${today}/${name}`

await $`mkdir -p ${folderPath} && touch ${folderPath}/note.md`
echo`Created new article folder successfully. Check out ${folderPath}/note.md`
