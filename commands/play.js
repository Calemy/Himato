module.exports = {
    name: 'play',
    alias: ["p"],
    description: "musik go brrrr",
    async execute(client, message, args){
        const voice = message.member.voice.channel
        if(typeof message.guild.voice != "undefined") connectedvoice = message.guild.voice.connection;

        if(!voice) return message.channel.send("You're not in a voice channel!")

        if(!args[0]) {
            song = await musicHandler.checkQueue(message.guild.id)

            if(!song || song.length < 1) return message.channel.send("No song found to be played.")

            musicPlayer.play(message, voice, song)
            return dbHelper.sortQueue(voice.guild.id)

        }

        if(!args[0].includes('https://www.youtube.com/') && !args[0].includes('https://youtu.be/') && !args[0].includes(`https://open.spotify.com/`)) {
            message.channel.send('Searching for: ' + args.join(" "))
            var searcher = await musicHandler.search(message, voice, args.join(" "), 'search')
            if(!searcher) return "Video could not be found"

        } else if(args[0].includes(`https://open.spotify.com/`)){
                if(args[0].includes(`/track/`)){
                    var track = args[0].substr(31, 22)
                    await musicHandler.searchSpotify(message, voice, track)
                } else if(args[0].includes(`/playlist/`)){
                    var track = args[0].substr(34, 22)
                    await musicHandler.searchSpotifyPlaylist(message, voice, track)
                }
        } else {
            args[0].includes('list=') ? await musicHandler.searchPlaylist(message, voice, args[0]) : await musicHandler.search(message, voice, args[0], 'request')
        }

    }
}