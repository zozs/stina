const axios = require('axios')
const db = require('./db')
const formatter = require('./formatter')
const qs = require('querystring')

module.exports = async () => {
  console.debug('Announcing word.')

  const attachments = []
  let word = await db.popUnseenWord()
  if (word === undefined) {
    console.warn('There are no unseen words left in the database.')
    word = db.randomSeenWord()
    if (word === undefined) {
      attachments.push(formatter.noWordAttachment())
      console.warn('There are no seen words in the database either!')
    } else {
      attachments.push(formatter.noUnseenWordAttachment())
      attachments.push(formatter.wordAttachment(word))
    }
  } else {
    attachments.push(formatter.wordAttachment(word))
    const left = db.allUnseenWords().length
    if (left <= 3) {
      attachments.push(formatter.fewLeftAttachment(left))
    }
  }

  const announceMessage = {
    token: process.env.SLACK_ACCESS_TOKEN,
    as_user: false,
    text: '*Swedish of the day!*',
    attachments: JSON.stringify(attachments),
    channel: process.env.ANNOUNCE_CHANNEL
  }
  await axios.post('https://slack.com/api/chat.postMessage', qs.stringify(announceMessage))
  console.debug('Announced word.')
}
