const { MessageEmbed } = require("discord.js");

exports.run = async (client, message) => {
  const channel = message.member.voice.channel;
  if (!channel)
    return message.channel.send(
      "Bạn phải Tham gia kênh thoại trước khi sử dụng lệnh này!"
    );
  let queue = message.client.queue.get(message.guild.id);
  if (!queue)
    return message.channel.send(
      new MessageEmbed()
        .setDescription(":x: Không có bài hát nào đang phát trong máy chủ này")
        .setColor("RED")
    );
  queue.connection.dispatcher.end('skipped');
  return message.channel.send(
    new MessageEmbed()
      .setDescription("**Đã bỏ qua bản nhạc :white_check_mark: **")
      .setColor("BLUE")
  );
};
