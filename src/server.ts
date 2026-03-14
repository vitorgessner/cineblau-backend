import express, { type Request, type Response } from 'express';
import config from './config/config.js';

const app = express();
const port = config.port || 8000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, Typescript + Express!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
