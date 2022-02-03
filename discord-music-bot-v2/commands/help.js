const { MessageEmbed } = require("discord.js");

exports.run = async (client, message) => {
  const commands = `connect\`\` - tham gia kênh thoại mà bạn đang tham gia
   disconnect\`\` - rời khỏi kênh thoại mà bạn đang tham gia
   play <Song Name or url>\`\` - phát các bài hát từ youtube
   pause\`\` - tạm dừng các bài hát hiện đang phát trong máy chủ
   resume\`\` - tiếp tục các bài hát bị tạm dừng trong máy chủ
   queue\`\` - hiển thị hàng đợi bài hát của máy chủ
   skip\`\` - bỏ qua bài hát tiếp theo trong hàng đợi
   skipto <Target number>\`\` - Nhiều lần bỏ qua cho đến khi đạt được mục tiêu
   stop\`\` - dừng bài hát và xóa hàng đợi
   volume <volume count or none>\`\` - see or adjust volume of songs
   np\`\` - xem bây giờ đang phát bài hát
   lyrics\`\` - lấy lời bài hát hiện tại
   shuffle\`\` - xáo trộn và sắp xếp ngẫu nhiên hàng đợi
   invite\`\` - lấy liên kết mời cho bot
   loop\`\` - bật / tắt vòng lặp cho bài hát hiện đang phát
   remove <Target number>\`\` - xóa một bài hát khỏi hàng đợi
   info\`\` - để xem thông tin bot
   premium\`\` - để nhận premium miễn phí
   help\`\` - để xem lệnh này`
    ;

  const revised = commands
    .split("\n")
    .map((x) => "• " + "``" + client.config.prefix + x.trim())
    .join("\n");

  message.channel.send(
    new MessageEmbed()
      .setAuthor(
        "Jukebox help",
        "https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/ee/Jukebox_JE2_BE2.png/revision/latest?cb=20201202075007"
      )
      .setColor("FFFBFB")
      .setTimestamp()
      .setDescription(revised)
  );
};
