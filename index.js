const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json')
const channel = []
var wf;
client.on('ready', () => {
  console.log("I am online!")
})
client.on("message", async (message) => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    channel[0] = ""
    wf = false
    if(message.channel.id === config.Channel2){
      channel[0] = (client.channels.cache.get(config.Channel1))
    }else{
      channel[0] = (client.channels.cache.get(config.Channel2))
    }
    const hooks = await channel[0].fetchWebhooks();
    hooks.forEach(element => {
      wf = true
    });
    if (wf === false) return message.channel.send("A webhook wasn't found on the other server therefor a connection can't be made");
    const webhook = hooks.first();
        await webhook.send(message.content, {
        username: `${message.author.username}#${message.author.discriminator}`,
        avatarURL: message.author.displayAvatarURL()
      }).catch((err) => {
        message.channel.send("There was an error sending your message.\nKeep in mind that attachments can't be bridged at this point.")
    })
    })



client.login(config.token)