import Sequelize from 'sequelize';
import dbConfig from '../config/config.js';
import userModel from './user.js';

const sequelize = new Sequelize(dbConfig.development);
const db = {};

db.User = userModel(sequelize, Sequelize.DataTypes);
db.sequelize = sequelize;

export { sequelize };
export default db;