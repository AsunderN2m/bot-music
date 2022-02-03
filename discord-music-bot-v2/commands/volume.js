const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {
  const channel = message.member.voice.channel;
  if (!channel)
    return message.channel.send(
      "Bạn phải Tham gia kênh thoại trước khi sử dụng lệnh này!"
    );

  let queue = message.client.queue.get(message.guild.id);

  if (!args[0])
    return message.channel.send(
      new MessageEmbed()
        .setAuthor(
          "Bộ điều khiển âm lượng chính",
          "https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/ee/Jukebox_JE2_BE2.png/revision/latest?cb=20201202075007"
        )
        .setColor("BLUE")
        .setDescription("**Âm lượng hiện tại là " + queue.volume + " **")
    );

  if (args[0] > 100)
    return message.channel.send(
      new MessageEmbed()
        .setAuthor(
          "Lỗi âm lượng chính",
          "https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/ee/Jukebox_JE2_BE2.png/revision/latest?cb=20201202075007"
        )
        .setColor("RED")
        .setDescription("**Âm lượng không được vượt quá 100 :x: **")
    );

  queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
  queue.volume = args[0];
  message.channel.send(
    new MessageEmbed()
      .setAuthor(
        "Bộ điều khiển âm lượng chính",
        "https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/ee/Jukebox_JE2_BE2.png/revision/latest?cb=20201202075007"
      )
      .setColor("BLUE")
      .setDescription("**Âm lượng được đặt thành" + args[0] + " :white_check_mark: **")
  );
};
