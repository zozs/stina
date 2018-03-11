const db = require('./db')

function handleMessage (message, event) {
  // We know that this is a message for us. Either a DM or a mention.
  // If it is a mention, the mentioning part has already been stripped of.
  // The message text has also already been trimmed.
  console.log('Got message:', message)

  // Handle the different kind of messages we can get here.
  let simpleAddMatcher = /^add (\w+) (\w+)$/
  let multiAddMatcher = /^add\n(.*)\n(.*)/

  // Add command
  if (simpleAddMatcher.test(message)) {
    let m = simpleAddMatcher.exec(message)
    handleAdd(m[1], m[2])
  } else if (multiAddMatcher.test(message)) {
    let m = multiAddMatcher.exec(message)
    handleAdd(m[1], m[2])
  }
}

async function handleAdd (swedish, english) {
  try {
    await db.addWord({
      type: 'something',
      swedish: swedish,
      english: english
    })
    // send reply.
    // await
  } catch (e) {
    // reply with error.
    console.error('Failed to add word to database:', e)
  }
}

module.exports = {
  handleMessage: handleMessage
}
