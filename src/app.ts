import express, { type Application } from 'express';
import filmRouter from './routes/filmRoutes.js';
import cors from 'cors';

export const getApp = (): Application => {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(express.static('public'));

    app.use('/api/film', filmRouter);

    return app;
};
