const Discord = require('discord.js');
// ytdl provides an API to get a readable stream for a YouTube video
const ytdl = require('ytdl-core');
const prefix = '$';
const fs = require('fs');
let voiceChannelConnection = false;

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
    else console.log('Sorry, no command found.')
    switch(cmd) {
    	case 'join':
	    if (message.member.voiceChannel) {
	      message.member.voiceChannel.join()
	        .then(connection => { // Connection is an instance of VoiceConnection
	          message.reply('I have successfully connected to the channel!');
            voiceChannelConnection = connection;
	        })
	        .catch(console.log());
	    } else {
	      message.reply('You need to join a voice channel first!');
	    }
    	break;
      case 'play':
      if (args.length === 0) {
        console.log("Sorry, this command requires a youtube video url to play. :P")
      } else {
        if (voiceChannelConnection) {
          const streamOptions = { seek: 0, volume: 1 };
          const stream = ytdl(args[0], { filter : 'audioonly' });
          const dispatcher = voiceChannelConnection.playStream(stream, streamOptions);
        }
      }
      break;
    	case 'ping':
    		message.reply('pong!');
    	break;	
    }
  }

});

client.login(process.env.DISCORD_BOT_SAMGYUPSAR_TOKEN);
