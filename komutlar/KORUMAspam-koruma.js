const Discord = require("discord.js");
const data = require("quick.db");

exports.run = async (client, message, args) => {
  const nn = new Discord.MessageEmbed();
  if (message.author.id !== message.guild.owner.user.id)
    return message.channel.send(
      nn.setDescription(
        " Bu komutu kullanabilmek için **Sunucu Sahibi** olmalısın!"
      )
    );
  if (!args[0]) {
    message.channel.send(
      nn.setDescription(`Yalış Kullanım : !spam-koruma aç/kapat`)
    );
  }
  if ((args[0] === "kapat")) {
    const sistem = await data.fetch(`spam.${message.guild.id}`);
    if (!sistem)
      return message.channel
        .send(nn.setDescription(` Spam Koruma Zaten Kapalı`))
        .then(a => a.delete({ timeout: 10000 }));

    data.delete(`spam.${message.guild.id}`);
    return message.channel
      .send(
        nn
          .setTitle(`İşlem başarılı!`)
          .setColor(0x36393f)
          .setDescription(` Spam Koruma Başarıyla Sıfırlandı`)
      )
      .then(a => a.delete({ timeout: 10000 }));
  }
  if ((args[0] === "aç")) {
    const sistem = await data.fetch(`spam.${message.guild.id}`);
    if (sistem)
      return message.channel
        .send(nn.setDescription(` Spam koruma zaten aktif.`))
        .then(a => a.delete({ timeout: 10000 }));

    data.set(`spam.${message.guild.id}`, "aktif");
    return message.channel
      .send(
        nn
          .setTitle(`İşlem başarılı!`)
          .setColor(0x36393f)
          .setDescription(` Spam koruma başarıyla açıldı.`)
      )
      .then(a => a.delete({ timeout: 10000 }));
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["spam-engel", "spamengel", "spam-koruma", "spamkoruma"],
  permLevel: 0
};

exports.help = {
  name: "spam"
};
