const Discord = require('discord.js');
const axios = require('axios');
const apiKey = process.env.MEETUP_API_KEY; 

module.exports.run = async(client, message, args) => {
	args.map((text) => {
		let names = [];
		axios.get(`https://api.meetup.com/2/open_events?text=${text}&time=,1w&key=${apiKey}`, {

		}).then(res => {
			let events = []
			for(let r of res.data.results) {
				if (r) {
					let embed = new Discord.RichEmbed()
						.setColor('#0099ff')
						.setTitle(r.name || '')
						.setURL(r.event_url || '')
						.addField('Status', r.status || 'a')
						.addField('Duration', r.duration ? new Date(r.duration * 1000) : 'a')
						.addField('Venue', r.venue && r.venue.name ? r.venue.name : 'a')
					
					events = [...events, embed];				
				}
			}
			message.channel.send(events[0]);
		}).catch(err => {
			console.log(err);
		});		
	})
}

module.exports.help = {
	name: 'test'
}
