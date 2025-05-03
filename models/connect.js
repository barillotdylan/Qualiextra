import "dotenv/config";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.PG_URL, {
	dialect: "postgres",
	define: {
		timestamps: true,
		createdAt: "created_at",
		updatedAt: "updated_at",
	},
});

// Test de connexion (pour vérifier si tout se passe bien)
try {
	await sequelize.authenticate();
	console.log("Connection has been established successfully.");
} catch (error) {
	console.error("Unable to connect to the database:", error);
}

sequelize
	.sync({ force: true })
	.then(() => {
		console.log("La base de données a été réinitialisée et synchronisée");
	})
	.catch((err) => {
		console.error(
			"Erreur lors de la réinitialisation de la base de données:",
			err,
		);
	});

export default sequelize;
