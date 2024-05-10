require("dotenv").config();
const axios = require("axios").default;

async function getChannelId(channelName: string): Promise<string | null> {
  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q: channelName,
          type: "channel",
          key: process.env.API_KEY,
        },
      }
    );
    const channelId = response.data.items[0].id.channelId;
    return channelId;
  } catch (e) {
    console.log("Error Occurred: ", e);
    return null;
  }
}

async function getRecentVideo(channelId: string): Promise<string | null> {
  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          channelId: channelId,
          order: "date",
          type: "video",
          maxResults: 1,
          key: process.env.API_KEY,
        },
      }
    );
    const videoId = response.data.items[0].id.videoId;
    return videoId;
  } catch (e) {
    console.log("Error Occurred: ", e);
    return null;
  }
}

getChannelId("esselleanderic").then((channelId) => getRecentVideo(channelId));
