module.exports = {
    name: 'download',
    description: "musik go brrrr",
    execute(client, message, args){
        if(!args[0] || !args[0].includes('youtube') && !args[0].includes('https://youtu.be/')) return message.channel.send("Please provide a youtube link")
        
        const readline = require('readline');
        const ytdl = require('ytdl-core');
        const ffmpeg = require('fluent-ffmpeg');

        let fid = args[0];

        function linkSecure(url){
            var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
            var match = url.match(regExp);
            return (match&&match[7].length==11)? match[7] : false;
        }

        let id = linkSecure(fid)

        if(!id) return message.channel.send('This link is invalid')

        function fits(x) {
            if (Number.isInteger(x / 3)) {
                return true;
            }
                return false;
            }

        let stream = ytdl(fid, {
        quality: 'highestaudio',
        });

        let start = Date.now();
        let num = 0;
        const dl = ffmpeg(stream)

        dl.audioBitrate(128)

        message.channel.send('Starting to process').then((message => {
            save = message
        }))

        dl.on('progress', p => {
            num++
            if(fits(num)){
                save.edit(`${(p.targetSize / 1000).toFixed(2)}MB downloaded`);
            }
            size = (p.targetSize / 1000).toFixed(2)
        })
        
        dl.on('end', () => {
           const text = `Download completed - Time elapsed: ${((Date.now() - start) / 1000).toFixed(2)}s for ${size}MB`
           message.channel.send(text, { 
               files: [{
                attachment: `/root/Discord/Himato/utils/temp/${id}.mp3`,
                name: `${id}.mp3`
                }]
            })
            save.delete()
        });

        dl.on('error', function(err, stdout, stderr) {
            save.edit('Video could not be processed');
          });

        dl.save(`/root/Discord/Himato/utils/temp/${id}.mp3`)

    }
}