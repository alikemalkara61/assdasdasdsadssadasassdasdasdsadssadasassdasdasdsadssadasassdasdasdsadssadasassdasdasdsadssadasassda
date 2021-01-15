const Discord = require("discord.js"),
  db = require("quick.db");

module.exports.run = async (client, message, args) => {
  if (message.author.id !== message.guild.owner.user.id)
    return message.reply(
      " Bu komutu kullanabilmek için **Sunucu Sahibi** olmalısın!"
    );
  let kontrol = await db.fetch(`dil_${message.guild.id}`);
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "!";
  if (kontrol == "agayokaga") {
    let kanal = message.mentions.channels.first();
    if (!kanal) {
      const embed = new Discord.MessageEmbed()
        .setColor(0x36393f)
        .setFooter(client.user.username, client.user.avatarURL())
        .setDescription(` Lütfen bir log kanalı etiketleyiniz!`);
      message.channel.send(embed);
      return;
    }
    db.set(`kanalk_${message.guild.id}`, kanal.id);
    const embed = new Discord.MessageEmbed()
      .setColor(0x36393f)
      .setFooter(client.user.username, client.user.avatarURL())
      .setDescription(` Kanal Koruma Log Kanalı : ${kanal} Olarak Ayarlandı!`);
    message.channel.send(embed);
    return;
  } else {
    let kanal = message.mentions.channels.first();
    if (!kanal) {
      const embed = new Discord.MessageEmbed()
        .setColor(0x36393f)
        .setFooter(client.user.username, client.user.avatarURL())
        .setDescription(` Lütfen Bir Log Kanalı Etiketleyiniz!`);
      message.channel.send(embed);
      return;
    }
    db.set(`kanalk_${message.guild.id}`, kanal.id);
    const embed = new Discord.MessageEmbed()
      .setColor(0x36393f)
      .setFooter(client.user.username, client.user.avatarURL())
      .setDescription(` Kanal Koruma Log Kanalı : ${kanal} Olarak Ayarlandı!`);
    message.channel.send(embed);
    return;
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["channel-protection"],
  permLevel: 3
};

exports.help = {
  name: "kanal-koruma",
  description: "kanal-koruma",
  usage: "kanal-koruma"
};
