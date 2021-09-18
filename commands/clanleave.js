module.exports = {
    name: 'cleave',
    description: "bai",
    async execute(client, message, args){
      const search = await dbHelper.getUser(message.author.id)
      const user = search[0]

      if(user.clan == 0) return message.channel.send("You are not in a clan yet")

      const csearch = await dbHelper.getClan(user.clan)

      const clan = csearch[0]

      clan.members--

      con.query(`UPDATE clans SET members = ${clan.members} WHERE id = ${clan.id}`, function(err, result) {
        if(err) throw err;
      })

      con.query(`UPDATE users SET clan = 0 WHERE userid = "${message.author.id}"`, function(err, result){
        if(err) throw err;
      })

      message.channel.send(`You left ${clan.name}!`)
    }
}