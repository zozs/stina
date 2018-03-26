const axios = require('axios')
const db = require('./db')
const formatter = require('./formatter')
const qs = require('querystring')

module.exports = {
  addCommand: async (triggerID) => {
    console.debug('Opening dialog for adding word')
    const dialog = {
      token: process.env.SLACK_ACCESS_TOKEN,
      trigger_id: triggerID,
      dialog: JSON.stringify({
        title: 'Add word to STINA',
        callback_id: 'add-word',
        submit_label: 'Add',
        elements: [
          {
            label: 'Swedish',
            type: 'text',
            name: 'swedish',
            hint: 'The word, phrase, or idiom in Swedish'
          },
          {
            label: 'English',
            type: 'textarea',
            name: 'english',
            hint: 'The word, phrase, or idiom translated and/or explained in English'
          },
          {
            label: 'Type',
            type: 'select',
            name: 'type',
            options: [
              { label: 'Word', value: 'word' },
              { label: 'Phrase', value: 'phrase' },
              { label: 'Idiom', value: 'idiom' }
            ]
          },
          {
            label: 'Difficulty',
            type: 'select',
            name: 'difficulty',
            options: [
              { label: 'Beginner', value: 'beginner' },
              { label: 'Intermediate', value: 'intermediate' },
              { label: 'Hard', value: 'hard' }
            ]
          }
        ]
      })
    }

    // open the dialog by calling the Slack API dialogs.open method
    await axios.post('https://slack.com/api/dialog.open', qs.stringify(dialog))
    console.debug('Opened dialog for adding word.')
  },
  handleResponse: async (body) => {
    try {
      let newWord = body.submission
      newWord.author = body.user.id
      await db.addWord(newWord)

      // Success! Tell the user!
      let wordAttachment = formatter.wordAttachment(newWord)
      let statAttachment = formatter.statAttachment()

      const successMessage = {
        token: process.env.SLACK_ACCESS_TOKEN,
        as_user: false,
        text: 'Your word was added successfully. Thanks for your contribution :heart:',
        attachments: JSON.stringify([wordAttachment, statAttachment]),
        channel: body.channel.id,
        user: body.user.id
      }

      await axios.post('https://slack.com/api/chat.postEphemeral', qs.stringify(successMessage))
      console.debug('Posted success message')
    } catch (e) {
      console.error('Failed to add new word. Got error:', e)
      try {
        const errorMessage = {
          token: process.env.SLACK_ACCESS_TOKEN,
          as_user: false,
          text: ':x: I\'m sorry, but an unknown error occurred while adding your word :cry:',
          channel: body.channel.id,
          user: body.user.id
        }

        await axios.post('https://slack.com/api/chat.postEphemeral', qs.stringify(errorMessage))
      } catch (e) {
        console.error('Failed to notify user about failure...')
      }
    }
  }
}
