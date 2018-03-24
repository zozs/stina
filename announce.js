const axios = require('axios')
const db = require('./db')
const formatter = require('./formatter')
const qs = require('querystring')

const announceEmptyMessage = {
  token: process.env.SLACK_ACCESS_TOKEN,
  as_user: false,
  channel: process.env.ANNOUNCE_CHANNEL,
  text: `*Swedish of the day!*
I'm sorry, but there are no unseen words left in the list :cry:`
}

module.exports = async () => {
  console.debug('Announcing word.')

  let word = await db.popUnseenWord()
  if (word === undefined) {
    console.warn('There are no unseen words left in the database.')
    await axios.post('https://slack.com/api/chat.postMessage', qs.stringify(announceEmptyMessage))
    return
  }

  let wordAttachment = formatter.wordAttachment(word)

  let announceMessage = {
    token: process.env.SLACK_ACCESS_TOKEN,
    as_user: false,
    text: '*Swedish of the day!*',
    attachments: JSON.stringify([wordAttachment]),
    channel: process.env.ANNOUNCE_CHANNEL
  }

  await axios.post('https://slack.com/api/chat.postMessage', qs.stringify(announceMessage))
  console.debug('Announced word.')
}
