const { saveOrUpdate, findByCategory } = require("../repository/config");

exports.saveUsername = async function (username) {
  await saveOrUpdate("LIVE", "username", username);
};

exports.getLiveConfiguration = function () {
  return findByCategory("LIVE");
};
