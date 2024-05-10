var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
require("dotenv").config();
const axios = require("axios").default;
// Test if the API works
// axios
//   .get(
//     `https://www.googleapis.com/youtube/v3/videos?id=Pz1Hl7NHlOU&key=${process.env.API_KEY}`
//   )
//   .then(function (response) {
//     console.log(response.data);
//   });
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
function getRecentVideo(channelId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios.get("https://www.googleapis.com/youtube/v3/search", {
                params: {
                    part: "snippet",
                    channelId: channelId,
                    key: process.env.API_KEY,
                    order: "date",
                    type: "video",
                    maxResults: 1,
                },
            });
            const videoId = response.data.items[0].id.videoId;
            console.log(videoId);
        }
        catch (e) {
            console.log(e);
            return null;
        }
    });
}
getChannelId("esselleanderic").then((channelId) => getRecentVideo(channelId));
//# sourceMappingURL=app.js.map