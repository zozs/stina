require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const mountAnnounces = require('./announces')
const mountRoutes = require('./routes')

const app = express()

/*
 * Environmental variables required:
 *
 * SLACK_ACCESS_TOKEN: STINA's app token
 * SLACK_VERIFICATION_TOKEN: Token to verify the requests comes from Slack
 * PORT: Port for HTTP server to listen on (default 3000)
 * ANNOUNCE_CHANNEL: Channel ID (e.g. C12345678) in which to post word announcements.
 * DATA: path to json-file with all words.
 */

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mountRoutes(app)
mountAnnounces()

app.listen(process.env.PORT, () => console.log('Stina listening on port', process.env.PORT))
