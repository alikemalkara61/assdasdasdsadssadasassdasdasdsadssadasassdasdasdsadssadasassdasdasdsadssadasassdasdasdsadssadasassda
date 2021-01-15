const Discord = require("discord.js");
const Client = new Discord.Client();
const config = require("../config.json");
let Prefix = config.prefix;

exports.run = (client, message) => {
  const Embed = new Discord.MessageEmbed()
    .setColor(0x36393f)
    .setAuthor(`${client.user.username} | Davet Sistemi Yardım Menüsü`)
    .setDescription(
      `
 **!rütbe-ekle @rol davet** \n-> Rütbe ekler.
 **!rütbeler** \n-> Rütbeleri gösterir 1'den 10'a kadar.
 **!rütbe-sıfırla** \n-> Rütbeyi sıfırlar.
 **!davetleri-sıfırla** \n-> Davetleri sıfırlar.
 **!top-davetler** \n-> Lider tablosunu gösterir.
 **!davetlerim** \n-> Davetlerinizi gösterir.
 **!bonus-ekle** \n-> Bonus ekler.
 **!davet-kanal #kanal** \n-> Davet kanalını ayarlar.
 **!davet-kanal-sıfırla** \n-> Davet kanalını sıfırlar.`
    )
    .setFooter(`SUN BOT`)
    .setTimestamp();

  message.channel.send(Embed);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["davet-sistemi"],
  kategori: "Bot",
  permLevel: 0
};

exports.help = {
  name: "davetsistemi",
  description: "Bot ile ilgili bilgi verir.",
  usage: "bilgi"
};
