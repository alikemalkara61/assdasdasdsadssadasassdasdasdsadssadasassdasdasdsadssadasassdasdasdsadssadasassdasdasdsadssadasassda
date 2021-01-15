const Discord = require(`discord.js`);

exports.run = async (client, message) => {
  let user = message.mentions.users.first() || message.author;
  if (user) {
    const embed = new Discord.MessageEmbed()

      .setDescription(`${message.author.tag} Adlı Kullanıcının Avatarı:`)
      .setImage(user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor("#f9d71c")
      .setFooter("SUN BOT");
    message.channel.send(embed);
  } else {
    const embed = new Discord.MessageEmbed()
      //rengimiz #f9d71c
      .setDescription(`${message.author.tag} Adlı Kullanıcının Avatarı:`)
      .setImage(message.author.avatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor("#f9d71c")
      .setFooter("SUN BOT");
    message.channel.send(embed);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["avatar", "avatarım"],
  permLevel: 0
};

exports.help = {
  name: "pp"
};
