const { MessageEmbed } = require("discord.js");

exports.run = async (client, message) => {
  const queue = message.client.queue.get(message.guild.id);

  if (!queue)
    return message.channel.send(
      ":x: Không có bài hát nào đang phát trong máy chủ này"
    );

  queue.loop = !queue.loop;
  message.channel.send(
    new MessageEmbed()
      .setAuthor(
        "Master Loop Contrller",
        "https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/ee/Jukebox_JE2_BE2.png/revision/latest?cb=20201202075007"
      )
      .setColor("BLUE")
      .setTimestamp()
      .setDescription(
        "**Loop is" +
          (queue.loop == true ? " Đã bật " : " Đã tắt ") +
        "cho bài hát hiện tại :white_check_mark: **"
      )
  );
};
