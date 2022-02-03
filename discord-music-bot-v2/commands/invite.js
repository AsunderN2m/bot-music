const { MessageEmbed } = require("discord.js");

exports.run = async (client, message) => {
  message.channel.send(
    new MessageEmbed()
      .setAuthor(
        "Jukebox",
        "https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/ee/Jukebox_JE2_BE2.png/revision/latest?cb=20201202075007"
      )
      .setColor("BLUE")
      .setTimestamp()
      .setDescription(
        "https://discord.com/oauth2/authorize?client_id=" +
          client.user.id +
          "&permissions=" +
          "37080128" +
          "&scope=" +
          "bot"
      )
      

         
     );
};
