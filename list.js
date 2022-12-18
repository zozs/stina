const db = require('./db')

module.exports = async (res) => {
  console.debug('Returning all words.')

  const unseenAttachment = {
    title: 'Unseen words',
    text: db.allUnseenWords().map(w => w.swedish).join('\n'),
    color: 'good'
  }

  const seenAttachment = {
    title: 'Seen words',
    text: db.allSeenWords().map(w => w.swedish).join('\n'),
    color: 'warning'
  }

  const listMessage = {
    token: process.env.SLACK_ACCESS_TOKEN,
    as_user: false,
    text: 'These are the words in STINA\'s database',
    attachments: [seenAttachment, unseenAttachment]
  }
  res.send(listMessage)
  console.debug('Returned all words.')
}
