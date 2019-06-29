const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {
  let channel = message.member.voiceChannel;
  if (channel) {
    channel.join()
      .then(connection => { // Connection is an instance of VoiceConnection
        message.channel.send('I have successfully connected to the channel!');
      })
      .catch();
  } else {
    message.reply('You need to join a voice channel first!');
  }
}

module.exports.help = {
	name: 'join'
}