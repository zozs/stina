const fs = require('fs')
const { promisify } = require('util')
const _ = require('lodash')

const dataFilename = process.env.DATA

function parseJSON () {
  try {
    const jsonData = fs.readFileSync(dataFilename, 'utf8')
    return JSON.parse(jsonData)
  } catch (e) {
    return {
      unseen: [],
      seen: []
    }
  }
}

async function saveJSON (dataObj) {
  const jsonData = JSON.stringify(dataObj)
  await promisify(fs.writeFile)(dataFilename, jsonData, 'utf8')
}

// Parse the data once on startup, then save when changes are made.
const data = parseJSON()

module.exports = {
  addWord: async (word) => {
    data.unseen.push(word)
    await saveJSON(data)
  },
  allUnseenWords: () => data.unseen,
  allSeenWords: () => data.seen,
  popUnseenWord: async () => {
    const word = _.sample(data.unseen)
    if (word !== undefined) {
      data.seen.push(word)
      data.unseen = data.unseen.filter(w => w !== word)
      await saveJSON(data)
    }
    return word
  },
  randomSeenWord: () => _.sample(data.seen)
}
