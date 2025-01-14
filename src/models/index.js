import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';
import global from '../configs/config.js';

const db = {};

const basename = path.basename(__filename);
let config;
if (process.env.NODE_ENV === 'production') {
  config = global.sequelize.production;
} else if (process.env.NODE_ENV === 'staging') {
  config = global.sequelize.staging;
} else if (process.env.NODE_ENV === 'development') {
  config = global.sequelize.development;
}
const sequelize = new Sequelize(config);

fs.readdirSync(__dirname)
  .filter(
    file =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.op = Sequelize.Op;
db.query = Sequelize.query;

export default db;