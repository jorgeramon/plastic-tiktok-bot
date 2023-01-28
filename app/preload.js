const { contextBridge } = require("electron");
const { connect } = require("./persistance");
const bridge = require("./bridge");

connect();

contextBridge.exposeInMainWorld("electron", {
  ...bridge,
});
