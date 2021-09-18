module.exports = {
    name: 'ccreate',
    description: "Look at me i'm the capitan now",
    async execute(client, message, args){

        const search = await dbHelper.getUser(message.author.id)
        const user = search[0]

        if(user.clan != 0) return message.channel.send("You are already in a clan")

        if(!args[0]) return message.channel.send("Please enter the name");

        const raw_name = args.join(' ')

        const safe_name = raw_name.toLowerCase()

        const clan = await dbHelper.getClanName(safe_name)

        if(clan.length > 0) return message.channel.send("This clan already exists");

        con.query(`INSERT INTO clans (name, safename) VALUES ("${raw_name}", "${safe_name}")`, function(err, result) {
            if(err) throw err;
        })

        con.query(`SELECT id, name FROM clans ORDER BY id DESC LIMIT 1`, function(err, result) {
            if(err) throw err;
            con.query(`UPDATE users SET clan = ${result[0].id + 1} WHERE userid = "${message.author.id}"`, function(err, result){
              if(err) throw err;
          })
        })



        message.channel.send(`Clan ${raw_name} created!`)
    }
}