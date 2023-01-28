const { ipcRenderer } = require("electron");
const { findByCategory } = require("../repository/config");

exports.connect = async function () {
  const live = await findByCategory("LIVE");

  if (!live) {
    throw "NO_USERNAME_CONFIGURED";
  }

  try {
    await ipcRenderer.invoke("tiktok:connect", live.username);
  } catch (e) {
    console.error(e);
    throw "UNABLE_TO_CONNECT";
  }
};

exports.disconnect = async function () {
  await ipcRenderer.invoke("tiktok:disconnect");
};

exports.onChat = function (callback) {
  ipcRenderer.on("tiktok:chat", (_, data) => callback(data));
};
