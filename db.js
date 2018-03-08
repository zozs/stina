const fs = require('fs')
const { promisify } = require('util')
const _ = require('lodash.sample')

const dataFilename = process.env.DATA

function parseJSON () {
  try {
    let jsonData = fs.readFileSync(dataFilename, 'utf8')
    return JSON.parse(jsonData)
  } catch (e) {
    return {
      words: []
    }
  }
}

async function saveJSON (dataObj) {
  let jsonData = JSON.stringify(dataObj)
  await promisify(fs.writeFile)(dataFilename, jsonData, 'utf8')
}

let data = parseJSON()

module.exports = {
  addWord: async (word) => {
    data.push(word)
    await saveJSON(data)
  },
  allWords: () => data.words,
  randomWord: () => _.sample(data.words)
}
