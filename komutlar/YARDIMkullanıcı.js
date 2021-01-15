const Discord = require("discord.js");
const Client = new Discord.Client();
const config = require("../config.json");
let Prefix = config.prefix;

exports.run = (client, message) => {
  const Embed = new Discord.MessageEmbed()
    .setColor(0x36393f)
    .setAuthor(`${client.user.username} | Kullanıcı Yardım Menüsü`)
    .setDescription(
      `
 **${Prefix}davet** \n-> Botu davet edersiniz.
 **${Prefix}shardbilgi** \n-> Botun shard bilgilerini gösterir.
 **${Prefix}pp** \n-> Etiketlediğiniz kişinin avatarını gösterir.
 **${Prefix}randompp** \n-> Botun ekli olduğu sunuculardaki her hangi birinin avatarını atar.
 **${Prefix}öneri** \n-> Bota öneri belirtirsiniz.
 **${Prefix}istatistik** \n-> Botun istatistiğini gösterir.
 **${Prefix}sonmesaj** \n-> Yazdığınız son mesajı gösterir.
`
    )
    .setFooter(`SUN BOT`)
    .setTimestamp();

  message.channel.send(Embed);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  kategori: "Bot",
  permLevel: 0
};

exports.help = {
  name: "kullanıcı",
  description: "Bot ile ilgili bilgi verir.",
  usage: "bilgi"
};
