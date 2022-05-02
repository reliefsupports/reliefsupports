import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';

import helmet from 'helmet';
import xssClean from 'xss-clean';

import authRoutes from 'routes/auth';
import apiRoutes from 'routes/api';

import logger from 'utils/logger';

import { mongoUrl, port } from 'config';

mongoose
  .connect(mongoUrl, { useNewUrlParser: true })
  .then(() => {
    const app = express();

    app.use(cors());
    app.use(helmet());
    app.use(xssClean());

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(morgan('dev'));

    app.use('/auth', authRoutes);
    app.use('/api', apiRoutes);

    app.listen(port, () => {
      logger.log(`Server is started on ${port}`);
    });
  })
  .catch((error) => {
    logger.error(error);
  });
