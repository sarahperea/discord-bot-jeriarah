const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const axios = require('axios');
const apiKey = process.env.YOUTUBE_DATA_API_KEY;

module.exports.run = async(client, message, args) => {
  let channel = message.member.voiceChannel;
  if (args.length === 0) {
    console.log("Sorry, this command requires a youtube video url to play. :P")
  } else {
	if (channel) {
    	channel.join()
      .then(connection => {
        axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=surfing&key=${apiKey}`, {
        }).then(res => {
          console.log(res.data)
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
