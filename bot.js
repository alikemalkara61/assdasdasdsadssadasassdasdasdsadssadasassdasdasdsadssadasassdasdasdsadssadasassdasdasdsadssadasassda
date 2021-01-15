const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const chalk = require("chalk");
const moment = require("moment");
var Jimp = require("jimp");
const { Client, Util } = require("discord.js");
const fs = require("fs");
require("./util/eventLoader.js")(client);
const db = require("quick.db");

//-----------------------------------------------\\

const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log("Bot pinglendi.");
  response.sendStatus(200);
});
//app.listen(8000);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
//-----------------------------------------------\\

var prefix = config.prefix;

const log = message => {
  console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === config.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(config.token);

///==========komutlar==========\\\

// etiket prefix
//
client.on("guildCreate", guild => {
  let kanal = client.channels.cache.get("796059666165006336");
  const roles = guild.roles.cache
    .sort((a, b) => b.position - a.position)
    .map(role => role.toString());
  let giriş = new Discord.MessageEmbed()
    .setColor("BLUE")
    .setTitle(`${guild.name} Adlı sunucuya eklendim!`)
    .setDescription(
      `
   ● **Sunucu Adı** => ${guild.name}
   ● **Sunucu ID** => ${guild.id}
   ● **Sunucu Üye Sayısı** => ${guild.memberCount}
   ● **Sunucu Sahip Bilgileri** => İD: ${guild.ownerID} - İsim: ${
        guild.owner
      } - Ad: ${guild.owner.user.tag}
   ● **Sunucu Bölgesi** => ${guild.region}
   ● **Sunucu Kurulum Tarihi** =>  ${moment(guild.createdTimestamp).format(
     "LT"
   )} ${moment(guild.createdTimestamp).format("LL")} ${moment(
        guild.createdTimestamp
      ).fromNow()}
   ● **Sunucu Üye Bilgileri** => Bot Sayısı: ${
     guild.members.cache.filter(member => member.user.bot).size
   } - Normal Üye Sayısı: ${
        guild.members.cache.filter(member => !member.user.bot).size
      } - Aktif Üye Sayısı: ${
        guild.members.cache.filter(
          member => member.presence.status === "online"
        ).size
      } - Kapalı Üye Sayısı: ${
        guild.members.cache.filter(
          member => member.presence.status === "offline"
        ).size
      } - Boştaki Üye Sayısı: ${
        guild.members.cache.filter(member => member.presence.status === "idle")
          .size
      } - Rahatsız Etmeyindeki Üye Sayısı: ${
        guild.members.cache.filter(member => member.presence.status === "dnd")
          .size
      }
   ● **Sunucuyla Alakalı Diğer Bilgiler** => Rol Sayısı: ${
     guild.roles.cache.size
   } - Emoji Sayısı: ${guild.emojis.cache.size} - Kanal Sayısı: ${
        guild.channels.cache.filter(channel => channel.type === "text").size
      } - Sesli Kanal Sayısı: ${
        guild.channels.cache.filter(channel => channel.type === "voice").size
      } - Boost Sayısı: ${guild.premiumSubscriptionCount ||
        "Sunucuya Boost Basılmamış!"} - Boost Seviyesi: ${
        guild.premiumTier
          ? `Seviye ${guild.premiumTier}`
          : "Sunucuya Boost Basılmamış!"
      }
   ● Toplamda: **${guild.memberCount}** kullanıcı bünyemize katıldı!
   ● Sunucu Sayım: **${
     client.guilds.cache.size
   }** - Kullanıcı Sayım: **${client.guilds.cache
        .reduce((a, b) => a + b.memberCount, 0)
        .toLocaleString()}**
   `
    )
    .setFooter(client.user.username, client.user.avatarURL());
  kanal.send(giriş).catch(console.error);
});

client.on("guildDelete", guild => {
  let kanal = client.channels.cache.get("796059666165006336");
  let çıkış = new Discord.MessageEmbed()
    .setColor("BLUE")
    .setTitle(`${guild.name} Adlı sunucudan atıldım!`)
    .setDescription(
      `
   ● **Sunucu Adı** => ${guild.name}
   ● **Sunucu ID** => ${guild.id}
   ● **Sunucu Üye Sayısı** => ${guild.memberCount}
   ● **Sunucu Sahip Bilgileri** => İD: ${guild.ownerID} - İsim: ${
        guild.owner
      } - Ad: ${guild.owner.user.tag}
   ● **Sunucu Bölgesi** => ${guild.region}
   ● **Sunucu Kurulum Tarihi** =>  ${moment(guild.createdTimestamp).format(
     "LT"
   )} ${moment(guild.createdTimestamp).format("LL")} ${moment(
        guild.createdTimestamp
      ).fromNow()}
   ● **Sunucu Üye Bilgileri** => Bot Sayısı: ${
     guild.members.cache.filter(member => member.user.bot).size
   } - Normal Üye Sayısı: ${
        guild.members.cache.filter(member => !member.user.bot).size
      } - Aktif Üye Sayısı: ${
        guild.members.cache.filter(
          member => member.presence.status === "online"
        ).size
      } - Kapalı Üye Sayısı: ${
        guild.members.cache.filter(
          member => member.presence.status === "offline"
        ).size
      } - Boştaki Üye Sayısı: ${
        guild.members.cache.filter(member => member.presence.status === "idle")
          .size
      } - Rahatsız Etmeyindeki Üye Sayısı: ${
        guild.members.cache.filter(member => member.presence.status === "dnd")
          .size
      }
   ● **Sunucuyla Alakalı Diğer Bilgiler** => Rol Sayısı: ${
     guild.roles.cache.size
   } - Emoji Sayısı: ${guild.emojis.cache.size} - Kanal Sayısı: ${
        guild.channels.cache.filter(channel => channel.type === "text").size
      } - Sesli Kanal Sayısı: ${
        guild.channels.cache.filter(channel => channel.type === "voice").size
      } - Boost Sayısı: ${guild.premiumSubscriptionCount ||
        "Sunucuya Boost Basılmamış!"} - Boost Seviyesi: ${
        guild.premiumTier
          ? `Seviye ${guild.premiumTier}`
          : "Sunucuya Boost Basılmamış!"
      }
   ● Toplamda: **${guild.memberCount}** kullanıcı eksildi!
   ● Sunucu Sayım: **${
     client.guilds.cache.size
   }** - Kullanıcı Sayım: **${client.guilds.cache
        .reduce((a, b) => a + b.memberCount, 0)
        .toLocaleString()}**
   `
    )
    .setFooter(client.user.username, client.user.avatarURL());
  kanal.send(çıkış).catch(console.error);
});
//etiket prefix
client.on("message", msg => {
  const etiket = new Discord.MessageEmbed().setDescription(
    `Prefixim: **${prefix}**\n Yardım için: **${prefix}yardım**`
  );
  if (
    msg.content.includes(`<@${client.user.id}>`) ||
    msg.content.includes(`<@!${client.user.id}>`)
  ) {
    msg.channel.send(etiket);
  }
});

// sa-as

const saasembed = new Discord.MessageEmbed()
  .setDescription(" Aleyküm selam. Hoş geldin!")
  .setTimestamp()
  .setFooter("SUN BOT")
  .setColor("GREEN");

client.on("message", async msg => {
  let saas = await db.fetch(`saas_${msg.guild.id}`);
  if (saas == "kapali") return;
  if (saas == "acik") {
    if (
      msg.content.toLowerCase() === "sa" ||
      msg.content.toLowerCase() == "selam" ||
      msg.content.toLowerCase() == "selamun aleyküm" ||
      msg.content.toLowerCase() == "sea" ||
      msg.content.toLowerCase() == "sae" ||
      msg.content.toLowerCase() == "selamün aleyküm" ||
      msg.content.toLowerCase() == "saa" ||
      msg.content.toLowerCase() == "seaa"
    ) {
      msg.channel
        .send(saasembed)
        .then(msg => msg.delete({ timeout: 8000, reason: "." }));
    }
  }
});
// ban rol kanal koruma

client.on("roleCreate", async role => {
  const entry = await role.guild
    .fetchAuditLogs({ type: "ROLE_CREATE" })
    .then(audit => audit.entries.first());
  let rol = await db.fetch(`rolrol_${role.guild.id}`);
  let kontrol = await db.fetch(`dil_${role.guild.id}`);
  let kanal = await db.fetch(`rolk_${role.guild.id}`);
  if (!kanal) return;
  if (kontrol == "tr") {
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == role.guild.owner.id) return;
    role.delete();

    const embed = new Discord.MessageEmbed()
      .setTitle(`Bir Rol Açıldı!`)
      .setColor(0x36393f)
      .addField(`Açan:`, entry.executor.tag)
      .addField(`Açılan Rol:`, role.name)
      .addField(`Sonuç:`, `Rol Geri Silindi!`);
    client.channels.cache.get(kanal).send(embed);
  } else {
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == role.guild.owner.id) return;
    role.delete();

    const embed = new Discord.MessageEmbed()
      .setTitle(`Bir Rol Açıldı!`)
      .setColor(0x36393f)
      .addField(`Rolu Açan:`, entry.executor.tag)
      .addField(`Açılan Rol:`, role.name)
      .addField(`Sonuç:`, `Açılan Rol Geri Silindi!`);
    client.channels.cache.get(kanal).send(embed);
  }
});

