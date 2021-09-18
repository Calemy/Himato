module.exports = {
    name: 'skip',
    alias: ["s"],
    description: "ew no put the next track",
    async execute(client, message, args){
        const voice = message.member.voice.channel
        if(typeof message.guild.voice != "undefined") connectedvoice = message.guild.voice.connection;

        if(!voice) return message.channel.send("You're not in a voice channel!")
        
        var playing = await dbHelper.isPlaying(message.guild.id, 'request')

        if(playing == null || playing == "false") return message.channel.send("No song is being played right now!")

        var queue = await dbHelper.checkQueue(message.guild.id)

        message.channel.send("Skipped!")

        if(queue.length < 1) return musicHandler.leave(voice)

        musicPlayer.play(message, voice, queue[0])
        dbHelper.sortQueue(message.guild.id)

    }
}