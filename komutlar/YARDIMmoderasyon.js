const Discord = require("discord.js");
const Client = new Discord.Client();
const config = require("../config.json");
let Prefix = config.prefix;


exports.run = (client, message) => {
  const Embed = new Discord.MessageEmbed()
    .setColor(0x36393f)
    .setAuthor(`${client.user.username} | Moderasyon Yardım Menüsü`)
    .setDescription(
      `
 **${Prefix}mod-log #kanal** \n-> Mod-log ayarlar.
**${Prefix}mod-log sıfırla** \n-> Mod-log sıfırlar.
**${Prefix}bansay** \n-> Sunucuda kaç banlanan üye olduğunu gösterir.
**${Prefix}ban @kullanıcı** \n-> Etiketlediğiniz kullanıcıyı banlar.
**${Prefix}küfürengel** \n-> Küfür engel açar/kapatır.
 **${Prefix}küfürlog #kanal** \n-> Küfür-log ayarlar.
 **${Prefix}reklamengel** \n-> Reklam engel açar/kapatır.
 **${Prefix}reklamlog #kanal** \n-> Reklam-log ayarlar.
 **${Prefix}sa-as aç** \n-> SA-AS sistemini açar.
 **${Prefix}sa-as kapat** \n-> SA-AS sistemini kapatır.
 **${Prefix}sil** \n-> Yazdığınız miktar kadar mesaj siler.
 **${Prefix}say** \n-> Sunucu bilgilerini gösterir.
 **${Prefix}oylama** \n-> Oylama yapar.
 **${Prefix}otorol-ayarla @rol #kanal** \n-> Otorol ayarlar.
 **${Prefix}otorol-sıfırla** \n-> Otorol sıfırlar.
**${Prefix}otorol-mesaj-ayarla** \n-> Otorol mesajı ayarlar.
 **${Prefix}otorol-mesaj-sıfırla** \n-> Otorol mesajı sıfırlar.
`
    )
    .setFooter(`SUN BOT`)
    .setTimestamp();

  message.channel.send(Embed);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["mod"],
  kategori: "Bot",
  permLevel: 0
};

exports.help = {
  name: "moderasyon",
  description: "Bot ile ilgili bilgi verir.",
  usage: "bilgi"
};
