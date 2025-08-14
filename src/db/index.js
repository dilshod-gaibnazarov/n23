import { Sequelize } from "sequelize";
import { config } from "dotenv";
config();

const sequelize = new Sequelize(
    String(process.env.PG_DB),
    String(process.env.PG_USER),
    String(process.env.PG_PASS),
    {
        host: String(process.env.PG_HOST),
        dialect: 'postgres',
        port: Number(process.env.PG_PORT),
        logging: false
    }
);

export default sequelize;
