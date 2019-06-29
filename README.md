# Jeriarah Discord Bot

A very simple discord bot that connects to Meetup and Youtube API.

It lets you search the meetup events that you want with its venue, link, status, description etc. And not only that.. You can also play music using this bot with its advanced music features like play and search command... All within your discord server.

If you are a person who always have the discord open and doesn't want to hassle yourself searching for meetup events on the internet, and at the same time wants to chill out playing some music of your choice, this bot is definitely for you. 

--- 

### Commands
- **join**: Joins discord bot to channel

	`$join`

- **status**: Check the meetup api service status

	`$status`

- **topic**: Find meetup topics by anything related in your input

	`$topic <meetup-topic>`

- **event**: Find meetup events by anything related in your input

	`$event <meetup-event>`

- **play**: Play music that searches on youtube

	`$play <youtube-url>`
		
- **search**: Return top 5 youtube video results containing the entered keywords

	`$search <keyword1> <keyword2> <...keywords>`

### Test
*You need to provide required environment variables below: *

- DISCORD_BOT_JERIARAH_TOKEN
- MEETUP_API_KEY
- YOUTUBE_DATA_API_KEY
