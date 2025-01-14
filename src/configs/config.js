import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') dotenv.config();

const conf = {
  sequelize: {
    production: {
      username: process.env.GPC_USER,
      password: process.env.GPC_PASSWORD,
      host: `/cloudsql/${process.env.GPC_INSTANCE_CONNECTION_NAME}`,
      database: process.env.GPC_DB,
      dialect: 'postgres',
      logging: false,
      dialectOptions: {
        charset: 'utf8mb4'
      },
      pool: {
        max: 100,
        min: 0,
        idle: 20000,
        acquire: 120000
      }
    },
    development: {
      username: process.env.GPC_USER,
      password: process.env.GPC_PASSWORD,
      host: process.env.GPC_HOST,
      database: process.env.GPC_DEV_DB,
      dialect: 'postgres',
      logging: false,
      dialectOptions: {
        charset: 'utf8mb4'
      },
      pool: {
        max: 100,
        min: 0,
        idle: 20000,
        acquire: 120000
      }
    },
    staging: {
      username: process.env.GPC_USER,
      password: process.env.GPC_PASSWORD,
      host: `/cloudsql/${process.env.GPC_INSTANCE_CONNECTION_NAME}`,
      database: process.env.GPC_STAGE_DB,
      dialect: 'postgres',
      logging: false,
      dialectOptions: {
        charset: 'utf8mb4'
      },
      pool: {
        max: 100,
        min: 0,
        idle: 20000,
        acquire: 120000
      }
    }
  }
};

export default conf;