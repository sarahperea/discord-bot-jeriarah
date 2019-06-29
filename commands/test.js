const Discord = require('discord.js');
const axios = require('axios');
const apiKey = process.env.MEETUP_API_KEY; 

module.exports.run = async(client, message, args) => {
	args.map((category) => {
		let names = [];
		axios.get(`https://api.meetup.com/2/open_events?topic=${topic}&time=,1w&key=${apiKey}`, {}).then(res => {
			for(let r of res.data.results) {
				if(r.venue) {
					names = [...names, r.venue.name];
				}
			}
			let events = names.join().substring(0, 2000);
			message.channel.send(events);
		}).catch(err => {
			console.log(err);
		});		
	})
}

module.exports.help = {
	name: 'test'
}
