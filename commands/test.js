const Discord = require('discord.js');
const axios = require('axios');
const apiKey = process.env.MEETUP_API_KEY; 

module.exports.run = async(client, message, args) => {
	let texts = args.join(' ')
	let names = [];
	axios.get(`https://api.meetup.com/2/open_events?text=${texts}&and_text=true&&time=,1w&key=${apiKey}&page=5`, {
	}).then(res => {
		if (res.data.results.length)
			message.channel.send(`Meetups happening within the next week related to ${texts.replace(/\s/g, ', ')}:`)
		
		for (let i = 1; i <= 5 && i <= res.data.results.length; i++) {
			let r = res.data.results[i];			
			if (r) {
				let embed = new Discord.RichEmbed()
					.setColor('#0099ff')
				if (r.name)      embed.setTitle(`${i}. ${r.name}`)
				if (r.event_url) embed.setURL(r.event_url)
				if (r.status)    embed.addField('Status', r.status)	
				if (r.duration)  embed.addField('Duration', new Date(r.duration*1000))
				if (r.venue) 	 embed.addField(`${r.venue.name || ''}, ${r.venue.address_1 || ''} ${r.venue.address_2 || ''} ${r.venue.address_3 || ''} ${r.venue.city || ''} ${r.venue.state || ''}`)
				
				message.channel.send(embed);							
			}
		}
	}).catch(err => {
		console.log(err);
	});		
}

module.exports.help = {
	name: 'text'
}
