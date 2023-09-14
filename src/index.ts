import express , { Application } from 'express';
import cors from 'cors';

import { apiRouter } from "@routes/index";
import corsConfig from "@config/cors";

const App= async(app: Application) => {
    // app.use(cors(corsConfig));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true}))
    app.use(express.json());
    app.use('/api', apiRouter);
    return app;
}

const StartServer = async () => {
    const app = express();
    const PORT=8080
    await App(app);
    app.listen(PORT, () => {
        console.log(`Listening to port  http://127.0.0.1:${PORT}`);
    })
}

StartServer();

