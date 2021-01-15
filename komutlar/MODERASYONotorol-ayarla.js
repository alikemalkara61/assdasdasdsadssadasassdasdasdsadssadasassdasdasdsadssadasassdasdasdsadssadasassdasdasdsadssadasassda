const Discord = require("discord.js");
const db = require("quick.db");
exports.run = async (client, message, args) => {
  const config = require("../config.json");
  let prefix = (await db.fetch(`prefix.${message.guild.id}`)) || config.prefix;
  let rol = message.mentions.roles.first();
  let kanal = message.mentions.channels.first();
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(
      new Discord.MessageEmbed().setDescription(
        ` **Bu Komutu Kullanabilmek İçin** "\`Yönetici\`" **Yetkisine Sahip Olmalısın.**`
      )
    );

  if (!rol)
    return message.channel.send(
      new Discord.MessageEmbed().setDescription(
        ` Bir Rol Etiketlemelisin.\nÖrnek Kullanım: ${prefix}otorol-ayarla @rol #kanal`
      )
    );

  if (!kanal)
    return message.channel.send(
      new Discord.MessageEmbed().setDescription(
        ` Bir Kanal Etiketlemelisin.\nÖrnek Kullanım: ${prefix}otorol-ayarla @rol #kanal`
      )
    );

  message.channel.send(
    new Discord.MessageEmbed().setDescription(
      ` Otorol Başarıyla Aktif Edildi. Otorol Rolü **${rol}** Olarak Ayarlandı. Otorol Kanalı **${kanal}** Olarak Ayarlandı.`
    )
  );

  db.set(`otoRL_${message.guild.id}`, rol.id);
  db.set(`otoRK_${message.guild.id}`, kanal.id);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  permLevel: 0,
  aliases: ["otorol-ayarla"]
};

exports.help = {
  name: "otorol-ayarla",
  description: "Türkiyenin Saatini Gösterir",
  usage: "gç"
};
