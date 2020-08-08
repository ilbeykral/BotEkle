const Discord = require('discord.js');
const data = require('quick.db');
const ayarlar = require("/app/ayarlar.json");

exports.run = async (client, message, args) => {

if(!message.member.roles.has('Bot Kontrolcü Rolünün ID')) return message.channel.send(`Bu komutu kullanabilmek için yeterli yetkiye sahip değilsiniz.`)

let bot_log = client.channels.get("") //Herkesin görebildiği #bot-log kanalının ID yani kimlik numarasını tırnak arasına yazın.

let bot_stark = message.mentions.users.first() || client.users.get(args[0])
if(!bot_stark) return message.channel.send(`Onaylayacağınız botu etiketlemeyi veya kimliğini belirtmeyi unuttunuz.`)

if(!bot_stark.bot) return message.channel.send(`Etiketlediğiniz veya kimliğini belirtlediğiniz bir bot değil.`)

let stark_code = data.get(`${bot_stark.id}.kontrol`)
if(!stark_code) return message.channel.send(`Belirttiğiniz bot, sistemde bulunmuyor.`)
  
let savc_ = data.get(`${bot_stark.id}.durum`)
if(savc_ === "Onaylanmış") return message.channel.send('Bot zaten onaylanmış.')
  
let sahip = client.users.get(data.get(`${bot_stark.id}.sahip`))

message.channel.send(`Bot başarıyla onaylandı!`)
bot_log.send(`${sahip} adlı kullanıcının **${stark_code}** kimliğine sahip botu **${message.author.tag}** tarafından onaylandı!`)
data.set(`${bot_stark.id}.durum`, "Onaylanmış")
}; 
exports.conf = {
  guildOnly : false,
  enabled : true,
  aliases : ['onayla'],
  permLevel : 0,
}
exports.help = {
  name : "onay"
}