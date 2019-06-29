const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const axios = require('axios');
const apiKey = process.env.YOUTUBE_DATA_API_KEY;

module.exports.run = async(client, message, args) => {
  let queries = args.join(',')
  let channel = message.member.voiceChannel;
  if (args.length === 0) {
    console.log("Sorry, this command requires a youtube video url to play. :P")
  } else {
	if (channel) {
    	channel.join()
      .then(connection => {
        axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${queries}&maxResults=5&key=${apiKey}`, {
        }).then(res => {
          if (res.data) {
            for (let i=0; i<res.data.items.length; i++) {
              let r = res.data.items[i] 
              if (r) {
                let embed = new Discord.RichEmbed()
                  .setColor('#0099ff')
                  .setTitle(`${i+1}. ${r.snippet.title}`)
                  .setDescription(`${r.snippet.description.substring(0,99)}...`)
                  .setURL(`https://www.youtube.com/watch?v=${r.id.videoId}`)

                message.channel.send(embed)                
              } 
            }
          }
        }).catch((err) => {
          console.log(err)
        })
      })
      .catch();
    } else {
      message.reply('You need to join a voice channel first!');
    }
  }
}

module.exports.help = {
	name: 'search'
}
