const Discord = require('discord.js');
const { prefix, token } = require('./config.json')



const client = new Discord.Client();






client.once('ready', () => {
    console.log('Ready!');
	client.user.setActivity("!help", {type: "PLAYING"});
	
});
client.on("guildMemberAdd", member => {

	var role = member.guild.roles.cache.get('709476421830967498');
	if(!role) return;

	member.roles.add(role);

	var join = member.guild.channels.cache.get('709477737177546865');
	var rules = member.guild.channels.cache.get('709476422158385214');
	const embedJoin = new Discord.MessageEmbed()
	.setColor('GREEN')
	.setDescription(`Welcome ${member} to the server \n do !help for all commands \n and read the ${rules}`)
	.setFooter('CoppyRight® FreeCraft')

	if(!join) return;

	join.send(embedJoin)
})
client.on("guildMemberRemove", member => {
	var leave = member.guild.channels.cache.get('709476422158385216');
	const embedLeave = new Discord.MessageEmbed()
	.setColor(`#ff0000`)
	.setDescription(`Bye Bye ${member}\n 😢👋`)
	.setFooter('CoppyRight® FreeCraft')

	leave.send(embedLeave)
})
client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();
	if(command === 'help'){
		const help = new Discord.MessageEmbed()
		.setColor('RANDOM')
		.setTitle("Help")
		.setDescription("Commands: \n \n !help - shows this list \n !ip - shows the ip and the version \n !website - shows the website link \n !members - shows how many members there in the server \n !kick (player) (reason) - kicks a user out of the discord server \n !ban (player) (reason) - bans a user out of the discord server \n .suggest (suggestion) - give a suggestion for the server \n")
		.setFooter('CoppyRight® FreeCraft')
		message.channel.send(help)
	}
	


	//if (command === 'ping') {
	//	message.channel.send('Pong.');
	//} else if (command === 'beep') {
	//	message.channel.send('Boop.');
    //}
	if(command === 'website'){
		const web = new Discord.MessageEmbed()
		.setColor('RANDOM')
            .setFooter( 'CoppyRight® FreeCraft')
			.setDescription("**Website:** https://merijnvdgraaf.wixsite.com/freecraft")
			message.channel.send(web)
	}
    if (command === 'ip') {
    const ip = new Discord.MessageEmbed()
        .setColor('RANDOM')
            .setFooter( 'CoppyRight® FreeCraft')
		.setDescription("**IP:** Soon!" + "\n" + "**Version**: 1.15.2")
	message.channel.send(ip);
	}
    if(message.content == "!ping"){ // Check if message is "!ping"
			message.channel.send("Pinging ...") // Placeholder for pinging ... 
			.then((msg) => { // Resolve promise
				msg.edit("Ping: " + (Date.now() - msg.createdTimestamp)) // Edits message with current timestamp minus timestamp of message
			});
        }
		if(command === 'members'){
			const membersEmbed = new Discord.MessageEmbed()
			.setColor('#00FFE0 ')
			.setAuthor('Members', '')
			.setDescription('Server: ' + `${message.guild.name}` + "\nMembers: " + `${message.guild.memberCount}`)
			.setTimestamp()
            .setFooter( 'CoppyRight� FreeCraft')
            
		
			message.channel.send(membersEmbed);
		}
	if(command === 'kick'){
		if(!message.member.hasPermission("BAN_MEMBERS")) {
			return message.channel.send(`**${message.author.username}**, You do not have enough permission to use this command`)
		  }
		  
		if(!message.guild.me.hasPermission("BAN_MEMBERS")) {
			return message.channel.send(`**${message.author.username}**, I do not have enough permission to use this command`)
		  }
		  let target = message.mentions.members.first();

		  if(!target) {
			return message.channel.send(`**${message.author.username}**, Please mention the person who you want to kick`)
		  }
		  if(target.id === message.author.id) {
			return message.channel.send(`**${message.author.username}**, You can not kick yourself`)
		   }
		   if(!args[1]) {
			return message.channel.send(`**${message.author.username}**, Please Give Reason to ban`)
		  }
		  let kickEmbed = new Discord.MessageEmbed()
		.setTitle("Action: Kick")
		.setDescription(`Kick ${target} (${target.id})
		Reason: ${args[2]}
		`)
		.setColor("#00FFE0 ")
		.setFooter(`Kicked by ${message.author.username}`);

			message.channel.send(kickEmbed)
			target.kick(args[1]);
		
	
			}
			if(command === 'ban'){
				if(!message.member.hasPermission("BAN_MEMBERS")) {
					return message.channel.send(`**${message.author.username}**, You do not have enough permission to use this command`)
				  }
				  
				if(!message.guild.me.hasPermission("BAN_MEMBERS")) {
					return message.channel.send(`**${message.author.username}**, I do not have enough permission to use this command`)
				  }
				  let target = message.mentions.members.first();
		
				  if(!target) {
					return message.channel.send(`**${message.author.username}**, Please mention the person who you want to kick`)
				  }
				  if(target.id === message.author.id) {
					return message.channel.send(`**${message.author.username}**, You can not kick yourself`)
				   }
				   if(!args[1]) {
					return message.channel.send(`**${message.author.username}**, Please Give Reason to ban`)
				  }
				  let kickEmbed = new Discord.MessageEmbed()
				.setTitle("Action: ban")
				.setDescription(`Banned ${target} (${target.id})
				Reason: ${args[2]}
				`)
				.setColor("#00FFE0 ")
				.setFooter(`Banned by ${message.author.username}`);
		
					message.channel.send(kickEmbed)
					target.ban(args[1]);
				}
				
			
		});
	


client.login(process.env.token)
