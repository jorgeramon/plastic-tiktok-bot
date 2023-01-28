import { BrowserWindow } from 'electron';
import { WebcastPushConnection } from 'tiktok-live-connector';

let connection: WebcastPushConnection | null = null;

function addListeners(win: BrowserWindow) {
  connection.on('chat', (data) => {
    win.webContents.send('tiktok:chat', data);

    // TODO: Add the possibility to configure this
    if (data.comment.startsWith('!')) {
      win.webContents.send('tiktok:command', data);
    }
  });

  connection.on('gift', (data) => {
    win.webContents.send('tiktok:gift', data);
  });

  connection.on('streamEnd', (data) => {
    win.webContents.send('tiktok:end', data);
  });

  connection.on('disconnected', (data) => {
    win.webContents.send('tiktok:disconnect', data);
  });

  connection.on('follow', (data) => {
    win.webContents.send('tiktok:follow', data);
  });

  connection.on('share', (data) => {
    win.webContents.send('tiktok:share', data);
  });
}

export async function connect(win: BrowserWindow, username: string) {
  connection = new WebcastPushConnection(username);

  try {
    await connection.connect();
    console.log(`Conectado al chat de ${username}`);

    addListeners(win);
  } catch (e) {
    connection = null;
    throw e;
  }
}

export async function disconnect() {
  if (connection !== null) {
    connection.removeAllListeners();
    connection.disconnect();
    connection = null;
  }
}
