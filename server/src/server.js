import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import xssClean from 'xss-clean';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { mongoUrl, port } from 'config';
import logger from './lib/logger';
import { LOGGER } from './lib/constants';

import requestRoutes from './modules/requests/routes/requests-routes';

mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.log(LOGGER.INFO, `database connected`);

    const app = express();

    app.use(cors());
    app.use(helmet());
    app.use(xssClean());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(morgan('dev'));
    app.use(cookieParser());
    app.disable('x-powered-by');

    const BASE_PATH = `/api/v1`;

    app.use(`${BASE_PATH}/requests`, requestRoutes);

    app.listen(port, () => {
      logger.log(LOGGER.INFO, `server is started on port ${port}`);
    });

    app.use((req, res, next) => {
      next(createError(404));
    });

    app.use((err, req, res) => {
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};
      res.status(err.status || 500);
      res.render('error');
    });
  })
  .catch((error) => {
    logger.error(LOGGER.ERROR, error);
  });
