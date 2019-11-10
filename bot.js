// Copyright 2018 SyntheticBIT aka 8qBIT
// Mc-market thread: https://www.mc-market.org/resources/6986/
// Leaking will result in suspension.


// Just login stuff for bot you should not mess with this!

const Discord = require(`discord.js`);
const bot = new Discord.Client();
const fs = require(`fs`);
const config = JSON.parse(fs.readFileSync(`./Config/config.json`, `utf8`));
var ping = require(`ping`);
var repeat = require(`repeat`);

var version = "1.5";

var client = new Discord.Client();
// List of jokes add them or edit as you wish.

bot.login(config.token);

bot.on(`ready`, function(start) {
  // You can change that if you want but.. why?
  console.log(config.botname + ` , Online and ready.`);
  bot.user.setGame(config.gameplaying)
})

// Send msg to member-log channel when member joins & leaves

bot.on(`guildMemberAdd`, member => {

  // add role to user
  if (config.onjoinroleenabled) {
    let role = member.guild.roles.find("name", config.onjoinrole);
    member.addRole(role).catch(console.error);
  }

  if(!(config.enablejoin)) {
	  return;
  }

  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(`name`, config.memberlog);
  // Do nothing if the channel wasn`t found on this server
  if (!channel) {
    console.log(`CHANNEL NOT FOUND`);
  return;
  }
  // Send the message, mentioning the member

  const embed = new Discord.RichEmbed()
	.setFooter(config.botname + ` ` + version + ` - Developed by SyntheticBIT`)

	.setColor(0x00AE86)

	.addField(`Welcome to ` + config.servername, `${member} ` + config.welcomemsg, true)

	channel.send({embed});

});

bot.on(`guildMemberRemove`, member => {
  if(!(config.enableleave)) {
	  return;
  }

  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(`name`, config.memberlog);
  // Do nothing if the channel wasn`t found on this server
  if (!channel) {
    console.log(`CHANNEL NOT FOUND`);
  return;
  }
  // Send the message, mentioning the member
  const embed = new Discord.RichEmbed()
	.setFooter(config.botname + ` ` + version + ` - Developed by SyntheticBIT`)

	.setColor(0x00AE86)

	.addField(config.leavemsg, `${member}`, true)

	channel.send({embed});
});

// Now this is where the commands start.

