const Discord = require('discord.js');
const axios = require('axios');

module.exports.run = async(client, message, args) => {
	const text = args.join(' ');
	axios.get(`https://api.meetup.com/find/topics?query=${text}&page=3`, {

	}).then(res => {
		if(res.data.length == 0 ) {
			message.channel.send('No topics found.');
			return;
		}
		for(let r of res.data) {
			if (r) {
				const embed = new Discord.RichEmbed()
					.setColor('#0099ff')
					.setTitle(r.name || '')
					.addField('Description', r.description)
				
				message.channel.send({ embed });
			}
		}
	}).catch(err => {
		console.log(err);
	});		
}

module.exports.help = {
	name: 'topics'
}
