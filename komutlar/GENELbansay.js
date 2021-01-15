const Discord = require("discord.js");

exports.run = (client, message, args) => {
  let bansay = message.guild;
  bansay
    .fetchBans()
    .then(bansaysana =>
      message.channel.send(
        new Discord.MessageEmbed()
          .setCOLOR("#f9d71c")
          .setDescription(
            `Sunucunuzda ${bansaysana.size} banlanmış üye bulunmaktadır.`
          )
      )
    )
    .catch(console.error);
};

exports.conf = {
  enabled: true,
  aliases: ["bansay"],
  permLevel: 0
};

exports.help = {
  name: "bansay",
  description: "Sunucudan banlanan kişilerin sayısını gösterir",
  usage: "bansay"
};
