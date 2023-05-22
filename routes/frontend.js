import express from 'express';
import path from 'path';
import QuoteManager from '../core/quote-manager.js';
import JsonRepository from '../core/repositories/json-repository.js';

const frontendRoutes = express();

const repository = new JsonRepository(path.resolve('./data/quotes.json'));
const quoteManager = new QuoteManager(repository);

frontendRoutes.get('/random', async (req, res) => {
    try {
        const quote = await quoteManager.getRandomQuote();
        const autoUpdate = false;
        res.render('quote', { quote, autoUpdate } );
    } catch (error) {
        res.send(error.toString());
    }
});

frontendRoutes.get('/dash', async (req, res) => {
    try {
        const quote = await quoteManager.getRandomQuote();
        const autoUpdate = true;
        res.render('quote', { quote, autoUpdate } );
    } catch(error) {
        res.send(error.toString());
    }
});

frontendRoutes.get('/:uuid', async (req, res) => {
    try {
        const quote = await quoteManager.getQuote(req.params.uuid);
        const autoUpdate = false;
        res.render('quote', { quote, autoUpdate } );
    } catch(error) {
        res.send(error.toString());
    }
});

export default frontendRoutes;