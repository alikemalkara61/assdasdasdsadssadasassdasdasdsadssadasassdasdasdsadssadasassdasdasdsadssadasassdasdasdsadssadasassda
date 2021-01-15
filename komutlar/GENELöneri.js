const Discord = require("discord.js");
const db = require("quick.db");

exports.run = (client, message, args) => {
  const öneri = args.slice(0).join(" ");
  if (!öneri)
    return message.channel.send(
      new Discord.MessageEmbed().setDescription("Bir öneri belirtmelisin. ")
    );

  const embed = new Discord.MessageEmbed()

    .addField("Belirtilen Öneri:", öneri)
    .addField(
      "Öneri Belirten Kişi:",
      `Adı: **${message.author.tag}** - Etiketi: <@${message.author.id}> - ID: **${message.author.id}**`
    )

    .setFooter(client.user.username, client.user.avatarURL())
    .setThumbnail(message.author.avatarURL({ format: "gif" }));
  message.channel.send(
    new Discord.MessageEmbed().setDescription(`Öneriniz başarıyla iletildi!`)
  );
  client.channels.cache.get("798626692083875841").send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "öneri",
  description: "öneri bildirirsiniz",
  usage: "öneri <öneri>"
};