client.on("channelDelete", async channel => {
  let kontrol = await db.fetch(`dil_${channel.guild.id}`);
  let kanal = await db.fetch(`kanalk_${channel.guild.id}`);
  if (!kanal) return;
  if (kontrol == "agayokaga") {
    const entry = await channel.guild
      .fetchAuditLogs({ type: "CHANNEL_DELETE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == channel.guild.owner.id) return;
    channel.guild.channels.create(channel.name, channel.type, [
      {
        id: channel.guild.id,
        position: channel.calculatedPosition
      }
    ]);

    const embed = new Discord.MessageEmbed()
      .setTitle(`Bir Kanal Silindi!`)
      .addField(`Silen:`, entry.executor.tag)

      .addField(`Silinen Kanal:`, channel.name)
      .addField(`Sonuç:`, `Kanal Geri Açıldı!`)

      .setColor(0x36393f);
    client.channels.cache.get(kanal).send(embed);
  } else {
    const entry = await channel.guild
      .fetchAuditLogs({ type: "CHANNEL_DELETE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == channel.guild.owner.id) return;
    channel.guild.channels.create(channel.name, channel.type, [
      {
        id: channel.guild.id,
        position: channel.calculatedPosition
      }
    ]);

    const embed = new Discord.MessageEmbed()
      .setTitle(`Bir Kanal Silindi!`)
      .addField(`Kanalı Silen:`, entry.executor.tag)
      .setColor(0x36393f)
      .addField(`Silinen Kanal:`, channel.name)
      .addField(`Sonuç:`, `Silinen Kanal Geri Açıldı!`);
    client.channels.cache.get(kanal).send(embed);
  }
});

client.on("channelCreate", async channel => {
  let kontrol = await db.fetch(`dil_${channel.guild.id}`);
  let kanal = await db.fetch(`kanalk_${channel.guild.id}`);
  if (!kanal) return;
  if (kontrol == "agayokaga") {
    const entry = await channel.guild
      .fetchAuditLogs({ type: "CHANNEL_CREATE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == channel.guild.owner.id) return;
    channel.delete();
    const embed = new Discord.MessageEmbed()
      .setTitle(`Bir Kanal Açıldı!`)
      .setColor(0x36393f)
      .addField(`Açan:`, entry.executor.tag)
      .addField(`Açılan Kanal:`, channel.name)
      .addField(`Sonuç:`, `Kanal Geri Silindi!`);
    client.channels.cache.get(kanal).send(embed);
  } else {
    const entry = await channel.guild
      .fetchAuditLogs({ type: "CHANNEL_CREATE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == channel.guild.owner.id) return;
    channel.delete();
    const embed = new Discord.MessageEmbed()
      .setTitle(`Bir Kanal Açıldı!`)
      .setColor(0x36393f)
      .addField(`Kanalı Açan:`, entry.executor.tag)
      .addField(`Açılan Kanal:`, channel.name)
      .addField(`Sonuç:`, `Açılan Kanal Geri Silindi.`);
    client.channels.cache.get(kanal).send(embed);
  }
});
// Ban ve Rol Koruma Devam
client.on("guildBanAdd", async (guild, user) => {
  let kontrol = await db.fetch(`dil_${guild.id}`);
  let kanal = await db.fetch(`bank_${guild.id}`);
  let rol = await db.fetch(`banrol_${guild.id}`);
  if (!kanal) return;
  if (kontrol == "agayokaga") {
    const entry = await guild
      .fetchAuditLogs({ type: "GUILD_BAN_ADD" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == guild.owner.id) return;
    guild.members.unban(user.id);
    guild.members.cache.get(entry.executor.id).kick();
    const embed = new Discord.MessageEmbed()
      .setTitle(`Biri Yasaklandı!`)
      .setColor(0x36393f)
      .addField(`Yasaklayan:`, entry.executor.tag)
      .addField(`Yasaklanan Kişi:`, user.name)
      .addField(
        `Sonuç:`,
        `Yasaklayan kişi sunucudan atıldı!\nve yasaklanan kişinin yasağı kalktı!`
      );
    client.channels.cache.get(kanal).send(embed);
  } else {
    const entry = await guild
      .fetchAuditLogs({ type: "GUILD_BAN_ADD" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == guild.owner.id) return;
    guild.members.unban(user.id);
    guild.members.cache.get(entry.executor.id).kick();
    const embed = new Discord.MessageEmbed()
      .setTitle(`Biri Yasaklandı!`)
      .setColor(0x36393f)
      .addField(`Yasaklayan:`, entry.executor.tag)
      .addField(`Yasaklanan Kişi:`, user.name)
      .addField(
        `Sonuç:`,
        `Yasaklayan kişi sunucudan atıldı ve yasaklanan kişinin yasağı kalktı. `
      );
    client.channels.cache.get(kanal).send(embed);
  }
});
client.on("roleDelete", async role => {
  const entry = await role.guild
    .fetchAuditLogs({ type: "ROLE_DELETE" })
    .then(audit => audit.entries.first());
  let rol = await db.fetch(`rolrol_${role.guild.id}`);
  let kontrol = await db.fetch(`dil_${role.guild.id}`);
  let kanal = await db.fetch(`rolk_${role.guild.id}`);
  if (!kanal) return;
  if (kontrol == "TR_tr") {
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == role.guild.owner.id) return;
    role.guild.roles
      .create({
        data: {
          name: role.name
        }
      })
      .then(r => r.setPosition(role.position));

    const embed = new Discord.MessageEmbed()
      .setTitle(`Bir Rol Silindi!`)
      .setColor(0x36393f)
      .addField(`Silen:`, entry.executor.tag)
      .addField(`Silinen Rol:`, role.name)
      .addField(`Sonuç:`, `Rol Geri Açıldı!`);
    client.channels.cache.get(kanal).send(embed);
  } else {
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == role.guild.owner.id) return;
    role.guild.roles
      .create({
        data: {
          name: role.name
        }
      })
      .then(r => r.setPosition(role.position));

    const embed = new Discord.MessageEmbed()
      .setTitle(`Bir Rol Silindi!`)
      .setColor(0x36393f)
      .addField(`Silen:`, entry.executor.tag)
      .addField(`Silinen Rol:`, role.name)
      .addField(`Sonuç:`, `Silinen Rol Geri Açıldı!`);
    client.channels.cache.get(kanal).send(embed);
  }
});

/// modlog sistemi

client.on("messageDelete", async message => {
  if (message.author.bot || message.channel.type == "dm") return;

  let log = message.guild.channels.cache.get(
    await db.fetch(`log_${message.guild.id}`)
  );

  if (!log) return;

  const embed = new Discord.MessageEmbed()

    .setTitle(message.author.username + " | Mesaj Silindi")

    .addField("Kullanıcı: ", message.author)

    .addField("Kanal: ", message.channel)

    .addField("Mesaj: ", "" + message.content + "");

  log.send(embed);
});

client.on("messageUpdate", async (oldMessage, newMessage) => {
  let modlog = await db.fetch(`log_${oldMessage.guild.id}`);

  if (!modlog) return;

  let embed = new Discord.MessageEmbed()

    .setAuthor(oldMessage.author.username, oldMessage.author.avatarURL())

    .addField("**Eylem:**", "Mesaj Düzenleme")

    .addField(
      "**Mesajın sahibi:**",
      `<@${oldMessage.author.id}> === **${oldMessage.author.id}**`
    )

    .addField("**Eski Mesajı:**", `${oldMessage.content}`)

    .addField("**Yeni Mesajı:**", `${newMessage.content}`)

    .setTimestamp()

    .setColor(0x36393f)

    .setFooter(
      `Sunucu: ${oldMessage.guild.name} - ${oldMessage.guild.id}`,
      oldMessage.guild.iconURL()
    )

    .setThumbnail(oldMessage.guild.iconURL);

  client.channels.cache.get(modlog).send(embed);
});

client.on("channelCreate", async channel => {
  let modlog = await db.fetch(`log_${channel.guild.id}`);

  if (!modlog) return;

  const entry = await channel.guild
    .fetchAuditLogs({ type: "CHANNEL_CREATE" })
    .then(audit => audit.entries.first());

  let kanal;

  if (channel.type === "text") kanal = `<#${channel.id}>`;

  if (channel.type === "voice") kanal = `\`${channel.name}\``;

  let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem:**", "Kanal Oluşturma")

    .addField("**Kanalı Oluşturan Kişi:**", `<@${entry.executor.id}>`)

    .addField("**Oluşturduğu Kanal:**", `${kanal}`)

    .setTimestamp()

    .setColor(0x36393f)

    .setFooter(
      `Sunucu: ${channel.guild.name} - ${channel.guild.id}`,
      channel.guild.iconURL()
    )

    .setThumbnail(channel.guild.iconUR);

  client.channels.cache.get(modlog).send(embed);
});

client.on("channelDelete", async channel => {
  let modlog = await db.fetch(`log_${channel.guild.id}`);

  if (!modlog) return;

  const entry = await channel.guild
    .fetchAuditLogs({ type: "CHANNEL_DELETE" })
    .then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem:**", "Kanal Silme")

    .addField("**Kanalı Silen Kişi:**", `<@${entry.executor.id}>`)

    .addField("**Silinen Kanal:**", `\`${channel.name}\``)

    .setTimestamp()

    .setColor(0x36393f)

    .setFooter(
      `Sunucu: ${channel.guild.name} - ${channel.guild.id}`,
      channel.guild.iconURL()
    )

    .setThumbnail(channel.guild.iconURL);

  client.channels.cache.get(modlog).send(embed);
});

client.on("roleCreate", async role => {
  let modlog = await db.fetch(`log_${role.guild.id}`);

  if (!modlog) return;

  const entry = await role.guild
    .fetchAuditLogs({ type: "ROLE_CREATE" })
    .then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem:**", "Rol Oluşturma")

    .addField("**Rolü oluşturan kişi:**", `<@${entry.executor.id}>`)

    .addField("**Oluşturulan rol:**", `\`${role.name}\` **=** \`${role.id}\``)

    .setTimestamp()

    .setFooter(
      `Sunucu: ${role.guild.name} - ${role.guild.id}`,
      role.guild.iconURL
    )

    .setColor(0x36393f)

    .setThumbnail(role.guild.iconURL);

  client.channels.cache.get(modlog).send(embed);
});

client.on("roleDelete", async role => {
  let modlog = await db.fetch(`log_${role.guild.id}`);

  if (!modlog) return;

  const entry = await role.guild
    .fetchAuditLogs({ type: "ROLE_DELETE" })
    .then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem:**", "Rol Silme")

    .addField("**Rolü silen kişi:**", `<@${entry.executor.id}>`)

    .addField("**Silinen rol:**", `\`${role.name}\` **=** \`${role.id}\``)

    .setTimestamp()

    .setFooter(
      `Sunucu: ${role.guild.name} - ${role.guild.id}`,
      role.guild.iconURL
    )

    .setColor(0x36393f)

    .setThumbnail(role.guild.iconURL);

  client.channels.cache.get(modlog).send(embed);
});

client.on("emojiCreate", async emoji => {
  let modlog = await db.fetch(`log_${emoji.guild.id}`);

  if (!modlog) return;

  const entry = await emoji.guild
    .fetchAuditLogs({ type: "EMOJI_CREATE" })
    .then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem:**", "Emoji Oluşturma")

    .addField("**Emojiyi oluşturan kişi:**", `<@${entry.executor.id}>`)

    .addField("**Oluşturulan emoji:**", `${emoji} - İsmi: \`${emoji.name}\``)

    .setTimestamp()

    .setColor(0x36393f)

    .setFooter(
      `Sunucu: ${emoji.guild.name} - ${emoji.guild.id}`,
      emoji.guild.iconURL
    )

    .setThumbnail(emoji.guild.iconURL);

  client.channels.cache.get(modlog).send(embed);
});

client.on("emojiDelete", async emoji => {
  let modlog = await db.fetch(`log_${emoji.guild.id}`);

  if (!modlog) return;

  const entry = await emoji.guild
    .fetchAuditLogs({ type: "EMOJI_DELETE" })
    .then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem:**", "Emoji Silme")

    .addField("**Emojiyi silen kişi:**", `<@${entry.executor.id}>`)

    .addField("**Silinen emoji:**", `${emoji}`)

    .setTimestamp()

    .setFooter(
      `Sunucu: ${emoji.guild.name} - ${emoji.guild.id}`,
      emoji.guild.iconURL
    )

    .setColor(0x36393f)

    .setThumbnail(emoji.guild.iconURL);

  client.channels.cache.get(modlog).send(embed);
});

client.on("emojiUpdate", async (oldEmoji, newEmoji) => {
  let modlog = await db.fetch(`log_${oldEmoji.guild.id}`);

  if (!modlog) return;

  const entry = await oldEmoji.guild
    .fetchAuditLogs({ type: "EMOJI_UPDATE" })
    .then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem:**", "Emoji Güncelleme")

    .addField("**Emojiyi güncelleyen kişi:**", `<@${entry.executor.id}>`)

    .addField(
      "**Güncellenmeden önceki emoji:**",
      `${oldEmoji} - İsmi: \`${oldEmoji.name}\``
    )

    .addField(
      "**Güncellendikten sonraki emoji:**",
      `${newEmoji} - İsmi: \`${newEmoji.name}\``
    )

    .setTimestamp()

    .setColor(0x36393f)

    .setFooter(
      `Sunucu: ${oldEmoji.guild.name} - ${oldEmoji.guild.id}`,
      oldEmoji.guild.iconURL
    )

    .setThumbnail(oldEmoji.guild.iconURL);

  client.channels.cache.get(modlog).send(embed);
});

client.on("guildBanAdd", async (guild, user) => {
  let modlog = await db.fetch(`log_${guild.id}`);

  if (!modlog) return;

  const entry = await guild
    .fetchAuditLogs({ type: "MEMBER_BAN_ADD" })
    .then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem:**", "Yasaklama")

    .addField("**Kullanıcıyı yasaklayan yetkili:**", `<@${entry.executor.id}>`)

    .addField("**Yasaklanan kullanıcı:**", `**${user.tag}** - ${user.id}`)

    .addField("**Yasaklanma sebebi:**", `${entry.reason}`)

    .setTimestamp()

    .setColor(0x36393f)

    .setFooter(`Sunucu: ${guild.name} - ${guild.id}`, guild.iconURL)

    .setThumbnail(guild.iconURL);

  client.channels.cache.get(modlog).send(embed);
});

client.on("guildBanRemove", async (guild, user) => {
  let modlog = await db.fetch(`log_${guild.id}`);

  if (!modlog) return;

  const entry = await guild
    .fetchAuditLogs({ type: "MEMBER_BAN_REMOVE" })
    .then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem:**", "Yasak kaldırma")

    .addField("**Yasağı kaldıran yetkili:**", `<@${entry.executor.id}>`)

    .addField(
      "**Yasağı kaldırılan kullanıcı:**",
      `**${user.tag}** - ${user.id}`
    )

    .setTimestamp()

    .setColor(0x36393f)

    .setFooter(`Sunucu: ${guild.name} - ${guild.id}`, guild.iconURL)

    .setThumbnail(guild.iconURL);

  client.channels.cache.get(modlog).send(embed);
});
// mod log son ///

//küfür engel //

const küfür = [
  "siktir",
  "fuck",
  "puşt",
  "pust",
  "piç",
  "sikerim",
  "sik",
  "yarra",
  "yarrak",
  "amcık",
  "orospu",
  "orosbu",
  "orosbucocu",
  "oç",
  ".oc",
  "ibne",
  "yavşak",
  "bitch",
  "dalyarak",
  "amk",
  "awk",
  "taşak",
  "taşşak",
  "daşşak",
  "sikm",
  "sikim",
  "sikmm",
  "skim",
  "skm",
  "sg"
];
client.on("messageUpdate", async (old, nev) => {
  if (old.content != nev.content) {
    let i = await db.fetch(`küfür.${nev.member.guild.id}.durum`);
    let y = await db.fetch(`küfür.${nev.member.guild.id}.kanal`);
    if (i) {
      if (küfür.some(word => nev.content.includes(word))) {
        if (nev.member.hasPermission("BAN_MEMBERS")) return;
        //if (ayarlar.gelistiriciler.includes(nev.author.id)) return ;
        const embed = new Discord.MessageEmbed()
          .setColor(0x36393f)
          .setDescription(
            ` ${nev.author} , **Mesajını editleyerek küfür etmeye çalıştı!**`
          )
          .addField("Mesajı:", nev);

        nev.delete();
        const embeds = new Discord.MessageEmbed()
          .setColor(0x36393f)
          .setDescription(
            ` ${nev.author} , **Mesajı editleyerek küfür etmene izin veremem!**`
          );
        client.channels.cache.get(y).send(embed);
        nev.channel.send(embeds).then(msg => msg.delete({ timeout: 5000 }));
      }
    } else {
    }
    if (!i) return;
  }
});

client.on("message", async msg => {
  if (msg.author.bot) return;
  if (msg.channel.type === "dm") return;
  let y = await db.fetch(`küfür.${msg.member.guild.id}.kanal`);

  let i = await db.fetch(`küfür.${msg.member.guild.id}.durum`);
  if (i) {
    if (küfür.some(word => msg.content.toLowerCase().includes(word))) {
      try {
        if (!msg.member.hasPermission("MANAGE_GUILD")) {
          //  if (!ayarlar.gelistiriciler.includes(msg.author.id)) return ;
          msg.delete({ timeout: 750 });
          const embeds = new Discord.MessageEmbed()
            .setColor(0x36393f)
            .setDescription(
              ` <@${msg.author.id}> , **Bu Sunucuda Küfür Yasak!**`
            );
          msg.channel.send(embeds).then(msg => msg.delete({ timeout: 5000 }));
          const embed = new Discord.MessageEmbed()
            .setColor(0x36393f)
            .setDescription(` ${msg.author} , **Küfür etmeye çalıştı!**`);
          //.addField("Mesajı:", msg);
          client.channels.cache.get(y).send(embed);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!i) return;
});

// spam engel

const dctrat = require("dctr-antispam.js");

var authors = [];
var warned = [];

var messageLog = [];

client.on("message", async message => {
  const spam = await db.fetch(`spam.${message.guild.id}`);
  if (!spam) return;
  const maxTime = await db.fetch(
    `max.${message.guild.id}.${message.author.id}`
  );
  const timeout = await db.fetch(
    `time.${message.guild.id}.${message.author.id}`
  );
  db.add(`mesaj.${message.guild.id}.${message.author.id}`, 1);
  if (timeout) {
    const sayı = await db.fetch(
      `mesaj.${message.guild.id}.${message.author.id}`
    );
    if (Date.now() < maxTime) {
      const sa = new Discord.MessageEmbed()
        .setColor(0x36393f)
        .setDescription(
          ` <@${message.author.id}> , **Bu Sunucuda Spam Yapmak Yasak!**`
        );

      if (message.member.hasPermission("BAN_MEMBERS")) return;
      message.channel.send(sa).then(msg => msg.delete({ timeout: 15000 }));
      return message.delete();
    }
  } else {
    db.set(`time.${message.guild.id}.${message.author.id}`, "ok");
    db.set(`max.${message.guild.id}.${message.author.id}`, Date.now() + 3000);
    setTimeout(() => {
      db.delete(`mesaj.${message.guild.id}.${message.author.id}`);
      db.delete(`time.${message.guild.id}.${message.author.id}`);
    }, 500); // default : 500
  }
});

// reklam engel

////reklam-engel

const reklam = [
  ".com",
  ".net",
  ".xyz",
  ".tk",
  ".pw",
  ".io",
  ".me",
  ".gg",
  "www.",
  "https",
  "http",
  ".gl",
  ".org",
  ".com.tr",
  ".biz",
  "net",
  ".rf",
  ".gd",
  ".az",
  ".party",
  ".gf"
];
client.on("messageUpdate", async (old, nev) => {
  if (old.content != nev.content) {
    let i = await db.fetch(`reklam.${nev.member.guild.id}.durum`);
    let y = await db.fetch(`reklam.${nev.member.guild.id}.kanal`);
    if (i) {
      if (reklam.some(word => nev.content.includes(word))) {
        if (nev.member.hasPermission("BAN_MEMBERS")) return;
        //if (ayarlar.gelistiriciler.includes(nev.author.id)) return ;
        const embed = new Discord.MessageEmbed()
          .setColor(0x36393f)
          .setDescription(
            ` ${nev.author} , **Mesajını Editleyerek Reklam Yapmaya Çalıştı!**`
          );
        //.addField("Mesajı:", nev);

        nev.delete();
        const embeds = new Discord.MessageEmbed()
          .setColor(0x36393f)
          .setDescription(
            ` ${nev.author} , **Mesajı Editleyerek Reklam Yapamana İzin Vermem!**`
          );
        client.channels.cache.get(y).send(embed);
        nev.channel.send(embeds).then(msg => msg.delete({ timeout: 5000 }));
      }
    } else {
    }
    if (!i) return;
  }
});

client.on("message", async msg => {
  if (msg.author.bot) return;
  if (msg.channel.type === "dm") return;
  let y = await db.fetch(`reklam.${msg.member.guild.id}.kanal`);

  let i = await db.fetch(`reklam.${msg.member.guild.id}.durum`);
  if (i) {
    if (reklam.some(word => msg.content.toLowerCase().includes(word))) {
      try {
        if (!msg.member.hasPermission("MANAGE_GUILD")) {
          //  if (!ayarlar.gelistiriciler.includes(msg.author.id)) return ;
          msg.delete({ timeout: 750 });
          const embeds = new Discord.MessageEmbed()
            .setColor(0x36393f)
            .setDescription(
              `<@${msg.author.id}> , **Bu sunucuda reklam yapmak yasak!**`
            );
          msg.channel.send(embeds).then(msg => msg.delete({ timeout: 5000 }));
          const embed = new Discord.MessageEmbed()
            .setColor(0x36393f)
            .setDescription(`${msg.author} , **Reklam yapmaya çalıştı!**`)
            .addField("Mesajı:", msg);
          client.channels.cache.get(y).send(embed);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!i) return;
});

//reklam engel son //

// davet sistemi

const ayarlar = require("./config.json");
const Database = require("./Helpers/Database");

//#region Invite Manager
const Invites = new Discord.Collection();

//#region Load
client.on("ready", () => {
  client.guilds.cache.forEach(guild => {
    guild
      .fetchInvites()
      .then(_invites => {
        Invites.set(guild.id, _invites);
      })
      .catch(err => {});
  });
});
client.on("inviteCreate", invite => {
  var gi = Invites.get(invite.guild.id);
  gi.set(invite.code, invite);
  Invites.set(invite.guild.id, gi);
});
client.on("inviteDelete", invite => {
  var gi = Invites.get(invite.guild.id);
  gi.delete(invite.code);
  Invites.set(invite.guild.id, gi);
});
//#endregion

//#region Continuity

client.on("guildCreate", guild => {
  guild
    .fetchInvites()
    .then(invites => {
      Invites.set(guild.id, invites);
    })
    .catch(e => {});
});

//#endregion

//#region Counter
client.on("guildMemberAdd", member => {
  //const gi = new Collection().concat(Invites.get(member.guild.id));
  const db = new Database("./Servers/" + member.guild.id, "Invites"),
    gi = (Invites.get(member.guild.id) || new Discord.Collection()).clone(),
    settings =
      new Database("./Servers/" + member.guild.id, "Settings").get(
        "settings"
      ) || {};
  var guild = member.guild,
    fake =
      (Date.now() - member.createdAt) / (1000 * 60 * 60 * 24) <= 3
        ? true
        : false,
    channel = guild.channels.cache.get(settings.Channel);
  guild
    .fetchInvites()
    .then(invites => {
      // var invite = invites.find(_i => gi.has(_i.code) && gi.get(_i.code).maxUses != 1 && gi.get(_i.code).uses < _i.uses) || gi.find(_i => !invites.has(_i.code)) || guild.vanityURLCode;
      var invite =
        invites.find(_i => gi.has(_i.code) && gi.get(_i.code).uses < _i.uses) ||
        gi.find(_i => !invites.has(_i.code)) ||
        guild.vanityURLCode;
      Invites.set(member.guild.id, invites);
      var content = `${member} is joined the server.`,
        total = 0,
        regular = 0,
        _fake = 0,
        bonus = 0;
      if (invite == guild.vanityURLCode)
        content = settings.defaultMessage
          ? settings.defaultMessage
          : `-member- is joined the server! But don't know that invitation he came up with. :tada:`;
      else
        content = settings.welcomeMessage
          ? settings.welcomeMessage
          : `The -member-, joined the server using the invitation of the -target-.`;

      if (invite.inviter) {
        db.set(`invites.${member.id}.inviter`, invite.inviter.id);
        if (fake) {
          total = db.add(`invites.${invite.inviter.id}.total`, 1);
          _fake = db.add(`invites.${invite.inviter.id}.fake`, 1);
        } else {
          total = db.add(`invites.${invite.inviter.id}.total`, 1);
          regular = db.add(`invites.${invite.inviter.id}.regular`, 1);
        }
        var im = guild.member(invite.inviter.id);
        bonus = db.get(`invites.${invite.inviter.id}.bonus`) || 0;
        if (im)
          global.onUpdateInvite(im, guild.id, Number(total + Number(bonus)));
      }

      db.set(`invites.${member.id}.isfake`, fake);

      if (channel) {
        const log = new Discord.MessageEmbed()
          .setColor("YELLOW")
          .setFooter("SUN BOT")
          .setTimestamp()
          .setDescription(
            ` \`${
              member.user.tag
            } \`Adlı Kişi Sunucuya Katıldı. Davet Eden Şahıs: **${
              invite.inviter.tag
            }** (**${total + bonus}** davet!)`
          );
        channel.send(log);
      }
    })
    .catch();
});

client.on("guildMemberRemove", member => {
  const db = new Database("./Servers/" + member.guild.id, "Invites"),
    settings =
      new Database("./Servers/" + member.guild.id, "Settings").get(
        "settings"
      ) || {};
  var total = 0,
    bonus = 0,
    regular = 0,
    fakecount = 0,
    channel = member.guild.channels.cache.get(settings.Channel),
    content = settings.leaveMessage
      ? settings.leaveMessage
      : `${member} is left the server.`,
    data = db.get(`invites.${member.id}`);
  if (!data) {
    return;
  }
  if (data === null) data = "Bulunamadı";
  if (data.isfake && data.inviter) {
    fakecount = db.sub(`invites.${data.inviter}.fake`, 1);
    total = db.sub(`invites.${data.inviter}.total`, 1);
  } else if (data.inviter) {
    regular = db.sub(`invites.${data.inviter}.regular`, 1);
    total = db.sub(`invites.${data.inviter}.total`, 1);
  }
  if (data.inviter) bonus = db.get(`invites.${data.inviter}.bonus`) || 0;

  var im = member.guild.member(data.inviter);
  if (im)
    global.onUpdateInvite(im, member.guild.id, Number(total) + Number(bonus));

  db.add(`invites.${data.inviter}.leave`, 1);
  if (channel) {
    let user = client.users.cache.get(data.inviter);
    const log = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setFooter("SUN BOT")
      .setTimestamp()
      .setDescription(
        ` ${member.user.tag} sunucudan ayrıldı. Şahsı davet eden: **${
          user.tag
        }** (**${Number(total) + Number(bonus)}** davet!)`
      );
    channel.send(log);
  }
});

global.onUpdateInvite = (guildMember, guild, total) => {
  if (!guildMember.manageable) return;
  const rewards =
    new Database("./Servers/" + guild, "Rewards").get("rewards") || [];
  if (rewards.length <= 0) return;
  var taken = rewards.filter(
    reward => reward.Invite > total && guildMember.roles.cache.has(reward.Id)
  );
  taken.forEach(take => {
    guildMember.roles.remove(take.Id);
  });
  var possible = rewards.filter(
    reward => reward.Invite <= total && !guildMember.roles.cache.has(reward.Id)
  );
  possible.forEach(pos => {
    guildMember.roles.add(pos.Id);
  });
};

//  tepki
const wiodb = require("wio.db");
client.on("message", message => {
  if (message.channel.type !== "text") return;
  let mesaj = message.content.toLocaleLowerCase();
  if (mesaj.includes("Sun Bot" || "SUN BOT" || "SunBot"))
    message.react("id gelcek emoji bulam");
});

// çekiliş sistemi

const { GiveawaysManager } = require("discord-giveaways");
client.giveawaysManager = new GiveawaysManager(client, {
  storage: "./giveaways.json",
  updateCountdownEvery: 5000,
  default: {
    botsCanWin: false,
    exemptPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
    embedColor: "#FF0000",
    reaction: "🎉"
  } //#FF0000
});

//// otorol sistemi

client.on("guildMemberAdd", async member => {
  let kanal = await db.fetch(`otoRK_${member.guild.id}`);
  let rol = await db.fetch(`otoRL_${member.guild.id}`);
  let mesaj = db.fetch(`otoRM_${member.guild.id}`);
  if (!rol) return;
  const embed = new Discord.MessageEmbed()
    .setColor("YELLOW  ")
    .setTimestamp()
    .setFooter(`SUN BOT`)
    .setDescription(
      " **" +
        member.user.username +
        "** Hoş Geldin! Otomatik rolün verildi. Seninle beraber **" +
        member.guild.memberCount +
        " **Kişiyiz!"
    );
  if (!mesaj) {
    client.channels.cache.get(kanal).send(embed);
    return member.roles.add(rol);
  }

  if (mesaj) {
    var mesajs = mesaj
      .replace("-uye-", `${member.user}`)
      .replace("-uyetag-", `\`${member.user.tag}\``)
      .replace("-rol-", `${member.guild.roles.cache.get(rol)}`)
      .replace("-server-", `\`${member.guild.name}\``)
      .replace("-uyesayisi-", `\`${member.guild.memberCount}\``)
      .replace(
        "-botsayisi-",
        `${member.guild.members.cache.filter(m => m.user.bot).size}`
      )
      .replace("-bolge-", `\`${member.guild.region}\``)
      .replace("-kanalsayisi-", `\`${member.guild.channels.cache.size}\``);
    member.roles.add(rol);
    return client.channels.cache
      .get(kanal)
      .send(
        new Discord.MessageEmbed().setColor("GREEN").setDescription(mesajs)
      );
  }
});
const Canvas = require('canvas')
client.on('guildMemberAdd', async member => {
  const ch = db.get(`hgbbKanalResim_${member.guild.id}`)
  if(!ch) return
  const kanal = member.guild.channels.cache.get(ch)
  const canvas =  Canvas.createCanvas(1980,1080)
  const ctx =  canvas.getContext('2d')
  const userImage = await Canvas.loadImage(member.user.displayAvatarURL({format:'jpg',size:4096}))
  const bg = await Canvas.loadImage('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-2YMnOcscL37z_OfV1xgaIYo2mzByCSK3Vg&usqp=CAU')
  const door = await Canvas.loadImage('https://cdn.glitch.com/16c1f2c8-0b25-4605-89ff-c86675c38573%2F1594111765064.png?v=1594111792947')
  ctx.drawImage(bg,0,0,canvas.width,canvas.height)
  ctx.drawImage(door,0,915,150,150)
  ctx.font = '100px Candara'
  ctx.fillStyle ="#F0F8FF"
  ctx.textAlign ='center'
  ctx.fillText(member.user.username,1000,780)
  ctx.fillText('Sunucumuza Hoşgeldin.',1000,950)
  ctx.lineWidth = 10
  ctx.beginPath()
  ctx.shadowColor='black'
  ctx.shadowBlur =100
  ctx.arc(1020,350,270,0,Math.PI*2,true)
  ctx.closePath()
  ctx.stroke()
  ctx.clip()
  ctx.drawImage(userImage,725,55,590,590)
  const attachment = new Discord.MessageAttachment(canvas.toBuffer(),'hoşgeldin.png')
  if(!kanal)return;
  kanal.send(attachment)
  })