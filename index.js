require("dotenv").config();

const { App } = require("@slack/bolt");
const axios = require("axios");

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    appToken: process.env.SLACK_APP_TOKEN,
    socketMode: true
});

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

app.command("/trulles-minion-ping", async ({ command, ack, respond }) => {
    const start = Date.now();
    await ack();
    const latency = Date.now() - start;
    await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

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