const Discord = require("discord.js");
const Client = new Discord.Client();
const config = require("../config.json");
let Prefix = config.prefix;

exports.run = (client, message) => {
  const Embed = new Discord.MessageEmbed()
    .setColor(0x36393f)
    .setAuthor(`${client.user.username} | Koruma Sistemi Yardım Menüsü`)
    .setDescription(
      `
 **${Prefix}ban-koruma #kanal** \n-> Ban koruma sistemini açar.
 **${Prefix}ban-koruma-sıfırla** \n-> Ban koruma sistemini sıfırlar.
 **${Prefix}kanal-koruma #kanal** \n-> Kanal koruma sistemini açar.
 **${Prefix}kanal-koruma-sıfırla** \n-> Kanal koruma sistemini sıfırlar.
 **${Prefix}rol-koruma #kanal** \n-> Rol koruma sistemini açar.
 **${Prefix}rol-koruma-sıfırla** \n-> Rol koruma sistemini sıfırlar.
 **${Prefix}spam-koruma** \n-> Spam koruma sistemini açar.
 **${Prefix}spam-koruma-kapat** \n-> Spam koruma sistemini kapatır.`
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
  name: "korumasistemi",
  description: "Bot ile ilgili bilgi verir.",
  usage: "bilgi"
};
