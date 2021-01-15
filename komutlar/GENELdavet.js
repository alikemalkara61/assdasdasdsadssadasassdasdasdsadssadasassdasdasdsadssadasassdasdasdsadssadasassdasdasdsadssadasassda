const Discord = require("discord.js");
const Client = new Discord.Client();
exports.run = (client, message) => {
  const Embed = new Discord.MessageEmbed()
    .setColor(0x36393f)

    .setDescription(
      `Sun Bot Davet Etmek için [buraya](https://discord.com/oauth2/authorize?client_id=793527091722321951&scope=bot&permissions=805314622) tıkla!`
    );
  message.channel.send(Embed);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["Davet", "davet"],
  kategori: "Bot",
  permLevel: 0
};

exports.help = {
  name: "davet",
  description: "Bot ile ilgili bilgi verir.",
  usage: "bilgi"
};
