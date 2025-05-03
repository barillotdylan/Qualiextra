import sequelize from "./connect.js";
import { Sequelize, DataTypes, Model } from "sequelize";

class User extends Model {}

User.init({
	name: {
		type: DataTypes.TEXT,
		allowNull: false,
		unique: true
	},
	email: {
		type: DataTypes.TEXT,
		allowNull: false,
		unique: true
	},
	password: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
  isVerified: {
    type: DataTypes.BOOLEAN,
    },
},
{
	sequelize,
	tableName: "user",
});

export default User;
