const { MessageEmbed } = require("discord.js");

exports.run = async (client, message) => {
  const channel = message.member.voice.channel;
  if (!channel)
    return message.channel.send(
      "Bạn phải tham gia kênh thoại trước khi sử dụng lệnh này!"
    );
  const queue = message.client.queue.get(message.guild.id);
  var status;
  var np;
  var count = 0;
  if (!queue) status = "Không có gì trong hàng đợi!";
  else
    status = queue.queue
      .map((x) => {
        count += 1;
        return (
          "• " +
          "`" +
          count +
          "." +
          "`" +
          x.name +
          " -Yêu cầu bởi" +
          `<@${x.requested.id}>`
        );
      })
      .join("\n");
  if (!queue) np = status;
  else np = queue.queue[0].name;
  if (queue) thumbnail = queue.queue[0].thumbnail;
  else thumbnail = message.guild.iconURL();
  message.channel.send(
    new MessageEmbed()
      .setAuthor(
        "Hàng đợi nhạc",
        "https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/ee/Jukebox_JE2_BE2.png/revision/latest?cb=20201202075007"
      )
      .setThumbnail(thumbnail)
      .setColor("GREEN")
      .addField("Đang phát", np, true)
      .setDescription(status)
  );
};
