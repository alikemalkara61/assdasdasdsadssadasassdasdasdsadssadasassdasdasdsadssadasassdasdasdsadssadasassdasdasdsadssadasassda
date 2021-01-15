const Discord = require("discord.js");
exports.run = async (client, message, args) => {
  let kullanici = message.mentions.users.first();
  if (!kullanici)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setCOLOR("RED")
        .setDescription("Banlayacağın kişiyi etiketlemelisin!")
    );

  const embed = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setTitle(`${kullanici.tag} adlı kullanıcı banlandı.`)
    .setImage(
      `https://media1.tenor.com/images/d856e0e0055af0d726ed9e472a3e9737/tenor.gif?itemid=8540509`
    );
  message.channel.send(embed);
  message.guild.members.ban(kullanici);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ban"],
  permLevel: 2
};

exports.help = {
  name: "ban",
  description: "ban",
  usage: "ban"
};
