const Discord = require('discord.js');
// ytdl provides an API to get a readable stream for a YouTube video
const ytdl = require('ytdl-core');
const prefix = '$';
const fs = require('fs');

// Create client and login
const client =  new  Discord.Client ();

client.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  if (err) console.log(err)
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if (jsfile.length <= 0) {
    console.log("No command found.");
    return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded and working!`);
    client.commands.set(props.help.name, props);
  })
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {

  if (!message.guild) return;

  if (message.content.substring(0, 1) === `${prefix}`) {
  	let args = message.content.substring(1).split(' ');
    let cmd = args[0];       
    args = args.splice(1); // arguments array after the command
    let cmdFile = client.commands.get(cmd);

    if (cmdFile) cmdFile.run(client, message, args);
    else console.log('Sorry, no command found.');
  }

});

client.login(process.env.DISCORD_BOT_JERIARAH_TOKEN);
