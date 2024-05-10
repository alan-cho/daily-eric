import "dotenv/config";
import axios from "axios";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/getVideo", async (req, res) => {
  const channelId = await getChannelId("esselleanderic");
  const videoData = await getRecentVideo(channelId);
  console.log("Video data: ", videoData);
  res.json(videoData);
});

app.listen(3000, () => {
  console.log("Server is running on port: 3000");
});

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
    const videoData = response.data.items[0];
    return videoData;
  } catch (e) {
    console.log("Error Occurred: ", e);
    return null;
  }
}
