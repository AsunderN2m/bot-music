const ytdl = require("discord-ytdl-core");
const youtubeScraper = require("yt-search");
const yt = require("ytdl-core");
const { MessageEmbed, Util } = require("discord.js");
const forHumans = require("../utils/forhumans.js");

exports.run = async (client, message, args) => {
  const channel = message.member.voice.channel;

  const error = (err) => message.channel.send(err);
  const send = (content) => message.channel.send(content);
  const setqueue = (id, obj) => message.client.queue.set(id, obj);
  const deletequeue = (id) => message.client.queue.delete(id);
  var song;

  if (!channel) return error("Bạn phải tham gia một kênh thoại để phát nhạc!");

  if (!channel.permissionsFor(message.client.user).has("CONNECT"))
    return error("Tôi không được phép tham gia kênh thoại");

  if (!channel.permissionsFor(message.client.user).has("SPEAK"))
    return error("Tôi không được phép nói bằng kênh thoại");

  const query = args.join(" ");

  if (!query) return error("Bạn không cung cấp tên bài hát để chơi!");

  if (query.includes("www.youtube.com")) {
    try {
      const ytdata = await await yt.getBasicInfo(query);
      if (!ytdata) return error("Không tìm thấy bài hát nào cho url được cung cấp");
      song = {
        name: Util.escapeMarkdown(ytdata.videoDetails.title),
        thumbnail:
          ytdata.player_response.videoDetails.thumbnail.thumbnails[0].url,
        requested: message.author,
        videoId: ytdata.videoDetails.videoId,
        duration: forHumans(ytdata.videoDetails.lengthSeconds),
        url: ytdata.videoDetails.video_url,
        views: ytdata.videoDetails.viewCount,
      };
    } catch (e) {
      console.log(e);
      return error("Đã xảy ra lỗi, vui lòng kiểm tra bảng điều khiển");
    }
  } else {
    try {
      const fetched = await (await youtubeScraper(query)).videos;
      if (fetched.length === 0 || !fetched)
        return error("Tôi không thể tìm thấy bài hát bạn yêu cầu!'");
      const data = fetched[0];
      song = {
        name: Util.escapeMarkdown(data.title),
        thumbnail: data.image,
        requested: message.author,
        videoId: data.videoId,
        duration: data.duration.toString(),
        url: data.url,
        views: data.views,
      };
    } catch (err) {
      console.log(err);
      return error("Đã xảy ra lỗi, vui lòng kiểm tra bảng điều khiển");
    }
  }

  var list = message.client.queue.get(message.guild.id);

  if (list) {
    list.queue.push(song);
    return send(
      new MessageEmbed()
        .setAuthor(
          "Bài hát đã được thêm vào hàng đợi",
          "https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/ee/Jukebox_JE2_BE2.png/revision/latest?cb=20201202075007"
        )
        .setColor("F93CCA")
        .setThumbnail(song.thumbnail)
        .addField("Tên bài hát", song.name, false)
        .addField("Lượt xem", song.views, false)
        .addField("Thời lượng", song.duration, false)
        .addField("Yêu cầu bởi", song.requested.tag, false)
        .setFooter("Vị trí " + list.queue.length + " Trong hàng đợi")
    );
  }

  const structure = {
    channel: message.channel,
    vc: channel,
    volume: 85,
    playing: true,
    queue: [],
    connection: null,
  };

  setqueue(message.guild.id, structure);
  structure.queue.push(song);

  try {
    const join = await channel.join();
    structure.connection = join;
    play(structure.queue[0]);
  } catch (e) {
    console.log(e);
    deletequeue(message.guild.id);
    return error("Tôi không thể tham gia kênh thoại, Vui lòng kiểm tra bảng điều khiển");
  }

  async function play(track) {
    try {
      const data = message.client.queue.get(message.guild.id);
      if (!track) {
        data.channel.send("Hàng đợi trống, Rời khỏi kênh thoại");
        message.guild.me.voice.channel.leave();
        return deletequeue(message.guild.id);
      }
      data.connection.on("disconnect", () => deletequeue(message.guild.id));
      const source = await ytdl(track.url, {
        filter: "audioonly",
        quality: "highestaudio",
        highWaterMark: 1 << 25,
        opusEncoded: true,
      });
      const player = data.connection
        .play(source, { type: "opus" })
        .on("finish", () => {
          var removed = data.queue.shift();
          if(data.loop == true){
            data.queue.push(removed)
          }
          play(data.queue[0]);
        });
      player.setVolumeLogarithmic(data.volume / 100);
      data.channel.send(
        new MessageEmbed()
          .setAuthor(
            "Bắt đầu phát",
            "https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/ee/Jukebox_JE2_BE2.png/revision/latest?cb=20201202075007"
          )
          .setColor("9D5CFF")
          .setThumbnail(track.thumbnail)
          .addField("Tên bài hát", track.name, false)
          .addField("Lượt xem", track.views, false)
          .addField("Thời lượng", track.duration, false)
          .addField("Yêu cầu bởi", track.requested, false)
          .setFooter("Trình phát nhạc trên Youtube")
      );
    } catch (e) {
      console.error(e);
    }
  }
};
