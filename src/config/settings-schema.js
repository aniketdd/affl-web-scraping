import Joi from 'joi';

export const serviceSchema = Joi.object()
  .keys({
    PROJECT_NAME: Joi.string().required(),
    NODE_ENV: Joi.string()
      .allow('development', 'production')
      .default('development'),

    DB_HOST: Joi.string().required(),
    DB_DATABASE: Joi.string().required(),
    DB_USER: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    REGRES_API_URL: Joi.string().required(),
    AFFLUENT_USER_NAME: Joi.string().required(),
    AFFLUENT_USER_PASSWORD: Joi.string().required()

  })
  .unknown()
  .required();
