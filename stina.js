const { RtmClient, CLIENT_EVENTS, WebClient } = require('@slack/client')
const schedule = require('node-schedule')

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
  schedule.scheduleJob({hour: 14, minute: 36, dayOfWeek: new schedule.Range(1, 5)}, announce)
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
      await rtm.sendMessage('Hello, world!', c.id)
      console.log('Successfully sent announce message.')
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
