module.exports = async (res) => {
  let helpMessage = {
    text: `:female-teacher: *STINA - _Swedish Text, Idiom, and Noun Announcer_*`,
    attachments: [
      {
        title: 'Word-related commands',
        text: '`/stina add`: add a new word to STINA\'s database.\n`/stina announce`: manually announce a random word from STINA\'s database.'
      },
      {
        title: 'Other commands',
        text: '`/stina stats`: return the number of words in the database.'
      }
    ]
  }

  console.debug('Returning help instructions.')
  res.send(helpMessage)
  console.debug('Returned help instructions.')
}
