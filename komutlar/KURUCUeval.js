const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("ms");
const config = require("../config.json");
const ayarlar = require("../config.json");
exports.run = (client, message, args) => {
  if (!ayarlar.sahip.includes(message.author.id)) {
    const embed = new Discord.MessageEmbed()
      .setDescription(` Bu komutu sadece **Sahibim** kullanabilir!`)
      .setColor("RED");
    message.channel.send({ embed });
    return;
  }
  const commonTags = require("common-tags");
  const util = require("util");
  let { MessageEmbed } = require("discord.js");

  function cleanText(text) {
    if (typeof text === "string") {
      return text
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203));
    } else {
      return text;
    }
  }

  try {
    let executedIn = process.hrtime();
    let result = eval(args.join(" "));
    result = cleanText(result);
    result = util.inspect(result);
    executedIn = process.hrtime(executedIn);
    executedIn =
      executedIn[0] * Math.pow(10, 3) + executedIn[1] / Math.pow(10, 6);

    let embed = new MessageEmbed();
    embed.setColor("GREEN");
    embed.setDescription(commonTags.stripIndents`
      ${executedIn.toFixed(3)} milisaniyede çalıştırıldı
      \`\`\`js
        ${result}\`\`\`
    `);
    message.channel.send({ embed });
  } catch (error) {
    let embed = new MessageEmbed();
    embed.setDescription(commonTags.stripIndents`
       Hata Çıktı 
      \`\`\`js
      ${cleanText(error)}\`\`\`
    `);
    embed.setColor("GREEN");
    message.channel.send({ embed });
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["eval"],
  permLevel: 0
};

exports.help = {
  name: "eval",
  description: "kanal-koruma",
  usage: "kanal-koruma"
};
