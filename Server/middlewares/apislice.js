const axios = require("axios")
const store = require("../../frontend/src/redux/store")

const api = axios.create({
    baseURL: "https//localhost:3000"
});

api.interceptors.request.use((config))