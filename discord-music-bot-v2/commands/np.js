const { MessageEmbed } = require("discord.js");

exports.run = async (client, message) => {
  const channel = message.member.voice.channel;
  if (!channel)
    return message.channel.send(
      "Bạn phải tham gia kênh thoại trước khi sử dụng lệnh này!"
    );
  let queue = message.client.queue.get(message.guild.id);
  if (!queue)
    return message.channel.send(
      new MessageEmbed()
        .setColor("RED")
        .setDescription(":x: Không có bài hát nào đang phát trong máy chủ này")
    );
  message.channel.send(
    new MessageEmbed()
      .setAuthor(
        "Đang phát",
        "https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/ee/Jukebox_JE2_BE2.png/revision/latest?cb=20201202075007"
      )
      .setColor("BLUE")
      .setDescription(
        queue.queue[0].name +
          " Yêu cầu bởi: " +
          "<@" +
          queue.queue[0].requested +
          ">"
      )
      .setThumbnail(queue.queue[0].thumbnail)
      .setFooter("Có " + queue.queue.length + " bài hát trong hàng đợi")
  );
};
