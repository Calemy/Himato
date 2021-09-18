module.exports = {
    name: 'queue',
    alias: ["q"],
    description: "sounds interesting what's that?",
    async execute(client, message, args){
        var playing = await dbHelper.isPlaying(message.guild.id, 'request')

        if(playing == null || playing == "false") return message.channel.send("No song is being played right now!")

        var queue = await dbHelper.checkQueue(message.guild.id)

        if(typeof queue == undefined) return message.channel.send("There is currently no queue available")

        var embed = new Discord.MessageEmbed()
        embed.setColor('RANDOM')
        embed.setTitle("Next 5 songs")

        for(var i = 0; i < queue.length; i++){
                if(i < 5){
                    var id = queue[i].length != 7 && queue[i].length != 11 ? musicPlayer.youtube_parser(queue[i]) : queue[i]
                    var video = await musicHandler.fetch(id)
    
                    embed.addField(`${i+1}. ${video.title}`, `Uploaded by ${video.channel}`)
                }
        }

        embed.setTimestamp()

        embed.setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL()}`)

        message.channel.send(embed)

    }
}