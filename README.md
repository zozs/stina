# STINA

**STINA: Swedish Text, Idiom, and Noun Announcer**

STINA is a Slack app which periodically sends out something Swedish to a given
Slack channel of choice. This allows people to learn useful (hopefully) things
in Swedish :thumbsup:

## Usage

You can always call `/stina help` to get a list of available commands. For
reference, the same list is presented below:

### Word-related commands

- `/stina add`: add a new word to STINA\'s database.
- `/stina announce`: manually announce a random word from STINA\'s database.

### Other commands

- `/stina stats`: return the number of words in the database.

## Installation, configuration, and running

### Installation

First grab the source code.

```
$ git clone https://github.com/zozs/stina.git
$ npm install
```

Then add an app to your Slack workspace. Configure it as follows:

#### Interactive components

Add the URL to the server the app is running on, followed by `/interactive`, e.g. `https://example.com/interactive`

#### Slash commands

Add the command `/stina`, with the request url similar to: `https://example.com/commands`

#### Permissions

Add the following scopes:

- `commands`
- `channels:read`
- `chat:write:bot`
- `users:read`

#### Install the app

The install the app, and go to Permissions and note down the generated token. Also look
up the Verification token.

### Configuration

STINA needs some environmental variables configured. You can either supply them as regular
environmental variables in your shell, or put them in a `.env` file in the same folder as
`stina.js`.

 * `SLACK_ACCESS_TOKEN`: STINA's app token
 * `SLACK_VERIFICATION_TOKEN`: Token to verify that the requests comes from Slack
 * `PORT`: Port for HTTP server to listen on
 * `ANNOUNCE_CHANNEL`: Channel ID (e.g. C12345678) in which to post word announcements.
 * `DATA`: path to json-file with all words.

### Running

Just launch the `stina.js` file with Node.

## License

STINA is licensed under the ISC license, see the `LICENSE` file, or the text below:

```
Copyright (c) 2018, Linus Karlsson

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
```