bot.on(`message`, function(msg) {

	// anti-swear / advertisment

  for (var i = 0; i < config.bannedwords.length; i++) {
  if (msg.content.includes(config.bannedwords[i])) {
		msg.channel.send(`**HEY!** ` + msg.author + ` Go do that somewhere else!`)
		msg.delete(1);
    break;
  }
  }

	// Prevent bots from using the command and prevent usage of other prefixes then one defined.

  if(msg.author.bot || !msg.content.startsWith(config.prefix)) {
    return;
  }

	// Define command variable

  var command = msg.content.split(` `)[0].slice(config.prefix.length).toLowerCase()
  var args = msg.content.split(` `).slice(1);
  var msgs = 0;
  msgs++
  let suffix = args.join(` `)

	// Main help command

  if(command === config.command) {
	const embed = new Discord.RichEmbed()

	.setColor(0x00AE86)

	.addField(":gear: "+config.botname+" Help :gear:", "Here are all of the command from "+config.botname)
	.addField(':gear: User Commands :gear:', config.prefix+"__vote__ - Get the list of voting sites.\n"+config.prefix+"__joke__ - Read a funny joke.\n"+config.prefix+"__coinflip__ - Flip a coin, Heads or tails.\n"+config.prefix+"__8ball__ - Mighty 8Ball\n"+config.prefix+"__website__ - Get link to the website\n__userinfo__ - Get info about a user or bot.\n"+config.prefix+"__ip__ - Display minecraft server ip")
	.addField(':gear: Admin Commands :gear:', config.prefix+"__purge <max 80>__ - Delete ammount of messages\n"+config.prefix+"__announce <message>___ - Announce a message\n"+config.prefix+"__tempmute <@user>__ - Mute user for an ammount of time\n"+config.prefix+"__warn <@user>__ - Warn user for action\n"+config.prefix+"__kick <@user>__ - Kick user from server\n"+config.prefix+"__ban <@user>__ - Ban user from server")

	.setFooter(config.botname + ` ` + version + ` - Developed by SyntheticBIT`)

	msg.channel.send({embed});


  }


	// Vote link command

  if (config.enablevote) {
	  var votel = "**>>** ";
	 if(command === "vote") {

	const embed = new Discord.RichEmbed()
	.setFooter(config.botname + ` ` + version + ` - Developed by SyntheticBIT`)

	.setColor(0x00AE86)

	for(var i = 0; i < config.votelinks.length; i++) {
		embed.addField("["+i+"]", config.votelinks[i], true)
	}

	msg.channel.send({embed});

	 }

  }

	// Normal commands

	// generate random number and select joke based on that number
  if (command === "joke") {
    var i = Math.floor(Math.random() * config.jokes.length);
	var joke = config.jokes[i];

	const embed = new Discord.RichEmbed()
	.setFooter(config.botname + ` ` + version + ` - Developed by SyntheticBIT`)

	.setColor(0x00AE86)

	.addField("LOL, You will like this one! :joy:", joke, true)

	msg.channel.send({embed});

  }

	// generate random number and based on that determine heads or tails
  if(command === "coinflip") {
	var msgs = "null";
    var result = Math.floor((Math.random() * 2) + 1);
    if (result == 1) {
      var msgs = "The coin landed on heads";
    } else if (result == 2) {
	  var msgs = "The coin landed on tails";
    }

	const embed = new Discord.RichEmbed()
	.setFooter(config.botname + ` ` + version + ` - Developed by SyntheticBIT`)

	.setColor(0x00AE86)

	.addField("That was a close one! :open_mouth:", msgs, true)

	msg.channel.send({embed});

  }

	// generate random number and based on that generate random response
  if(command === "8ball") {
	var i = Math.floor((Math.random() * config.eightballsayings.length) + 0);

	const embed = new Discord.RichEmbed()
	.setFooter(config.botname + ` ` + version + ` - Developed by SyntheticBIT`)

	.setColor(0x00AE86)

	.addField("8Ball has spoken! :8ball:", config.eightballsayings[i], true)

	msg.channel.send({embed});
  }

  if(command === "website") {

	const embed = new Discord.RichEmbed()
	.setFooter(config.botname + ` ` + version + ` - Developed by SyntheticBIT`)

	.setColor(0x00AE86)

	.addField("Our website link: :spider_web:", config.websitelink, true)

	msg.channel.send({embed});
  }

  if (command === "ip") {
	  const embed = new Discord.RichEmbed()
		.setFooter(config.botname + ` ` + version + ` - Developed by SyntheticBIT`)

		.setColor(0x00AE86)

		.addField("The server's IP is:", config.ip)

	  msg.channel.send({embed});
  }

  // admin commands

  // chat purge

  if(command === "purge") {
	let admin = msg.member.roles.find("name", config.adminrole);
	if (!(admin)) {
		  return msg.channel.send("You are not an admin! :no_entry: ")
	  }

	function deleteMessages(amount) {
		return new Promise((resolve) => {
			if (amount > 80) throw new Error('You can\'t delete more than 80 Messages at a time.');
			setTimeout(() => resolve(msg.channel.bulkDelete(suffix)), 5);
		});
	}

	deleteMessages(5).then(value => {
		// send success msg if there is no errors
		const embed = new Discord.RichEmbed()
		.setFooter(config.botname + ` ` + version + ` - Developed by SyntheticBIT`)

		.setColor(0x00AE86)

		.addField("Removed " + suffix + " messages in channel. :wastebasket: ", "By: " + msg.author)

		msg.channel.send({embed});

    if (config.logadmincmd) {
      const log =  msg.guild.channels.find(`name`, config.adminlogchannel);
	   log.send(`Messages removed by: ` + msg.author.username);
    }

	}).catch(error => {
		// deleteMessages encountered an error send a msg
		const embed = new Discord.RichEmbed()
		.setFooter(config.botname + ` ` + version + ` - Developed by SyntheticBIT`)

		.setColor(0x00AE86)

		.addField("ERROR:", `Sorry ${msg.author} I couldn't purge chat because of : ${error} OR: You used number higher then 80`)
		.addBlankField(true)
		.addField("Or maybe not!", `Did you use number higher then 80 :joy: ?`)

		msg.channel.send({embed});
	});


  }


  // send announcment to specified channel
  if (command === "announce") {
	  let admin = msg.member.roles.find("name", config.adminrole);
	  if (!(admin)) {
		  return msg.channel.send("You are not an admin! :no_entry: ")
	  }
	  if (!(suffix)) {
		  return msg.channel.send("Please specify what do you want to announce!")
	  }
	  const announcment =  msg.guild.channels.find(`name`, config.annoucmentschannel);
	  announcment.send(`@everyone **Announcment!** \n` + suffix);
  }

  // mute command

  if (command === "tempmute") {
	  let admin = msg.member.roles.find("name", config.adminrole);
	  if (!(admin)) {
		  return msg.channel.send("You are not an admin! :no_entry: ")
	  }
	  if (!(suffix)) {
		  return msg.channel.send("Please specify user with @user!")
	  }
		let mutedrole = msg.guild.roles.find("name", config.mutedrole);
		let member = msg.mentions.members.first();
		member.addRole(mutedrole).catch(console.error); // Give muted role to user
		const embed = new Discord.RichEmbed()
		.setFooter(config.botname + ` ` + version + ` - Developed by SyntheticBIT`)

		.setColor(0x00AE86)

		.addField("User muted for 30 Min", "User: " + member.toString() + " By: " + msg.author)

		msg.channel.send({embed});
		setTimeout(() => { member.removeRole(mutedrole).catch(console.error); }, 1800000); // Set the role back to online after 1 min.

    if (config.logadmincmd) {
      const log =  msg.guild.channels.find(`name`, config.adminlogchannel);
	   log.send(member.toString() + ` Has been tempmuted by: ` + msg.author.username);
    }
  }

  if(command === "userinfo") {

	 let member = msg.mentions.members.first();
	 const embed = new Discord.RichEmbed()

	.setColor(0x00AE86)

	.addField(member.displayName + "'s Info", "Here's What I could find in Discord's Database.")

	.addField("Server Name", member.guild.name, true)

	.addField("ID", member.id, true)
	.addField("Status", member.user.presence.status, true)
	.addField("Is bot", member.user.bot, true)
	.addField("Ping", member.guild.client.ping, true)
	.addField("Tag", member.user.tag, true)
	msg.channel.send({embed});

  }

  if(command === "kick") {
    let admin = msg.member.roles.find("name", config.adminrole);
	if (!(admin)) {
	return msg.channel.send("You are not an admin! :no_entry: ")
	}

    let member = msg.mentions.members.first() || msg.guild.members.get(args[0]);
    if(!member)
      return msg.reply("Please mention a valid member of this server");
    if(!member.kickable)
      return msg.reply("Why would you kick someone with higher rank then you! :no_entry:");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";

    member.kick(reason)
      .catch(error => msg.reply(`Sorry ${msg.author} I couldn't kick because of : ${error}`));

	const embed = new Discord.RichEmbed()
	.setFooter(config.botname + ` ` + version + ` - Developed by SyntheticBIT`)

	.setColor(0x00AE86)

	.addField("User kicked for: " + `${reason}`, "User: " + member.toString() + " By: " + msg.author)

	msg.channel.send({embed});

  if (config.logadmincmd) {
    const log =  msg.guild.channels.find(`name`, config.adminlogchannel);
   log.send(member.toString() + ` Has been kicked by: ` + msg.author.username);
  }

  }

  if(command === "ban") {
    let admin = msg.member.roles.find("name", config.adminrole);
	if (!(admin)) {
	return msg.channel.send("You are not an admin! :no_entry: ")
	}

    let member = msg.mentions.members.first();
    if(!member)
      return msg.reply("Please mention a valid member of this server");
    if(!member.bannable)
      return msg.reply("Why would you ban someone with higher rank then you! :no_entry:");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";

    member.ban(reason)
      .catch(error => msg.channel.send(`Sorry ${msg.author} I couldn't ban because of : ${error}`));
	const embed = new Discord.RichEmbed()
	.setFooter(config.botname + ` ` + version + ` - Developed by SyntheticBIT`)

	.setColor(0x00AE86)

	.addField("User banned for: " + `${reason}`, "User: " + member.toString() + " By: " + msg.author)

	msg.channel.send({embed});

  if (config.logadmincmd) {
    const log =  msg.guild.channels.find(`name`, config.adminlogchannel);
   log.send(member.toString() + ` Has been banned by: ` + msg.author.username);
  }

  }

  if(command === "warn") {
    let admin = msg.member.roles.find("name", config.adminrole);
	if (!(admin)) {
	return msg.channel.send("You are not an admin! :no_entry: ")
	}

    let member = msg.mentions.members.first();
    if(!member)
      return msg.reply("Please mention a valid member of this server");
    if(!member.bannable)
      return msg.reply("Why would you warn someone with higher rank then you! :no_entry:");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";

	const embed = new Discord.RichEmbed()
	.setFooter(config.botname + ` ` + version + ` - Developed by SyntheticBIT`)

	.setColor(0x00AE86)

	.addField("You have been warned: " + `${reason}`, "User: " + member.toString() + " By: " + msg.author)

	msg.channel.send({embed});

  if (config.logadmincmd) {
    const log =  msg.guild.channels.find(`name`, config.adminlogchannel);
   log.send(member.toString() + ` Has been warned by: ` + msg.author.username);
  }

  }

})
