module.exports = {
    name: 'rank',
    description: "LE-LE-LE-LE-LEVEL UP",
    async execute(client, message, args){

        if(message.mentions.members.size == 0) {
            search = await dbHelper.getUser(message.author.id)
            self = true
        } else {
            member = message.mentions.members.first()
            search = await dbHelper.getUser(member.id)
            self = false
        }

        if(search.length < 1) return message.channel.send("This user is not in the database.")

        const user = search[0]

        const lvlup = Math.round(10 * (Math.pow(1.5, user.level) - 1));

        if(self){
            const username = message.author.username.replace(`"`, "").replace(".", "")

            if(user.clan == 0) return lemres.rankCard(message, message.author.id, username, message.author.avatarURL(), user.xp, lvlup, user.level)

            const csearch = await dbHelper.getUser(clan)
            const clan = csearch[0]

            return lemres.rankCard(message, message.author.id, username, message.author.avatarURL(), user.xp, lvlup, user.level, clan.name)
        } 
            const username = member.user.username.replace(`"`, "").replace(".", "")

            if(user.clan == 0) return lemres.rankCard(message, member.id, username, `https://cdn.discordapp.com/avatars/${member.id}/${member.user.avatar}.webp`, user.xp, lvlup, user.level)
            const csearch = await dbHelper.getUser(clan)
            const clan = csearch[0]
            return lemres.rankCard(message, member.id, username, `https://cdn.discordapp.com/avatars/${member.id}/${member.user.avatar}.webp`, user.xp, lvlup, user.level, clan.name)
    }
}