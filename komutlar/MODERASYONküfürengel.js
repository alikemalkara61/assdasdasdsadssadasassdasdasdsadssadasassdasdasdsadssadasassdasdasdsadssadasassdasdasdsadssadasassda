exports.run = (client, message, args) => {
  let db = require("quick.db");
  let Discord = require("discord.js");

  let küfür = db.fetch(`küfür.${message.guild.id}.durum`);
  const member3 = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(` **HATA**  - Bu sunucuda yetkili değilsin.`);
  if (!message.member.permissions.has("MANAGE_MESSAGES"))
    return message.channel.send(member3);
  if ((args[0] === "kapat", "KAPAT", "Kapat")) {
    db.delete(`küfür.${message.guild.id}`);
    message.channel
      .send(
        new Discord.MessageEmbed().setDescription(
          ` **Başarılı ile küfür engel kapandı.**`
        )
      )
      .then(l => {
        l.delete({ timeout: 5000 });
      });
  }
  if ((args[0] === "aç", "Aç", "AÇ")) {
    db.set(`küfür.${message.guild.id}.durum`, true);
    message.channel
      .send(
        new Discord.MessageEmbed().setDescription(
          ` **Başarılı İle Küfür Engel Açıldı.**`
        )
      )
      .then(l => {
        l.delete({ timeout: 5000 });
      });
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["küfür-engel", "Küfür-Engel", "KÜFÜR-ENGEL"],
  permLevel: 0
};

exports.help = {
  name: "küfürengel"
};
