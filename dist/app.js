var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import "dotenv/config";
import axios from "axios";
function getChannelId(channelName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios.get("https://www.googleapis.com/youtube/v3/search", {
                params: {
                    part: "snippet",
                    q: channelName,
                    type: "channel",
                    key: process.env.API_KEY,
                },
            });
            const channelId = response.data.items[0].id.channelId;
            return channelId;
        }
        catch (e) {
            console.log("Error Occurred: ", e);
            return null;
        }
    });
}
function getRecentVideoId(channelId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios.get("https://www.googleapis.com/youtube/v3/search", {
                params: {
                    part: "snippet",
                    channelId: channelId,
                    order: "date",
                    type: "video",
                    maxResults: 1,
                    key: process.env.API_KEY,
                },
            });
            const videoId = response.data.items[0].id.videoId;
            return videoId;
        }
        catch (e) {
            console.log("Error Occurred: ", e);
            return null;
        }
    });
}
function buildVideoPlayer() {
    return __awaiter(this, void 0, void 0, function* () {
        const channelId = yield getChannelId("esselleanderic");
        const videoId = yield getRecentVideoId(channelId);
        const videoPlayer = document.createElement("iframe");
        videoPlayer.src = `https://www.youtube.com/embed/${videoId}`;
        document.getElementById("player").appendChild(videoPlayer);
    });
}
document.addEventListener("DOMContentLoaded", buildVideoPlayer);
//# sourceMappingURL=app.js.map