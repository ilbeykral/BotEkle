const Discord = require('discord.js');
const data = require('quick.db');
const ayarlar = require("/app/ayarlar.json");

exports.run = async (client, message, args) => {

let bot_stark = message.mentions.users.first() || client.users.get(args[0])
if(!bot_stark) return message.channel.send(`Bilgi alacağınız botu etiketlemeyi veya kimliğini belirtmeyi unuttunuz.`)

if(!bot_stark.bot) return message.channel.send(`Etiketlediğiniz veya kimliğini belirtlediğiniz bir bot değil.`)

let stark_code = data.get(`${bot_stark.id}.kontrol`)
if(!stark_code) return message.channel.send(`Belirttiğiniz bot, sistemde bulunmuyor.`)


let durum = data.get(`${bot_stark.id}.durum`)
let prefix = data.get(`${bot_stark.id}.prefix`)
let sahip = client.users.get(data.get(`${bot_stark.id}.sahip`))
let sertifika
if(data.get(`${bot_stark.id}.sertifika`)) {
	sertifika = "Var"
} else {
	sertifika = "Yok"
}
message.channel.send(
new Discord.RichEmbed()
.setTitle(`${bot_stark.tag} - Bilgilendirme`)
.addField('» Sahip:', `\`${sahip.tag}(${sahip.id})\``)
.addField('» Prefix:', `${prefix}`, true)
.addField('» Kimlik:', `${bot_stark.id}`, true)
.addField('» Durum:', `${durum}.`)
.addField('» Sertifika:', `${sertifika}.`)
.setThumbnail(bot_stark.avatarURL)
.setFooter(message.guild.name)
.setTimestamp()
)

}; 
exports.conf = {
  guildOnly : false,
  enabled : true,
  aliases : ['botbilgi', 'botinfo', 'bot-info'],
  permLevel : 0,
}
exports.help = {
  name : "bot-bilgi"
}