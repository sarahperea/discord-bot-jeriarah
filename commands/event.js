const Discord = require('discord.js');
const axios = require('axios');
const apiKey = process.env.MEETUP_API_KEY; 

function getMonth(month) {
	let monthNames = [
		'Jan', 'Feb', 'Mar',
		'Apr', 'May', 'June', 'July',
		'Aug', 'Sep', 'Oct',
		'Nov', 'Dec'
	];
	return monthNames[month];
}
function getDateFormat(date) {
	let day = '0' + date.getDate();
	let month = date.getMonth();
	return `${day.slice(-2)} ${getMonth(month)} ${date.getFullYear()}`;
}
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
				.setColor('#0099ff');

				if (r.name)      embed.setTitle(`${i}. ${r.name}`)
				if (r.event_url) embed.setURL(r.event_url)
				if (r.status)    embed.addField('Status', r.status)	
				if (r.time)  embed.addField('Start', getDateFormat(new Date(r.time)))
				if (r.venue) 	 embed.addField(`${r.venue.name || ''}, ${r.venue.address_1 || ''} ${r.venue.address_2 || ''} ${r.venue.address_3 || ''} ${r.venue.city || ''}`)
				
				message.channel.send(embed);							
			}
		}
	}).catch(err => {
		console.log(err);
	});		
}

module.exports.help = {
	name: 'event'
}
