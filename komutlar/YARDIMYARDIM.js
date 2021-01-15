const Discord = require("discord.js");
const client = new Discord.Client();
const db = require("quick.db");

exports.run = async (client, message, args, member) => {
  let durum = await db.fetch(`üyelikk_${message.author.id}`, "Kurucu");
  let durumgold = await db.fetch(`üyelikk_${message.author.id}`, "üyelik");

  const yardım = new Discord.MessageEmbed()
    .setAuthor(`Sun Bot Yardım Menüsü`, client.user.avatarURL())
    .setColor("0x36393F")
    .setThumbnail(client.user.avatarURL())
    .setDescription(
      `• Hey! <@${message.author.id}> beni kullandığın için teşekkür ederim!\n •  Prefixim: **!**\n • Dilim: **TR** :flag_tr:\n • Üyelik durumu: İnsan `
    )
    .addField(
      " • Kategoriler:",
      `> • [!kullanıcı](https://discord.gg/usg73fH): **Kullanıcı yardım menüsünü gösterir.**\n > • [!moderasyon](https://discord.gg/usg73fH): **Moderasyon yardım menüsünü gösterir.**\n > • [!davetsistemi](https://discord.gg/usg73fH): ** Davet sistemi yardım menüsünü gösterir.**\n > • [!korumasistemi](https://discord.gg/usg73fH): ** Koruma sistemi yardım menüsünü gösterir.**\n > • [!çekilişsistemi](https://discord.gg/usg73fH): ** Çekiliş sistemi yardım menüsünü gösterir.**`
    )
    .addField(
      " • Güncelleme Notları:",
      "**Güncelleme v0.4:** Çekiliş sistemi eklendi!"
    )

    .addField(
      " • Linkler:",
      "• [Davet Et](https://discord.com/oauth2/authorize?client_id=72796254334733179&permissions=8&scope=bot/) • [Destek Sunucusu](https://discord.gg/usg73fH) • [Web Site](https://www.cryptosite.cf/) •"
    )

    .setFooter("SUN BOT", message.author.avatarURL())
    .setTimestamp();
  message.channel.send(yardım);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["y", "help", "h"],
  permLevel: 0
};

exports.help = {
  name: "yardım",
  description: "westra",
  usage: "westra"
};
