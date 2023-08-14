// production Mode Properties
const production = {
  name: "production",
  user: process.env.MONGO_USERNAME,
  password: process.env.MONGO_PASSWORD,
  JWT_key: process.env.JWT_KEY,
};
module.exports = production;
