const Discord = require("discord.js");
const Database = require("../Helpers/Database");

exports.run = async (client, message, args) => {
  let user = message.mentions.users.first() || message.author;
  if (user) {
    const db = new Database("./Servers/" + message.guild.id, "Invites");
    var data = db.get(`invites.${user.id}`) || {
      total: 0,
      fake: 0,
      inviter: null,
      regular: 0,
      bonus: 0,
      leave: 0
    };
    var embed = new Discord.MessageEmbed()
      .setDescription(
        `\`${user.username}\` **Adlı Kişinin 
        Toplam:** \`${(data.total || 0) +
          (data.bonus || 0)}\`, **Düzenli** \`${data.regular ||
          0}\`, **Bonus:** \`${data.bonus ||
          0}\`, **Çıkanlar:** \`${data.leave ||
          0}\`, (**Sahte Olanlar:** \`${data.fake || 0}\`)`
      )
      .setColor("RANDOM");
    message.channel.send(embed);
  } else {
    const db = new Database("./Servers/" + message.guild.id, "Invites");
    var data = db.get(`invites.${message.member.id}`) || {
      total: 0,
      fake: 0,
      inviter: null,
      regular: 0,
      bonus: 0,
      leave: 0
    };
    var embed = new Discord.MessageEmbed()
      .setDescription(
        `**Sizin Toplam:** \`${(data.total || 0) +
          (data.bonus || 0)}\`, **Düzenli** \`${data.regular ||
          0}\`, **Bonus:** \`${data.bonus ||
          0}\`, **Çıkanlar:** \`${data.leave ||
          0}\`, (**Sahte Olanlar:** \`${data.fake || 0}\`)`
      )
      .setColor("RANDOM");
    message.channel.send(embed);
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["invites", "davetler"],
  permLevel: 0
};
exports.help = {
  name: "davetlerim",
  description: "Logo Yaparsınız",
  usage: "m-logo <yazı>"
};
