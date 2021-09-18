module.exports = {
    name: 'profile',
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

            userInfo = self ? {
                "username" : message.author.username.replace(`"`, "").replace(".", ""),
                "id" : message.author.id,
                "xp" : user.xp,
                "level" : user.level,
                "messages" : user.messages,
                "clan" : user.clan,
                "lvlup" : lvlup,
                "avatar" : message.author.avatarURL()
            } : {
                "username" : member.user.username.replace(`"`, "").replace(".", ""),
                "id" : member.id,
                "xp" : user.xp,
                "level" : user.level,
                "messages" : user.messages,
                "clan" : user.clan,
                "lvlup" : lvlup,
                "avatar" : `https://cdn.discordapp.com/avatars/${member.id}/${member.user.avatar}.webp`
            }
            
            await imageHelper.rank(message, userInfo)
            
            
    }
}