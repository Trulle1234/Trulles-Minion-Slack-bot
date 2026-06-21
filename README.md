# Trulles Minion - Slack bot

A fun little slack bot

_Largley based on: https://stardance.hackclub.com/missions/slack-bot/guide_

---

## Features
- Regularly scheduled reminders for my daily and weekly updates
- Answers with random words on ping (meant to be like a stupid AI that just responds with gibberish)
- Commands:
  - /trulles-minion-help - List all commands
  - /trulles-minion-ping - Check bot latency
  - /trulles-weather - See my local weather
  - /enter-trulles-basement - Get the link to join my priv channel

---

## Try it out

### Are you in the Hack Club slack?

**Yes:** Try it in _[#trulleathon](https://hackclub.enterprise.slack.com/archives/C0945H3P2GN)_! 

**No:** Set it up on your own workspace:

- First setup a slack bot

_See here for help: https://stardance.hackclub.com/missions/slack-bot/guide#step-3_

- Clone the repo and install dependencies:

```bash
git clone https://github.com/Trulle1234/Trulles-Minion-Slack-bot trulles-minion-slack-bot
cd trulles-minion-slack-bot
npm install
```

- Get a live API key from [apiverket.se](https://apiverket.se/)

- Add an .env file with:
```env
SLACK_BOT_TOKEN = xoxb-...   # bot user oauth token
SLACK_APP_TOKEN = xapp-...    # app-level token
APIVERKET_API_KEY = sk_live_...  # apiveket key
```

- Then start the server:

```bash
node index.js
```

**Now its live in slack!**
