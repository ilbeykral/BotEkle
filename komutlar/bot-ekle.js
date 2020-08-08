const Discord = require('discord.js');
const data = require('quick.db');
const ayarlar = require("/app/ayarlar.json");

exports.run = async (client, message, args) => {

let test_kanal = client.channels.get("") //Sadece yetkililerin gördüğü bot log kanalının ID yani kimlik numarasını tırnak arasına yazın.
let bot_log = client.channels.get("") //Herkesin görebildiği #bot-log kanalının ID yani kimlik numarasını tırnak arasına yazın.

let bot_id = args[0]
let bot_prefix = args[1]

if(!bot_id) return message.channel.send('Botunuzun ID numarasını belirtmeyi unuttunuz.')
if(isNaN(bot_id)) return message.channel.send('Botunuzun ID numarası sadece rakamdan oluşmalı.')
if(bot_id.length !== 18) return message.channel.send(`Botunuzun kimliği 18 rakamdan olmuşması gerek.`)

let stark_code = data.get(`${bot_id}.kontrol`)
if(stark_code) return message.channel.send('Botunuz için zaten daha önce başvuru yapılmış.')

if(!bot_prefix) return message.channel.send('Botunuzun prefixini belirtmeyi unuttunuz.')
if(bot_prefix.length > 5) return message.channel.send(`Botunuzun prefixi en fazla 5 karakterden olmuşması gerek.`)

  let savc_ = data.get(`${bot_id}.kontrol`)
  if(savc_) return message.channel.send('Bot için zaten daha önce başvurulmuş.')
  
message.channel.send(`${message.author} başvurunuz başarıyla yapıldı. Yetkililerimiz ilgilenecektir.`)
data.set(`${bot_id}.kontrol`, bot_id)
data.set(`${bot_id}.prefix`, bot_prefix)
data.set(`${bot_id}.sahip`, message.author.id)

test_kanal.send(
new Discord.RichEmbed()
.setTitle('Yeni Başvurumuz Mevcut.')
.addField(`Başvuruyu Yapan:`, `\`${message.author.tag}(${message.author.id})\``)
.addField(`Botun Davet Linki:`, `[Botu Eklemek İçin Tıkla!](https://discordapp.com/oauth2/authorize?client_id=${bot_id}&scope=bot&permissions=0)`)
.addField(`Botun Kimliği:`, `\`${bot_id}\``, true)
.addField(`Botun Prefixi:`, `\`${bot_prefix}\``, true)
.setThumbnail(message.author.avatarURL)
.setFooter('Stark Code')
.setTimestamp()
	)
bot_log.send(`${message.author} adlı kullanıcı **${bot_id}** kimliğine sahip botu ile başvuru yaptı.`)
data.set(`${bot_id}.durum`, "Kontrol Edilmedi")
}; 
exports.conf = {
  guildOnly : false,
  enabled : true,
  aliases : ['botekle', 'botadd', 'bot-add'],
  permLevel : 0,
}
exports.help = {
  name : "bot-ekle"
}