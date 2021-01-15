const Discord = require("discord.js"),
  db = require("quick.db");

module.exports.run = async (client, message, args) => {
  let kontrol = (await db.fetch(`dil_${message.guild.id}`)) || "tr";
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "!";
  if (kontrol == "tr") {
    let kanal = message.mentions.channels.first();
    if (!kanal) {
      const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setFooter(
          client.user.username,
          client.user.avatarURL({ dynamic: true })
        )
        .setDescription(`Lütfen Bir Log Kanalı Etiketleyiniz!`);
      message.channel.send(embed);
      return;
    }
    db.set(`bank_${message.guild.id}`, kanal.id);
    const embed = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setFooter(client.user.username, client.user.avatarURL({ dynamic: true }))
      .setDescription(` Ban Koruma Log Kanalı; ${kanal} Olarak Ayarlandı!`);
    message.channel.send(embed);
    return;
  } else {
    let kanal = message.mentions.channels.first();
    if (!kanal) {
      const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setFooter(
          client.user.username,
          client.user.avatarURL({ dynamic: true })
        )
        .setDescription(`Lütfen Bir log Kanalı Etiketleyiniz!`);
      message.channel.send(embed);
      return;
    }
    db.set(`bank_${message.guild.id}`, kanal.id);
    const embed = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setFooter(client.user.username, client.user.avatarURL({ dynamic: true }))
      .setDescription(` Ban Koruma Log Kanalı ${kanal} Olarak Ayarlandı!`);
    message.channel.send(embed);
    return;
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["ban-koruma"],
  permLevel: 3
};

exports.help = {
  name: "ban-koruma",
  description: "ban-koruma",
  usage: "ban-koruma"
};
