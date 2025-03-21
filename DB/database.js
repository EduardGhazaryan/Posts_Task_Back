import { configDotenv } from 'dotenv';
import { Sequelize } from 'sequelize';

const dotenv = configDotenv()

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false,
});

sequelize
  .authenticate()
  .then(() => console.log('Database connected'))
  .catch((error) => console.error('Database connection failed:', error));

export default sequelize
