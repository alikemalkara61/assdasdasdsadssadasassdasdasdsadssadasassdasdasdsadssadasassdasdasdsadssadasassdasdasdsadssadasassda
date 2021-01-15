const discord = require("discord.js");

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["bilgi", "sunucubilgi", "sunucu-bilgi", "sb"],
  permLevel: 0,
  kategori: "bot"
};

exports.help = {
  name: "say"
};
const db = require("quick.db");
exports.run = async (client, message, args) => {
  let kontrol = (await db.fetch(`dil_${message.guild.id}`)) || "tr";
  if (kontrol == "tr") {
    const seskanallari = message.guild.channels.cache.filter(
      c => c.type === "voice"
    );
    let westracc = 0;
    let westrabroo = message.guild.members.cache.filter(
      m => !m.user.bot && m.user.presence.status !== "offline"
    ).size;
    let metinkanallari = message.guild.channels.cache.filter(
      m => m.type == "text"
    ).size;
    for (const [id, voiceChannel] of seskanallari)
      westracc += voiceChannel.members.size;
    const embed = new discord.MessageEmbed()
      .setColor("0x36393F")
      .setTitle("SUN BOT - Say")
      .setFooter("SUN BOT")
      .setTimestamp().setDescription(`
 Toplam üye sayısı: **${message.guild.memberCount}**
 Toplam çevrimiçi üye sayısı: **${westrabroo}**
 Toplam metin kanalı sayısı: **${metinkanallari}**
 Toplam ses kanalı sayısı: **${seskanallari.size}**
 Toplam çevrimiçi durumda olan üye sayısı: **${
   message.guild.members.cache.filter(o => o.presence.status === "online").size
 }**
 Toplam boşta durumda olan üye sayısı: **${
   message.guild.members.cache.filter(i => i.presence.status === "idle").size
 }**
 Toplam rahatsız etme durumda olan üye sayısı: **${
   message.guild.members.cache.filter(i => i.presence.status === "dnd").size
 }**
`);
    message.channel.send(embed);
  }
  if (kontrol == "en") {
    const seskanallari = message.guild.channels.cache.filter(
      c => c.type === "voice"
    );
    let westracc = 0;
    let westrabroo = message.guild.members.cache.filter(
      m => !m.user.bot && m.user.presence.status !== "offline"
    ).size;
    let metinkanallari = message.guild.channels.cache.filter(
      m => m.type == "text"
    ).size;
    for (const [id, voiceChannel] of seskanallari)
      westracc += voiceChannel.members.size;
    const embed = new discord.MessageEmbed()
      .setColor("0x36393F")
      .setTitle("SUN BOT - Say")
      .setFooter("SUN BOT")
      .setTimestamp().setDescription(`
 Total Member Size: **${message.guild.memberCount}**
 Total Online Member Size: **${westrabroo}**
 Total Text Channels Size: **${metinkanallari}**
 Total Voice Channels Sİze: **${seskanallari.size}**
 Total Online Member Size: **${
   message.guild.members.cache.filter(o => o.presence.status === "online").size
 }**
 Total İdle Member Size: **${
   message.guild.members.cache.filter(i => i.presence.status === "idle").size
 }**
 Total DND Member Size: **${
   message.guild.members.cache.filter(i => i.presence.status === "dnd").size
 }**
`);
  }
};
