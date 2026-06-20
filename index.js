require("dotenv").config();

const { App } = require("@slack/bolt");
const cron = require('node-cron');
const axios = require("axios");

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    appToken: process.env.SLACK_APP_TOKEN,
    socketMode: true
});

// daily update
cron.schedule("0 0 20 * * *", async () => {
  try {
    await app.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: "C0945H3P2GN",
      text: "Reminder: <@U07904YUJ6A> what did you do today and how are you today? :question_block_mario:",
    });

    console.log("daily reminder sent");
  } catch (err) {
    console.error("failed to send daily reminder:", err);
  }
});

// weekly update
cron.schedule("0 21 * * 5", async () => {
  try {
    await app.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: "C0945H3P2GN",
      text: "Reminder: <@U07904YUJ6A> It is time for your weekly update! Post it here as soon as possible or be obliterated",
    });

    console.log("weekly reminder sent");
  } catch (err) {
    console.error("failed to send weekly reminder:", err);
  }
});

// weather
app.command("/trulles-weather", async ({ ack, respond }) => {
  await ack();
  try {
    const response = await axios.get("https://apiverket.se/v1/weather/kalmar", {
    headers: {
        Authorization: `Bearer ${process.env.APIVERKET_API_KEY}`
    }});
    await respond({ text: `It's currently ${response.data.data.temperature_c} °C in Kalmar.`});
  } catch (err) {
    await respond({ text: "Failed to fetch a weather." });
  }
});

// latency test
app.command("/trulles-minion-ping", async ({ command, ack, respond }) => {
    const start = Date.now();
    await ack();
    const latency = Date.now() - start;
    await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

// help
app.command("/trulles-minion-help", async ({ command, ack, respond }) => {
    const start = Date.now();
    await ack();
    await respond({ 
    text: 
`Available Commands:
/trulles-minion-ping - Check bot latency
/trulles-weather - See Trulles local weather 
` 
});
});

(async () => {
    await app.start();
    console.log("bot is running!");
})();