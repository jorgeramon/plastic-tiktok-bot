import { BrowserWindow } from 'electron';
import { WebcastPushConnection } from 'tiktok-live-connector';

export class TikTokConnector {
  private liveConnection: WebcastPushConnection;

  constructor(private readonly win: BrowserWindow) {}

  connect(username: string): void {
    this.liveConnection = new WebcastPushConnection(username);

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

  private listenEvents() {
    this.liveConnection.on('chat', (data) => {
      console.log(data);
      this.win.webContents.send('tiktok-chat', data);
    });
  }
}
