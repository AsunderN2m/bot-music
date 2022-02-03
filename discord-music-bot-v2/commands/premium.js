const { MessageEmbed } = require("discord.js");

exports.run = async (client, message) => {
  message.channel.send(
    new MessageEmbed()
      .setAuthor(
        "Jukebox premium",
        "https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/ee/Jukebox_JE2_BE2.png/revision/latest?cb=20201202075007"
      )
      .setColor("BLUE")
      .setTimestamp()
      .setDescription(
        "https://asundern2m.github.io/premium/"
         
      )
      

         
     );
};
