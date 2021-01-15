const Discord = require("discord.js"),
  db = require("quick.db");

module.exports.run = async (client, message, args) => {
  if (message.author.id !== message.guild.owner.user.id)
    return message.channel.send(
      new Discord.MessageEmbed().setDescription(
        " Bu komutu kullanabilmek için **Sunucu Sahibi** olmalısın!"
      )
    );
  let kontrol = await db.fetch(`dil_${message.guild.id}`);
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "c?";
  if (kontrol == "agayokaga") {
    let kanal = await db.fetch(`kanalk_${message.guild.id}`);
    if (!kanal) {
      const embed = new Discord.MessageEmbed()
        .setColor(0x36393f)
        .setFooter(client.user.username, client.user.avatarURL())
        .setDescription(` Kanal Koruma Sistemi Zaten Ayarlanmamış!`);
      message.channel.send(embed);
      return;
    }
    db.delete(`kanalk_${message.guild.id}`);
    const embed = new Discord.MessageEmbed()
      .setColor(0x36393f)
      .setFooter(client.user.username, client.user.avatarURL())
      .setDescription(` Kanal Koruma Sistemi Sıfırlandı!`);
    message.channel.send(embed);
    return;
  } else {
    let kanal = await db.fetch(`kanalk_${message.guild.id}`);
    if (!kanal) {
      const embed = new Discord.MessageEmbed()
        .setColor(0x36393f)
        .setFooter(client.user.username, client.user.avatarURL())
        .setDescription(` Kanal Koruma Sistemi Zaten Ayarlanmamış!`);
      message.channel.send(embed);
      return;
    }
    db.delete(`kanalk_${message.guild.id}`);
    const embed = new Discord.MessageEmbed()
      .setColor(0x36393f)
      .setFooter(client.user.username, client.user.avatarURL())
      .setDescription(`Kanal Koruma Sistemi Sıfırlandı!`);
    message.channel.send(embed);
    return;
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["channel-protection-reset"],
  permLevel: 3
};

exports.help = {
  name: "kanal-koruma-sıfırla",
  description: "kanal-koruma-sıfırla",
  usage: "kanal-koruma-sıfırla"
};
