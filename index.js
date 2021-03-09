const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json')
const { Webhook } = require('discord-webhook-node');

const channel_1_hook = new Webhook(config.channel_1_url);
const channel_2_hook = new Webhook(config.channel_2_url);

const channel_1_id = config.channel_1_id;
const channel_2_id = config.channel_2_id;

client.on('ready', () => {
  console.log("Chat link is online")
})

client.on("message", async (message) => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    // Usually triggers if user only sends an attachment with no text
    if(message.content.length == 0) {
      message.channel.send("There was an error sending your message.\nKeep in mind that attachments can't be bridged at this point.")
      return;
    }

    // Channel 1 -> Channel 2
    if(message.channel.id == channel_1_id) {
      channel_2_hook.setUsername(message.author.tag);
      channel_2_hook.setAvatar(message.author.displayAvatarURL());
      channel_2_hook.send(message.content);
    }
    
    // Channel 2 -> Channel 1
    if (message.channel.id == channel_2_id) {
      channel_1_hook.setUsername(message.author.tag);
      channel_1_hook.setAvatar(message.author.displayAvatarURL());
      channel_1_hook.send(message.content);
    }
})



client.login(config.token)