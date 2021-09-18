module.exports = {
    name: 'stats',
    description: "thank you all <3",
    async execute(client, message, args){
            const embed = new Discord.MessageEmbed()

            const database = await dbHelper.getAllUser()
            const clans = await dbHelper.getAllClans()

            embed.setTitle("About Himato")
            embed.setColor("RANDOM")
            embed.setAuthor(message.author.tag, message.author.avatarURL())
            embed.setDescription("Here are some stats about Himato!")
            embed.setThumbnail(client.user.avatarURL())

            embed.addField("User", client.guilds.cache.reduce((a, g) => a + g.memberCount, 0))
            embed.addField("Server", client.guilds.cache.size)
            embed.addField("User in Database", database.length)
            embed.addField("Clans", clans.length)
            embed.addField("Version", config.version)
            embed.addField("Invite", "[https://lemres.de/himato](https://lemres.de/himato)")
            embed.setFooter("If you want to help consider inviting Himato!")
            embed.setTimestamp()

            message.channel.send(embed)
    }
}



