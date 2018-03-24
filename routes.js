const addCommand = require('./add')
const announceCommand = require('./announce')
const helpCommand = require('./help')
const statsCommand = require('./stats')
const usageCommand = require('./usage')

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send('STINA ready.')
  })

  // Will receive /stina slash command from Slack.
  app.post('/commands', async (req, res) => {
    // extract the verification token, slash command text and trigger ID from payload
    const body = req.body

    // check that the verification token matches expected value
    if (body.token === process.env.SLACK_VERIFICATION_TOKEN) {
      // create the dialog payload - includes the dialog structure, Slack API token,
      // and trigger ID
      console.debug('Got slash command with text:', body.text)
      try {
        if (body.text === 'add') {
          await addCommand.addCommand(body.trigger_id)
          res.send('')
        } else if (body.text === 'announce') {
          res.send('')
          await announceCommand()
        } else if (body.text === 'stats') {
          await statsCommand(res)
        } else if (body.text === 'help') {
          await helpCommand(res)
        } else {
          await usageCommand(res)
        }
      } catch (e) {
        console.error('Handling slash command with text:', body.text, 'failed with error:', e)
        res.sendStatus(500)
      }
    } else {
      console.debug('Verification token mismatch')
      res.sendStatus(403)
    }
  })

  // Will receive response when user submits add dialog.
  app.post('/interactive', async (req, res) => {
    const body = JSON.parse(req.body.payload)

    // check that the verification token matches expected value
    if (body.token === process.env.SLACK_VERIFICATION_TOKEN) {
      // got response from dialog! now add it to the database.
      // we assume slack has validated the data enough
      res.send('')
      await addCommand.handleResponse(body)
    } else {
      console.debug('Verification token mismatch')
      res.sendStatus(403)
    }
  })
}
