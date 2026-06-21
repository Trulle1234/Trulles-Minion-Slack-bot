require("dotenv").config();

const { App } = require("@slack/bolt");
const cron = require("node-cron");
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
            text: "<@U07904YUJ6A> what did you do today and how are you today? :question_block_mario:"
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
            text: "<@U07904YUJ6A> It is time for your weekly update! Post it here as soon as possible or be obliterated"
        });

        console.log("weekly reminder sent");
    } catch (err) {
        console.error("failed to send weekly reminder:", err);
    }
});

// channel welcome
app.event("member_joined_channel", async ({ event, client, say }) => {
    try {
        const TARGET_CHANNEL = "C0945H3P2GN";

        if (event.channel === TARGET_CHANNEL) {
            await app.client.chat.postMessage({
                token: process.env.SLACK_BOT_TOKEN,
                channel: TARGET_CHANNEL,
                text: `<@${event.user}> just joined! say hi people :hii:`
            });
        }
    } catch (err) {
        console.error(err);
    }
});

// answer when pinged
app.event("app_mention", async ({ event, client, say }) => {
    let loadingMessage;

    try {
        loadingMessage = await say({
            text: "_writing some wise words_ :loading:"
        });

        const wordAmount = Math.ceil(Math.random() * 5);
        const response = await axios.get(
            `https://random-word-api.herokuapp.com/word?number=${wordAmount}&diff=1`
        );
        let responseText = "";

        for (let i = 0; i < response.data.length; i++) {
            responseText += response.data[i] + " ";
        }

        if (loadingMessage && loadingMessage.ts) {
            await client.chat.delete({
                channel: event.channel,
                ts: loadingMessage.ts
            });
        }

        await say({
            text: responseText.trim()
        });
    } catch (err) {
        console.error(err);

        if (loadingMessage && loadingMessage.ts) {
            await client.chat.delete({
                channel: event.channel,
                ts: loadingMessage.ts
            }).catch(deleteErr => {
                console.error("failed to delete loading message:", deleteErr);
            });
        }

        await say({
            text: "the api down :v:"
        });
    }
});

// weather
app.command("/trulles-weather", async ({ command, ack, respond }) => {
    await ack();

    try {
        const response = await axios.get("https://apiverket.se/v1/weather/kalmar", {
            headers: {
                Authorization: `Bearer ${process.env.APIVERKET_API_KEY}`
            }
        });

        await respond({
            text: `It's currently ${response.data.data.temperature_c} °C in Kalmar.`
        });
    } catch (err) {
        console.error(err);
        await respond({ text: "Failed to fetch a weather." });
    }
});

// join priv channel
app.command("/enter-trulles-basement", async ({ commandm, ack, respond }) => {
    await ack();

    await respond({
        text: "Enter trulles basement:\nhttps://hackclub.enterprise.slack.com/archives/D0ASFBG7R5Y"
    });
});

// latency test
app.command("/trulles-minion-ping", async ({ command, ack, respond }) => {
    const start = Date.now();

    await ack();

    const latency = Date.now() - start;

    await respond({
        text: `Pong!\nLatency: ${latency}ms`
    });
});

// help
app.command("/trulles-minion-help", async ({ command, ack, respond }) => {
    await ack();

    await respond({
        text:
`Available Commands:
/trulles-minion-ping - Check bot latency
/trulles-weather - See Trulles local weather 
/enter-trulles-basement - Get the link to join Trulles priv channel
`
    });
});

(async () => {
    await app.start();
    console.log("bot is running!");
})();