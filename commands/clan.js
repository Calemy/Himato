module.exports = {
    name: 'clan',
    description: "uwu",
    async execute(client, message, args){
        var search = await dbHelper.getUser(message.author.id)
        var user = search[0]

        var isClan = user.clan != 0 ? true : false;

        if(!args[0] && !isClan) return message.channel.send("Please enter the name");

        const raw_name = args.join(' ')

        const csearch = !args[0] ? await dbHelper.getClan(user.clan) : await dbHelper.getClanName(raw_name.toLowerCase())

        if(csearch.length < 1) return message.channel.send("This clan doesn't exist")

        const clan = csearch[0]

        const required = 100 * (Math.pow(2, clan.level) - 1);
        const percent = ((clan.xp / required) * 100)

        const embed = new Discord.MessageEmbed()

        embed.setTitle('Information for ' + clan.name)
        embed.setColor('CYAN')

        embed.addField('» Level ' + clan.level, `» ${clan.xp}/${required}xp (${Math.round(percent)}%)`)
        embed.addField(`» ${clan.messages} Messages`, `» from ${clan.members} Members`)
        embed.setTimestamp()

        return message.channel.send(embed)

    }
}