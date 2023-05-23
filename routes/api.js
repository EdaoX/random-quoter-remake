import express from 'express';
import quoteManager from '../core/managers/test-json-manager.js'

const apiRoutes = express();

apiRoutes.get('/quote/random', async (req, res) => {
    const hideNsfw = req.query.nsfw === 'false';
    res.setHeader('Content-Type', 'application/json');
    try {
        const quote = await quoteManager.getRandomQuote(hideNsfw);

        if(!quote) {
            res.send("Quote not found");
            return;
        }

        res.send(JSON.stringify(quote));
    } catch (error) {
        res.send(JSON.stringify({error : error.toString()}));
    }
});

apiRoutes.get('/quote/:uuid(\\w{13}|\\w{18})', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    try {
        const quote = await quoteManager.getQuote(req.params.uuid);

        if(!quote) {
            res.send("Quote not found");
            return;
        }

        res.send(JSON.stringify(quote));
    } catch (error) {
        res.send(JSON.stringify({error : error.toString()}));
    }
});

export default apiRoutes;