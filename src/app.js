import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import * as expressValidation from 'express-validation';

import path from 'path';
import { logger } from './utils';
import indexRouter from './routes';

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());

app.get('/', (req, res) => {
  res.redirect('/index.html');
});

app.use('/v1', indexRouter);

app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  if (err instanceof expressValidation.ValidationError) {
    const errorMessage = err.errors
      .map((error) => error.messages.reduce(
        (acc, message) => `${message} in ${error.location}. ${acc}`,
        '',
      ),)
      .join('');
    logger.error(errorMessage);
    return res.status(400).json({ errorCode: 'InputValidationError' });
  }

  res.status(err.status || 500).json({ errorCode: 'INTERNAL_SERVER_ERROR' });
});

module.exports = app;
