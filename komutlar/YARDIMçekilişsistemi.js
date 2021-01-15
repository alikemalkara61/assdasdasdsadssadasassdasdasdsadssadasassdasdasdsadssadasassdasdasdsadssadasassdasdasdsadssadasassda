const Discord = require("discord.js");
const Client = new Discord.Client();
const config = require("../config.json");
let Prefix = config.prefix;

exports.run = (client, message) => {
  const Embed = new Discord.MessageEmbed()
    .setColor(0x36393f)
    .setAuthor(`${client.user.username} | Çekiliş Sistemi Yardım Menüsü`)
    .setDescription(
      `
 **${Prefix}çekiliş** \n-> Çekiliş başlatır.
 **${Prefix}reroll** \n-> Çekilişi yeniden çeker.
 **${Prefix}çekilişbitir** \n-> Çekilişi bitirir.
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
  name: "çekilişsistemi",
  description: "Bot ile ilgili bilgi verir.",
  usage: "bilgi"
};
