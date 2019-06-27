const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const prefix = '$';

// Create client and login
const client =  new  Discord.Client ();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {

  if (message.content.substring(0, 1) === `${prefix}`) {
  	let args = message.content.substring(1).split(' ');
    let cmd = args[0];
       
    args = args.splice(1);
    switch(cmd) {
    	case 'ping':
    		message.reply('pong!');
    	break;	
    }
  }

});

client.login(process.env.DISCORD_BOT_TOKEN);
