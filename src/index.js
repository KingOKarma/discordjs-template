const Discord = require('discord.js'); //gets hte discord.js library
const bot = new Discord.Client(); //creats a const for the discord client
const config = require('./config.json'); //allows this file to reach your config file



let token = config.token //creates a var for your token


bot.on('ready', async () => { //runs when event "ready" is on (so when the bot turns on)

    const setCollections = require('./utils/collections'); //grabs the collection
    setCollections(bot);
    const commandHandler = require('./handlers/command'); //grabs the handler
    commandHandler(bot);


    console.log('Im Online now bois');

    console.log(`Bot has started, with ${bot.users.cache.size} users, in ${bot.channels.cache.size} channels of ${bot.guilds.cache.size} guilds.`);

    bot.user.setActivity(`Hi im a template bot! You can change my status here!`); //sets status

});


bot.on('message', message => { //runs when event "message" is sent (so when the bot sees msgs)

    if (!message.channel.type == "dm") return; //checks if channel is a dm
    if (message.author.bot) return; //checks if author is a bot

    const prefix = config.prefix //creates a var for the prefix

    if (!message.content.toLowerCase().startsWith(prefix)) return; //makes sure the bot only responds to cmds with its prefix
    const args = message.content.toLowerCase().slice(prefix.length).trim().split(/ +/g); //creats the args var
    const commandname = args.shift().toLowerCase(); //cmd name

    const command = bot.commands.get(commandname) || bot.commands.get(bot.aliases.get(commandname));
    if (!command) return;
    try {
        command.run(bot, message, args, prefix); //runs the cmd from the folders provided
    } catch (error) {
        console.error(error);
    }

})

bot.login(token).catch(console.error) //logs in

