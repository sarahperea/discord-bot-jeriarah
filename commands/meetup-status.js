const Discord = require('discord.js');
const axios = require('axios');

module.exports.run = async(client, message, args) => {
	const text = args.join(' ');
	axios.get(`https://api.meetup.com/status`, {

	}).then(res => {
			if (res) {
				message.channel.send(res.data.status);
			}
	}).catch(err => {
		console.log(err);
	});		
}

module.exports.help = {
	name: 'status'
}
