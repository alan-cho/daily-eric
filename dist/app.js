require("dotenv").config();
const axios = require("axios").default;
// Test if the API works
axios
    .get(`https://www.googleapis.com/youtube/v3/videos?id=Pz1Hl7NHlOU&key=${process.env.API_KEY}`)
    .then(function (response) {
    console.log(response);
});
//# sourceMappingURL=app.js.map