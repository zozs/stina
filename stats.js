const formatter = require('./formatter')

module.exports = async (res) => {
  console.debug('Returning stats.')

  let statAttachment = formatter.statAttachment()
  const statsMessage = {
    token: process.env.SLACK_ACCESS_TOKEN,
    as_user: false,
    text: '',
    attachments: [statAttachment]
  }
  res.send(statsMessage)
  console.debug('Returned stats.')
}
