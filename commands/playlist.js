module.exports = {
    name: 'playlist',
    alias: ["pl", "list"],
    description: "musik go brrrr",
    async execute(client, message, args){

        switch (args [0]){

            case 'save':
                var start = Date.now() / 1000
                var queue = await dbHelper.isPlaying(message.guild.id, 'request')

                if(queue == null || queue == "false") return message.channel.send("There is no song currently in queue to create a playlist!")

                var songs = await dbHelper.checkQueue(message.guild.id)

                await dbHelper.addPlaylist(message.author.id, songs)

                message.channel.send(`Successfully saves ${songs.length} Songs to your playlist! - Took ${((Date.now() / 1000) - start).toFixed(2)} seconds`)
                break;
            case 'load':
                var start = Date.now() / 1000
                var songs = await dbHelper.checkPlaylist(message.author.id)
        
                if(!songs || songs.length < 1) return message.channel.send("You currently have no playlist. (Perhaps deleted by a bot rework?)")
        
                for(var i = 0; i < songs.length; i++){
                    await musicHandler.search(message, songs[i], 'input')
                }
        
                message.channel.send(`Successfully loaded ${songs.length} Songs from your playlist! - Took ${((Date.now() / 1000) - start).toFixed(2)} seconds`)
                break;
            case 'clear':
                await dbHelper.clearPlaylist(message.author.id)
                message.channel.send("Cleared Playlist :)")
                break;
            default:
                message.channel.send("Try !playlist <save/load/clear>")
                break;
        }
    }
}