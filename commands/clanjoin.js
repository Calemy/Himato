module.exports = {
    name: 'cjoin',
    description: "alo is me",
    async execute(client, message, args){

      const search = await dbHelper.getUser(message.author.id)
      const user = search[0]

      if(user.clan != 0) return message.channel.send("You are already in a clan")

        if(!args[0]) return message.channel.send("Please enter the name");

        const raw_name = args.join(' ')

        const safe_name = raw_name.toLowerCase()

        const csearch = await dbHelper.getClanName(safe_name)

        if(csearch.length < 1) return message.channel.send("This clan doesn't exist");

        const clan = csearch[0]

        clan.members++

        con.query(`UPDATE clans SET members = ${clan.members} WHERE id = ${clan.id}`, function(err, result) {
            if(err) throw err;
        })

        con.query(`UPDATE users SET clan = ${clan.id} WHERE userid = ${message.author.id}`, function(err, result) {
            if(err) throw err;
        })

        message.channel.send(`You joined ${clan.name}!`)

    }
}