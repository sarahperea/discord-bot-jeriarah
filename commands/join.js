const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {
    if (message.member.voiceChannel) {
      message.member.voiceChannel.join()
        .then(connection => { // Connection is an instance of VoiceConnection
          message.reply('I have successfully connected to the channel!');
          return true;
        })
        .catch(() => false);
    } else {
      message.reply('You need to join a voice channel first!');
      return true;
    }
}

module.exports.help = {
	name: 'join'
}