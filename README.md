# STINA

**STINA: Swedish Text, Idiom, and Noun Announcer**

STINA is a Slack bot which periodically sends out something Swedish to a given
Slack channel of choice. This allows people to learn useful (hopefully) things
in Swedish :thumbsup:

## Usage

## Installation, configuration, and running

### Installation

```
$ git clone https://github.com/zozs/stina.git
$ npm install
```

### Configuration

Preferably, copy `config/default.json` to `config/local.json` and perform configuration in that file. You will have to modify at least the `token` setting.

The configuration file has the following properties:

 * `token`: The token for the bot as added to your team.

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
