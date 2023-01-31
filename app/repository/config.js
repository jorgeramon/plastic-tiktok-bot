const { ConfigModel } = require("../persistance");

exports.saveOrUpdate = async function (category, field, value) {
  const config = await ConfigModel.findOne({ where: { category, field } });

  if (config === null) {
    await ConfigModel.create({ category, field, value });
  } else {
    await ConfigModel.update({ value }, { where: { category, field } });
  }
};

exports.findByCategory = async function (category) {
  const records = await ConfigModel.findAll({ where: { category } });
  return records.reduce((acc, val) => ({ ...acc, [val.field]: val.value }), {});
};

exports.findOneByCategoryAndField = async function (category, field) {
  const config = await ConfigModel.findOne({ where: { category, field } });
  return config?.toJSON();
};
