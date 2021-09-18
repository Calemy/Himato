module.exports = {
    name: 'np',
    description: "sounds interesting what's that?",
    async execute(client, message, args){
        var playing = await dbHelper.isPlaying(message.guild.id, 'request')

        if(playing == null || playing == "false") return message.channel.send("No song is being played right now!")

        var np = await dbHelper.nowPlaying(message.guild.id, null, "get")

        var id = np.length != 7 && np.length != 11 ? musicPlayer.youtube_parser(np) : np

        var video = await musicHandler.fetch(id)

        var embed = new Discord.MessageEmbed()

        embed.setColor('RANDOM')
        embed.setTitle(video.title)
        embed.setThumbnail(video.image)
        embed.setAuthor("Now Playing")
        embed.setTimestamp()
        embed.addField('Channel', video.channel)
        embed.setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL()}`)

        message.channel.send(embed)


    }
}