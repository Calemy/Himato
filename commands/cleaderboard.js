module.exports = {
    name: 'cleaderboard',
    alias: ["clb"],
    description: "rank 1 when",
    async execute(client, message, args){
        var clans = await dbHelper.getAllClans();

        const embed = new Discord.MessageEmbed()
        embed.setColor('#2e03ff')
        embed.setTitle('Top 10 Leaderboard')

        for(var i = 0; i < 10; i++){
            if(!clans[i]) return message.channel.send(embed)
            const required = 100 * (Math.pow(2, clans[i].level) - 1);
            const percent = ((clans[i].xp / required) * 100)

            await embed.addField(`${i + 1}. ${clans[i].name} • Level ${clans[i].level}`, `» ${clans[i].xp}/${required}xp (${Math.round(percent)}%)`)
        }

        message.channel.send(embed)
    }
}