module.exports = {
    name: 'leaderboard',
    alias: ["lb"],
    description: "rank 1 when",
    async execute(client, message, args){
        var users = await dbHelper.getAllUser();

        const embed = new Discord.MessageEmbed()

        embed.setColor('#2e03ff')
        embed.setTitle('Top 10 Global Leaderboard')

        for(var i = 0; i < 10; i++){
            const required = Math.round(10 * (Math.pow(1.5, users[i].level) - 1));

            const percent = ((users[i].xp / required) * 100)
            
            const user = await client.users.fetch(users[i].userid)

            await embed.addField(`${i + 1}. ${user.username} • Level ${users[i].level}`, `» ${users[i].xp}/${required}xp (${Math.round(percent)}%)`)
        }

        message.channel.send(embed)
    }
}