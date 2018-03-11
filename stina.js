const { RtmClient, CLIENT_EVENTS, WebClient } = require('@slack/client')
const schedule = require('node-schedule')
const db = require('./db')
const receiver = require('./receiver')

// An access token (from your Slack app or custom integration - usually xoxb)
const token = process.env.SLACK_TOKEN

// Cache of data
const appData = {}

// Initialize the RTM client with the recommended settings. Using the defaults for these
// settings is deprecated.
const rtm = new RtmClient(token, {
  dataStore: false,
  useRtmConnect: true
})

// Need a web client to find a channel where the app can post a message
const web = new WebClient(token)

// The client will emit an RTM.AUTHENTICATED event on when the connection data is avaiable
// (before the connection is open)
rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, connectData => {
  // Cache the data necessary for this app in memory
  appData.selfId = connectData.self.id
  console.log(`Logged in as ${appData.selfId} of team ${connectData.team.id}`)
})

// The client will emit an RTM.RTM_CONNECTION_OPENED the connection is ready for
// sending and recieving messages
rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, () => {
  console.log(`Ready`)

  // Schedule announcement
  schedule.scheduleJob({hour: 9, minute: 51, dayOfWeek: new schedule.Range(1, 5)}, announce)
  schedule.scheduleJob({hour: 9, minute: 52, dayOfWeek: new schedule.Range(1, 5)}, announce)
  schedule.scheduleJob({hour: 9, minute: 53, dayOfWeek: new schedule.Range(1, 5)}, announce)
})

// Message listener.
rtm.on('message', event => {
  // Skip messages that are from a bot or my own user ID
  if ((event.subtype && event.subtype === 'bot_message') ||
       (!event.subtype && event.user === rtm.activeUserId)) {
    return
  }

  // Only consider messages where we're either the sole recipient (in case of a direct message)
  // or if we're mentioned ( @stina hej ) in a channel we're in.
  let messageText = ''
  if (event.channel && event.channel[0] === 'D') {
    // this is a direct message to us.
    messageText = event.text.trim()
  } else if (event.text && event.text.startsWith(`<@${appData.selfId}>`)) {
    // someone mentioned us in a message.
    messageText = event.text.substr(`<@${appData.selfId}>`.length).trim()
  } else {
    // something else.
    return
  }

  receiver.handleMessage(messageText, event)
})

async function announce () {
  // Sends a daily (?) announce of something interesting.
  let destinationChannels = await botMemberChannels()
  if (destinationChannels.length === 0) {
    console.warn('Tried to announce word, but bot is not a member of any channel!')
  }

  for (let c of destinationChannels) {
    // Send a message to each channel we're a member of.
    try {
      let word = await db.popUnseenWord()
      if (word !== undefined) {
        let message = `*Swedish of the day!*
>>>
_Svenska_: ${word.swedish}
_English_: ${word.english}`
        await rtm.sendMessage(message, c.id)
        console.log('Successfully announced word:', JSON.stringify(word))
      } else {
        let message = `*Swedish of the day!*
>>>
I'm sorry, but there are no unseen words left in the list :cry:`
        await rtm.sendMessage(message, c.id)
      }
    } catch (e) {
      console.error('Failed to send message! Got error:', e)
    }
  }
}

async function botMemberChannels () {
  // This will only find public channels we're a member of.
  let channelList = await web.channels.list()
  return channelList.channels.filter(c => c.is_member)
}

// Start the connecting process
rtm.start()
