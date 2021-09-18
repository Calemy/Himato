require('./utils/function')()

const myIntents = new Discord.Intents(Discord.Intents.ALL)
const client = new Discord.Client({ ws: { intents: myIntents } });

const locale = moment.locale('en');
const uptime = moment().format('LLL');

const version = config.version

const prefix = config.prefix

//lemres.dbConnector();

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection()

recursive("commands/", function(err, files){
    files.forEach(commands => {
        var filesName = "./" + commands
        const command = require(filesName)
        client.commands.set(command.name, command);

        if (command.alias) {
            command.alias.forEach(alias => {
                client.aliases.set(alias, command);
            });
        }

    });
});

client.on('ready', async () => {
    lemres.startLog(client, uptime, version)
    lemres.rotate(client)
    lemres.image(client)
    dbHelper.connect()
    dbHelper.connectMysql()
});

client.on("guildMemberAdd", member => {
    if(member.guild.id == "848579230191190047"){
        lemres.memberJoinRole(member)
        lemres.allMembersCheck(member)
    }

    lemres.checkHonda(member)
});

client.on('message', async message => {

    if (message.content.length > 1 && !message.content.startsWith(config.prefix) && !message.author.bot) userHelper.level(message)

    if (!message.content.startsWith(prefix) || message.author.bot) return; //no command or triggered by bot

    const args = message.content.slice(prefix.length).split(/ +/); //arguments
    const command = args.shift().toLowerCase(); //define command

    let cmdToExecute = client.commands.get(command) || client.aliases.get(command); //command to execute

    if(cmdToExecute){
        cmdToExecute.execute(client, message, args); //if command found, execute
    }

})


client.login(config.token)