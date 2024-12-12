import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

import whatsappRoutes from '../routes/whatsapp.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

class Server {
    constructor() {
        this.port = process.env.PORT;
        this.app = express();
        this.server = http.createServer(this.app);
        this.paths = {
            whatsapp: '/api/whatsapp'
        };

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(express.static('/public'));
        this.app.use(express.json());
        this.app.use(bodyParser.json());
        this.app.use(cors());
    }

    routes() {
        this.app.use(this.paths.whatsapp, whatsappRoutes);
        
        this.app.get('/*', (req, res) => {
            res.sendFile(path.join(__dirname, '../public', 'index.html'));
        });
    }

    start() {
        this.server.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
};

export default Server;