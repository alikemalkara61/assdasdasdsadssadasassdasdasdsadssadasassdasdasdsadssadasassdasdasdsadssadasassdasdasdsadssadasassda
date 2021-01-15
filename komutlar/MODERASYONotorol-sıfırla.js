const Discord = require("discord.js");
const db = require("quick.db");
exports.run = (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(
      new Discord.MessageEmbed().setDescription(
        ` **Bu komutu kullanabilmek için** "\`Yönetici\`" **yetkisine sahip olmalısın.**`
      )
    );
  const rol = db.fetch(`otoRL_${message.guild.id}`);
  if (!rol)
    return message.reply(
      new Discord.MessageEmbed().setDescription(` Otorol Sistemi Zaten Kapalı.`)
    );

  message.channel.send(
    new Discord.MessageEmbed().setDescription(
      ` Otorol Sistemi Başarıyla Sıfırlandı.`
    )
  );

  db.delete(`otoRL_${message.guild.id}`);
  db.delete(`otoRK_${message.guild.id}`);
  db.delete(`otoRM_${message.guild.id}`);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  permLevel: 0,
  aliases: ["otorol-sıfırla"]
};

exports.help = {
  name: "otorol-kapat",
  description: "Türkiyenin Saatini Gösterir",
  usage: "gç"
};
