const announceCommand = require('./announce')
const schedule = require('node-schedule')

module.exports = async () => {
  schedule.scheduleJob({hour: 17, minute: 30, dayOfWeek: new schedule.Range(1, 6)}, announce)
  // schedule.scheduleJob({hour: 9, minute: 52, dayOfWeek: new schedule.Range(1, 5)}, announce)
  // schedule.scheduleJob({hour: 9, minute: 53, dayOfWeek: new schedule.Range(1, 5)}, announce)
}

async function announce () {
  // Sends a daily (?) announce of some interesting word.
  try {
    console.log('Announcing scheduled daily word')
    await announceCommand()
  } catch (e) {
    console.error('Failed to announce daily word! Got error:', e)
  }
}
