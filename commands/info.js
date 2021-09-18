module.exports = {
    name: 'info',
    description: "thank you all <3",
    async execute(client, message, args){
            const embed = new Discord.MessageEmbed()

            embed.setTitle("Info for Himato")
            embed.setColor("RANDOM")
            embed.setAuthor(message.author.tag, message.author.avatarURL())
            embed.setDescription("I will credit here people who helped with the bot. <3")
            embed.setThumbnail(client.user.avatarURL())

            embed.addField("Creator", "Lemres#0001")
            embed.addField("Language", "JavaScript used in NodeJS")
            embed.addField("Credits", "Now are coming people who helped on this bot")
            embed.addField("Harumyne", "Created the design for the profile card")
            embed.addField("Neko-Chan & Senpai", "For beta testing commands")
            embed.addField("maia", "for being the first server using Himato")

            message.channel.send(embed)
    }
}