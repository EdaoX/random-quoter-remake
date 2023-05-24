import express from "express";
import helmet from 'helmet';
import bodyParser from "body-parser";

import * as Config from './config.js';
import urlCompose from "./middleware/url-compose.js";
import frontendRoutes from "./routes/frontend.js";
import apiRoutes from "./routes/api.js";

const app = express();
app.set('view engine', 'pug');
app.use(express.static('public'));

// Middleware
app.use(helmet(Config.HELMET_OPTIONS));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));
app.use(urlCompose);

// Routes
app.use('/quote', frontendRoutes);
app.use('/api', apiRoutes);

app.listen(Config.LISTEN_PORT, () => {
    console.log(`Server running on port ${Config.LISTEN_PORT}`);
});