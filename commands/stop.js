module.exports = {
    name: 'stop',
    description: "musik go brrrr",
    async execute(client, message, args){
        const voice = message.member.voice.channel
        if(typeof message.guild.voice != "undefined") connectedvoice = message.guild.voice.connection;

        if(!voice) return message.channel.send("You're not in a voice channel!")

        musicHandler.leave(voice)
        dbHelper.nowPlaying(voice.guild.id, 'delete')
        dbHelper.isLooping(message.guild.id, 'off')
        dbHelper.clearQueue(message.guild.id)

    }
}