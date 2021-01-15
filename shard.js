const Discord = require("discord.js");
const config = require("./config.json");
const bot = new Discord.Client();
const shard = new Discord.ShardingManager("./bot.js", {
  totalShards: 1,
  token: config.token
});

shard.spawn();

shard.on("launch", shard => {
  console.log(`**${shard.id}** ID'li shard başlatıldı.`);
});

setTimeout(() => {
  shard.broadcastEval("process.exit()");
}, 21600000);
