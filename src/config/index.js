import { config } from 'dotenv';
import { serviceSchema } from './settings-schema';

config();

const variables = { ...process.env };
const { error, value: envVars } = serviceSchema.validate(variables, {
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
  regresApiUrl: envVars.REGRES_API_URL,
  affluentUserName: envVars.AFFLUENT_USER_NAME,
  affluentUserPassword: envVars.AFFLUENT_USER_PASSWORD
};
