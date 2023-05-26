import { Sequelize } from "sequelize";
import configs from "../configs/configs.js"
const sequelize = new Sequelize(configs.db_database, configs.db_user, configs.db_pass, {
    host: configs.db_host,
    port: configs.db_port,
    dialect: configs.db_dialect
})


export default sequelize