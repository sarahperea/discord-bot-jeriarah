const Discord = require('discord.js');
const axios = require('axios');

module.exports.run = async(client, message, args) => {
	const text = args.join(' ');
	axios.get(`https://api.meetup.com/find/topics?query=${text}&page=5`, {

	}).then(res => {
		if(res.data.length == 0 ) {
			message.channel.send('No topics found :\'(');
			return;
		}
		for(let i = 0; i < res.data.length; i++ ) {
			let r = res.data[i]; 
			if (r) {
				const embed = new Discord.RichEmbed()
					.setColor('#0099ff')
					.setTitle(`${i + 1}. ${r.name}` || '')
					.addField('Description', r.description)
				
				message.channel.send({ embed });
			}
		}
	}).catch(err => {
		console.log(err);
	});		
}

module.exports.help = {
	name: 'topic'
}
