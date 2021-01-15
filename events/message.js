const Discord = require("discord.js");
const ayarlar = require("../config.json");
const db = require("quick.db");
module.exports = message => {
  let client = message.client;
  if (message.author.bot) return;
  if (!message.member) return;
  if (!message.guild) return;
  if (!message.content.startsWith(ayarlar.prefix)) return;
  let command = message.content.split(" ")[0].slice(ayarlar.prefix.length);
  let params = message.content.split(" ").slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    let karaliste = db.fetch(`karalist_${message.author.id}`, "aktif");
    let karalistesebep = db.fetch(`sebep_${message.author.id}`);
    if (karaliste == "aktif") {
      let karaliste = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setTitle("KOMUTLARI KULLANAMAZSINIZ!")
        .setDescription(
          `Üzgünüm Ancak Komutları Kullanamazsınız! Kurucularımız tarafından **${karalistesebep}** Sebebiyle Komutları Kullanmanız Yasaklandı!.`
        )
        .setFooter(`SUN BOTDAN BANLANDINIZ`)

        .setThumbnail(client.user.avatarURL({ dynamic: true }));

      const embed = new Discord.MessageEmbed()
        .setColor("#f9d71c")
        .setTimestamp()
        .setFooter(`SUN BOT`)
        .setDescription(
          "**" +
            message.author.tag +
            "** Adlı Kullanıcı Karalistede Olup **" +
            command +
            "** Adlı Komutu: **" +
            message.guild.name +
            "** Sunucusunda Kullanmayı Denedi."
        );
      client.channels.cache.get("796059751901429760").send(embed);
      return message.channel.send(karaliste);
    }
    const embed = new Discord.MessageEmbed()
      .setColor("#f9d71c")
      .setTimestamp()
      .setFooter(`SUN BOT`)
      .setDescription(
        "**" +
          message.author.tag +
          "** Adlı Kullanıcı **" +
          command +
          "** Sdlı Komutu: **" +
          message.guild.name +
          "** Sunucusunda Kullandı."
      );

    client.channels.cache.get("796059700352909322").send(embed);

    if (cmd.conf.enabled === false) {
      if (
        !ayarlar.sahip.includes(message.author.id) &&
        !ayarlar.sahip.includes(message.author.id)
      ) {
        const embed = new Discord.MessageEmbed()
          .setDescription(
            ` **${cmd.help.name}** İsimli Komut Şuanda Geçici Olarak Kullanıma Kapalıdır!`
          )
          .setColor("RED");
        message.channel.send({ embed });
        return;
      }
    }
    //#f9d71c rengimiz bu
    if (cmd.conf.permLevel === 1) {
      if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        const embed = new Discord.MessageEmbed()
          .setDescription(
            ` Bu komutu kullanabilmek için **Mesajları Yönet** iznine sahip olmalısın!`
          )
          .setColor("RED");
        message.channel.send({ embed });
        return;
      }
    }
    if (cmd.conf.permLevel === 2) {
      if (!message.member.hasPermission("KICK_MEMBERS")) {
        const embed = new Discord.MessageEmbed()
          .setDescription(
            ` Bu komutu kullanabilmek için **Üyeleri At** iznine sahip olmalısın!`
          )
          .setColor("RED");
        message.channel.send({ embed });
        return;
      }
    }
    if (cmd.conf.permLevel === 3) {
      if (!message.member.hasPermission("BAN_MEMBERS")) {
        const embed = new Discord.MessageEmbed()
          .setDescription(
            ` Bu komutu kullanabilmek için **Üyeleri Yasakla** iznine sahip olmalısın!`
          )
          .setColor("RED");
        message.channel.send({ embed });
        return;
      }
    }

    if (cmd.conf.permLevel === 4) {
      if (!message.member.hasPermission("ADMINISTRATOR")) {
        const embed = new Discord.MessageEmbed()
          .setDescription(
            ` Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`
          )
          .setColor("RED");
        message.channel.send({ embed });
        return;
      }
    }
    if (cmd.conf.permLevel === 5) {
      if (!ayarlar.sahip.includes(message.author.id)) {
        const embed = new Discord.MessageEmbed()
          .setDescription(` Bu komutu sadece **Sahibim** kullanabilir!`)
          .setColor("RED");
        message.channel.send({ embed });
        return;
      }
    }
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }
};
