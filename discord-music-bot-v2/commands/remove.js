const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {
  const channel = message.member.voice.channel;
  if (!channel)
    return message.channel.send(
      "Bạn phải tham gia kênh thoại trước khi sử dụng lệnh này!"
    );
  if (!args[0])
    return message.channel.send(
      new MessageEmbed()
        .setDescription(":x: Không có số bài hát được cung cấp")
        .setColor("RED")
    );
  if (isNaN(args[0]))
    return message.channel.send(
      new MessageEmbed()
        .setDescription(":x: **Args phải là số  [Example: -remove 2]**")
        .setColor("RED")
    );
  let queue = message.client.queue.get(message.guild.id);
  if (args[0] == 1)
    return message.channel.send(
      new MessageEmbed()
        .setDescription(
          ":x: **Không thể xóa bài hát hiện đang phát, hãy sử dụng lệnh bỏ qua**"
        )
        .setColor("RED")
    );
  if (queue.queue.length == 1)
    return message.channel.send(
      new MessageEmbed()
        .setDescription(
          ":x: **Không thể xóa khi chỉ phát một bài hát, Sử dụng lệnh dừng**"
        )
        .setColor("RED")
    );
  if (args[0] > queue.queue.length)
    return message.channel.send(
      new MessageEmbed()
        .setDescription(":x: **Hàng đợi không có nhiều bài hát như vậy**")
        .setColor("RED")
    );
  if (!queue)
    return message.channel.send(
      new MessageEmbed()
        .setDescription(":x: **Không có bài hát nào đang phát trong máy chủ này**")
        .setColor("RED")
    );
  var name = queue.queue[args[0] - 1].name;
  queue.queue.splice(args[0] - 1);
  return message.channel.send(
    new MessageEmbed()
      .setDescription(
        "**Loại bỏ" + " " + name + " " + "từ hàng đợi :white_check_mark: **"
      )
      .setTimestamp()
      .setColor("BLUE")
  );
};
