require('dotenv').config();
const schedule = require('node-schedule');
const Discord = require('discord.js');
const moment = require('moment-timezone');
const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES']});
const token = process.env.DISCORD_TOKEN;
const channelId = process.env.CHANNEL_ID;
client.login(token);

client.on('ready', () => {
  schedule.scheduleJob('* * * * *', async () => {
    try {
      const channel = await client.channels.fetch(channelId);
      const allMessages = await channel.messages.fetch({limit: 100});
      const toDelete = allMessages.filter(msg => msg.createdTimestamp < moment().subtract(1,'hour').valueOf() && msg.id !== '901164710022508584');

      console.log(`Deleted messages: ${Object.keys(toDelete).length}`);
      channel.bulkDelete(toDelete);
    } catch (err) {
      console.log(err.message);
    }
  });
});
