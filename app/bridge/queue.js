const { saveOrUpdate, deleteById, findAll } = require("../repository/queue");

exports.addSong = function (data) {
  return saveOrUpdate(data);
};

exports.removeSong = async function (id) {
  await deleteById(id);
};

exports.getQueueSongs = function () {
  return findAll();
};
