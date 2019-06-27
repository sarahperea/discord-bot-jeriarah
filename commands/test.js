const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {
	message.channel.send("test success");
}

module.exports.help = {
	name: 'test'
}