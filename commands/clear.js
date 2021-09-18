module.exports = {
    name: 'clear',
    alias: ["c"],
    description: "fuck that",
    async execute(client, message, args){
        song = await musicHandler.checkQueue(message.guild.id)

        if(!song || song.length < 1) return message.channel.send("No queue found to be cleared.")

        dbHelper.clearQueue(message.guild.id)

        message.channel.send("Cleared queue!")
    }
}