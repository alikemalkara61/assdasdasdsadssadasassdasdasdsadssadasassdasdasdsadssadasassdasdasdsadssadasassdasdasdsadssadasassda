const chalk = require("chalk");
const moment = require("moment");
const Discord = require("discord.js");
const ayarlar = require("../config.json");
var prefix = ayarlar.prefix;

module.exports = client => {
  setInterval(function() {}, 8000);
  var msgArray = ["SUN BOT", "!yardım"];

  setInterval(() => {
    var rastgeleOyun = Math.floor(Math.random() * msgArray.length);
    client.user.setActivity(`${msgArray[rastgeleOyun]}`, {
      type: "STREAMING",
      url: "https://www.twitch.tv/"
    });
  }, 5000);
  console.log(`SUN BOT başarıyla giriş yaptı.`);
};
