const db = require('./db')

const wordColours = {
  beginner: 'good',
  intermediate: 'warning',
  hard: 'danger'
}

const wordDifficulty = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  hard: 'Hard'
}

const wordType = {
  word: 'Word',
  idiom: 'Idiom',
  phrase: 'Phrase'
}

module.exports = {
  wordAttachment: (word) => ({
    text: '',
    fields: [
      {
        title: 'Swedish',
        value: word.swedish,
        short: false
      },
      {
        title: 'English',
        value: word.english,
        short: false
      },
      {
        title: 'Difficulty',
        value: wordDifficulty[word.difficulty],
        short: true
      },
      {
        title: 'Type',
        value: wordType[word.type],
        short: true
      }
    ],
    color: wordColours[word.difficulty],
    footer: `Added by: <@${word.author}>`
  }),
  statAttachment: () => ({
    title: 'STINA stats',
    text: `Stina currently has ${db.allUnseenWords().length} words in her database.`,
    color: '#74c8ed'
  }),
  noWordAttachment: () => ({
    text: 'I\'m sorry, but there are no words in the database :cry:',
    color: '#74c8ed'
  }),
  noUnseenWordAttachment: () => ({
    text: `I'm sorry, but there are no unseen words in the database :cry:
Instead, I'm showing an old word again.`,
    color: '#74c8ed'
  }),
  fewLeftAttachment: (count) => ({
    text: `There are ${count} unseen word(s) left! You should add some more!`,
    color: '#74c8ed'
  })
}
