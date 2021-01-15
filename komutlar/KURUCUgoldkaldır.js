const db = require("quick.db");
const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client();
exports.run = async (client, message, args) => {
  const ayarlar61 = require("../config.json");
  if (!ayarlar61.sahip.includes(message.author.id)) {
    const embed = new Discord.MessageEmbed()
      .setDescription(` Bu komutu sadece **Sahibim** kullanabilir!`)
      .setColor("RED");
    message.channel.send({ embed });
    return;
  }

  let user = client.users.cache.get(args.slice(0).join(" "));
  let nesne = args[0];
  if (!nesne) return message.channel.send("id belirt moruq");

  db.delete(`üyelikk_${nesne}`, "üyelik");

  message.channel.send(
    new Discord.MessageEmbed().setDescription(
      `<@${nesne}> adlı kişinin gold üyeliğini başarıyla kaldırdım.`
    )
  );

  if (
    client.users.cache
      .get("" + nesne + "")
      .send(
        new Discord.Messageembed().setDescription(
          ` \`Gold üyeliğiniz kaldırıldı.\` `
        )
      )
  ) {
  } else return;
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["goldkaldır", "gold-kaldır"],
  permLevel: 0
};
exports.help = {
  name: "goldüyekaldır",
  description: "Gold üye ekler",
  usage: "gold-üye-ekle"
};
