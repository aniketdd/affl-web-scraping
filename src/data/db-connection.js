import Sequelize from 'sequelize';
import settings from '../config';

const {
  dbHost, dbDatabase, dbUser, dbPassword
} = settings;

export const databaseService = new Sequelize(dbDatabase, dbUser, dbPassword, {
  host: dbHost,
  dialect: 'mysql',
  logging: console.log,
  operatorsAliases: Sequelize.Op,
  define: {
    freezeTableName: true,
  },
});
