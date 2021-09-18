module.exports = {
    name: 'hug',
    description: "<3",
    async execute(client, message, args){
            if(message.mentions.users.size < 1) return message.channel.send("Who do you want to hug?")

            const member = message.mentions.users.first()

            con.query(`SELECT * FROM hugs`, function(err, result){
                    if(err) throw err;

                    const random = Math.floor(Math.random() * result.length)

                    const embed = new Discord.MessageEmbed()

                    embed.setTitle(`${message.author.username} hugs ${member.username}`)
                    embed.setColor("RANDOM")
                    embed.setImage(result[random].url)
        
                    message.channel.send(embed)
            })
    }
}