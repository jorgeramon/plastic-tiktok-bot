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

exports.onCommand = function (callback) {
  ipcRenderer.on("tiktok:command", (_, data) => callback(data));
};

exports.onFollower = function (callback) {
  ipcRenderer.on("tiktok:follower", (_, data) => callback(data));
};

exports.onShare = function (callback) {
  ipcRenderer.on("tiktok:share", (_, data) => callback(data));
};

exports.onGift = function (callback) {
  ipcRenderer.on("tiktok:gift", (_, data) => callback(data));
};

exports.onDisconnect = function (callback) {
  ipcRenderer.on("tiktok:disconnect", (_, data) => callback(data));
};
exports.onStreamEnd = function (callback) {
  ipcRenderer.on("tiktok:end", (_, data) => callback(data));
};
