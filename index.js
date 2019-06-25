const Discord = require('discord.js');
// ytdl provides an API to get a readable stream for a YouTube video
const ytdl = require('ytdl-core');
const prefix = '$';
let voiceChannelConnection = false;

// Create client and login
const client =  new  Discord.Client ();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {

  if (!message.guild) return;

  if (message.content.substring(0, 1) === `${prefix}`) {
  	let args = message.content.substring(1).split(' ');
    let cmd = args[0];
       
    args = args.splice(1); // arguments array after the command
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

client.login(process.env.DISCORD_BOT_TOKEN);
