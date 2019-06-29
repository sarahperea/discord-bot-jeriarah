const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {
	message.channel.send(embed);							
}

module.exports.help = {
	name: 'help'
}
