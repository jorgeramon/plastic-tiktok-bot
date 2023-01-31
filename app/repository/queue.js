const { QueueModel } = require("../persistance");

exports.saveOrUpdate = async function (data) {
  const { song, username, nickname } = data;
  const current = await QueueModel.findOne({ where: { username } });

  if (!current) {
    const result = await QueueModel.create({ song, username, nickname });
    return ["added", result.toJSON()];
  } else {
    await QueueModel.update({ song }, { where: { id: current.id } });
    return ["updated", { ...current.toJSON(), song }];
  }
};

exports.findAll = async function () {
  const records = await QueueModel.findAll({ where: { selected: false } });
  return records.map((r) => r.toJSON());
};

exports.findAllSelected = async function () {
  const records = await QueueModel.findAll({ where: { selected: true } });
  return records.map((r) => r.toJSON());
};

exports.deleteById = async function (id) {
  await QueueModel.destroy({ where: { id } });
};

exports.select = async function (id) {
  await QueueModel.update({ selected: true }, { where: { id } });
};
