module.exports = {
    name: 'confess',
    description: "share your darkest secrets",
    async execute(client, message, args){
        await message.delete()

        if(!args[0]) return message.channel.send("Please write a confession.")

        const confession = args.join(" ")

        const embed = new Discord.MessageEmbed()

        embed.setTitle("Anonymous Confession | ID ?")
        embed.setColor('RANDOM')
        embed.setDescription(confession)
        embed.setFooter("If you think the confession is against the ToS please report it with !report (id)")
        embed.setTimestamp()

        return message.channel.send(embed)
    }
}