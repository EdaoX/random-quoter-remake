import express from 'express';
import path from 'path';
import QuoteManager from '../core/quote-manager.js';
import JsonRepository from '../core/repositories/json-repository.js';

const apiRoutes = express();

// const repository = new JsonRepository(path.resolve('./data/quotes.json'));
const repository = new JsonRepository(path.resolve('./data/test-quotes.json'));
const quoteManager = new QuoteManager(repository);

apiRoutes.get('/quote/random', async (req, res) => {
    const hideNsfw = req.query.nsfw === 'false';
    res.setHeader('Content-Type', 'application/json');
    try {
        const quote = await quoteManager.getRandomQuote(hideNsfw);
        res.send(JSON.stringify(quote));
    } catch (error) {
        res.send(JSON.stringify({error : error.toString()}));
    }
});

apiRoutes.get('/quote/:uuid(\\w{13}|\\w{18})', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    try {
        const quote = await quoteManager.getQuote(req.params.uuid);
        res.send(JSON.stringify(quote));
    } catch (error) {
        res.send(JSON.stringify({error : error.toString()}));
    }
});

export default apiRoutes;