module.exports = {
    name: 'loop',
    description: "such a banger omg",
    async execute(client, message, args){
        const voice = message.member.voice.channel
        if(typeof message.guild.voice != "undefined") connectedvoice = message.guild.voice.connection;

        if(!voice) return message.channel.send("You're not in a voice channel!")

        var playing = await dbHelper.isPlaying(message.guild.id, 'request')

        if(playing == null || playing == "false") return message.channel.send("There currently is no song playing")

        var loop = await musicHandler.checkLoop(message.guild.id)

        if(loop) dbHelper.isLooping(message.guild.id, 'off'), message.channel.send('Turned off Looping!')
        else dbHelper.isLooping(message.guild.id, 'on'), message.channel.send('Turned on Looping!')
    }
}