module.exports = {
    name: 'help',
    description: "what do you even do",
    async execute(client, message, args){
            const embed = new Discord.MessageEmbed()

            embed.setTitle("Commands for Himato")
            embed.setColor("RANDOM")
            embed.setAuthor(message.author.tag, message.author.avatarURL())
            embed.setDescription("For more infos type ```!help <type>```")
            embed.setThumbnail(client.user.avatarURL())
            
            switch(args[0]){
                case "music":
                    embed.addField("play", "plays music in channel.")
                    embed.addField("queue", "showes queued up music.")
                    embed.addField("np", "lets you see what is currently being played")
                    embed.addField("skip", "don't like the current song? just skip it")
                    embed.addField("loop", "looping the current played song")
                    embed.addField("playlist", "save songs and queue them later! (Beta : Temporary)")
                    embed.addField("clear", "clear the entire queue.")
                    break;
                
                case "xp":
                    embed.addField("rank", "shows your current level and rank (old design)")
                    embed.addField("profile", "shows your profile (new design)")
                    embed.addField("leaderboard", "shows top 10 user on Himato")
                    break;
                
                case "clan":
                    embed.addField("ccreate", "create your own clan")
                    embed.addField("cjoin", "join a clan")
                    embed.addField("cleave", "leave a clan")
                    embed.addField("cleaderboard", "shows top 10 clans on Himato")
                    break;

                case "utils":
                    embed.addField("info", "Get info for this bot")
                    embed.addField("download", "download mp3 file from a youtube video")
                    break;

                case "wip":
                    embed.addField("translate", "translate multiple languages to english")
                    embed.addField("convert", "convert youtube playlists to spotify")
                    break;

                default:
                    embed.addField("music", "commands for music")
                    embed.addField("xp", "commands for the level system")
                    embed.addField("clan", "commands for the clan level system")
                    embed.addField("utils", "useful tools that you can use for free")
                    embed.addField("wip", "look at commands that are being worked on")
                    break;
            }

            embed.setTimestamp()

            message.channel.send(embed)
    }
}



