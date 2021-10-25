import { BASE_API_URL } from "./Common";

const axios = require('axios');

const DataService = {
    Init: function () {
        // Any application initialization logic comes here
    },
    GetVideosList: async function (obj) {
        return await axios.get(BASE_API_URL + "/get_videos_list");
    },
    Text2Image: async function (obj) {
        return await axios.post(BASE_API_URL + "/text2image", obj);
    },
}

export default DataService;