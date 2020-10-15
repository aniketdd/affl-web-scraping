import { config } from 'dotenv';
import joi from 'joi';
import { serviceSchema } from './settings-schema';

config();

const variables = { ...process.env };
const { error, value: envVars } = joi.validate(variables, serviceSchema, {
  stripUnknown: true,
});

if (error) {
  throw new Error(`Environment setup error: ${error.message}`);
}

export default {
  dbHost: envVars.DB_HOST,
  dbDatabase: envVars.DB_DATABASE,
  dbUser: envVars.DB_USER,
  dbPassword: envVars.DB_PASSWORD,
  nodeEnvironment: envVars.NODE_ENV,
  projectNmae: envVars.PROJECT_NAME,
};
