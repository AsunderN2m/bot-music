const { MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder");

exports.run = async (client, message, args) => {
  const queue = message.client.queue.get(message.guild.id);
  if (!queue)
    return message.channel
      .send("Không có gì đang phát.")
      .catch(console.error);

  let lyrics = null;

  try {
    lyrics = await lyricsFinder(queue.queue[0].name, "");
    if (!lyrics) lyrics = `Không tìm thấy lời bài hát nào cho ${queue.queue[0].name} :x:`;
  } catch (error) {
    lyrics = `Không tìm thấy lời bài hát nào cho ${queue.queue[0].name} :x:`;
  }

  let lyricsEmbed = new MessageEmbed()
    .setAuthor(
      `Lời bài hát cho ${queue.queue[0].name}`,
      "https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/ee/Jukebox_JE2_BE2.png/revision/latest?cb=20201202075007"
    )
    .setDescription(lyrics)
    .setColor("BLUE")
    .setTimestamp();

  if (lyricsEmbed.description.length >= 2048)
    lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
  return message.channel.send(lyricsEmbed).catch(console.error);
};
