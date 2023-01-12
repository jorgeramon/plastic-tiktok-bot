"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TikTokConnector = void 0;
const tiktok_live_connector_1 = require("tiktok-live-connector");
class TikTokConnector {
    constructor(win) {
        this.win = win;
    }
    connect(username) {
        this.liveConnection = new tiktok_live_connector_1.WebcastPushConnection(username);
        this.listenEvents();
        this.liveConnection
            .connect()
            .then(() => {
            console.log(`Connected to ${username} chat`);
        })
            .catch((err) => {
            console.error(`Error connecting to ${username} chat`);
            console.error(err);
        });
    }
    listenEvents() {
        this.liveConnection.on('chat', (data) => {
            console.log(data);
            this.win.webContents.send('tiktok-chat', data);
        });
    }
}
exports.TikTokConnector = TikTokConnector;
//# sourceMappingURL=index.js.map