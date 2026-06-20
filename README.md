# Trulles Minion - Slack bot

A fun little slack bot

---

## Getting started

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
