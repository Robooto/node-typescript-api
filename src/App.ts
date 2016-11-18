import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

import HeroRouter from './routes/HeroRouter';

// Creates and configures an express js web server
class App {

    // ref to express instance
    public express: express.Application;

    //Run configuration methods on express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    // Configure Express middleware
    private middleware(): void {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {
        let router = express.Router();

        router.get('/', (req, res, next) => {
            res.json({
                message: 'Hello world!'
            });
        });
        this.express.use('/', router);
        this.express.use('/api/v1/heroes', HeroRouter);
    }
}

export default new App().express;