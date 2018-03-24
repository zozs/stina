const db = require('./db')

const wordColours = {
  'beginner': 'good',
  'intermediate': 'warning',
  'hard': 'danger'
}

const wordDifficulty = {
  'beginner': 'Beginner',
  'intermediate': 'Intermediate',
  'hard': 'Hard'
}

const wordType = {
  'word': 'Word',
  'idiom': 'Idiom',
  'phrase': 'Phrase'
}

module.exports = {
  wordAttachment: (word) => ({
    text: '',
    fields: [
      {
        'title': 'Swedish',
        'value': word.swedish,
        'short': false
      },
      {
        'title': 'English',
        'value': word.english,
        'short': false
      },
      {
        'title': 'Difficulty',
        'value': wordDifficulty[word.difficulty],
        'short': true
      },
      {
        'title': 'Type',
        'value': wordType[word.type],
        'short': true
      }
    ],
    color: wordColours[word.difficulty],
    footer: `Added by: <@${word.author}>`
  }),
  statAttachment: () => ({
    title: 'STINA stats',
    text: `Stina currently has ${db.allUnseenWords().length} words in her database.`,
    color: '#74c8ed'
  })
}
