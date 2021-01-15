const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  let logk = message.mentions.channels.first();
  let logkanal = await db.fetch(`log_${message.guild.id}`);

  if (args[0] === "sıfırla" || args[0] === "kapat") {
    if (!logkanal)
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor("RED")
          .setDescription(` Mod-log Kanalı Zaten Ayarlı Değil.`)
      );
    db.delete(`log_${message.guild.id}`);
    message.channel.send(
      new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(` Mod-log Kanalı Başarıyla Sıfırlandı.`)
    );
    return;
  }

  if (!logk)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(` Yanlış Kullanım Doğru Kullanım: !mod-log #kanal`)
    );

  db.set(`log_${message.guild.id}`, logk.id);

  message.channel.send(
    new Discord.MessageEmbed()
      .setColor("GREEN")
      .setDescription(` Mod-log Kanalı Başarıyla ${logk} Olarak Ayarlandı.`)
  );
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["mod-log", "modlog", "log-ayarlama"],
  permLevel: 3,
  kategori: "moderasyon"
};

exports.help = {
  name: "mod-log",
  description: "Mod-Log kanalını belirler.",
  usage: "mod-log <#kanal>"
};
