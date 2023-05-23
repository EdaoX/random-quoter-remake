import express from 'express';
import path from 'path';
import QuoteManager from '../core/quote-manager.js';
import JsonRepository from '../core/repositories/json-repository.js';
import {BASE_URL} from "../config.js";

const frontendRoutes = express();

// const repository = new JsonRepository(path.resolve('./data/quotes.json'));
const repository = new JsonRepository(path.resolve('./data/test-quotes.json'));
const quoteManager = new QuoteManager(repository);

frontendRoutes.get('/random', async (req, res) => {
    const hideNsfw = req.query.nsfw === 'false';

    try {
        const quote = await quoteManager.getRandomQuote(hideNsfw);
        const autoUpdate = false;

        res.render('quote', { quote, autoUpdate } );
    } catch (error) {
        res.send(error.toString());
    }
});

frontendRoutes.get('/dash', async (req, res) => {
    const hideNsfw = req.query.nsfw === 'false';
    try {
        const quote = await quoteManager.getRandomQuote(hideNsfw);
        const autoUpdate = true;
        const updateUrl =  hideNsfw ? '/api/quote/random?nsfw=false' : '/api/quote/random';

        res.render('quote', { quote, autoUpdate, updateUrl } );
    } catch(error) {
        res.send(error.toString());
    }
});

frontendRoutes.get('/:uuid(\\w{13}|\\w{15}|\\w{18})', async (req, res) => {
    try {
        const quote = await quoteManager.getQuote(req.params.uuid);
        const autoUpdate = false;
        res.render('quote', { quote, autoUpdate } );
    } catch(error) {
        res.send(error.toString());
    }
});

frontendRoutes.get('/create', (req, res) => {
    res.render('create');
});

frontendRoutes.post('/create', async (req, res) => {

    const body = req.body['quote-body'];
    const author = req.body['quote-author'];
    const nsfw = !!req.body['nsfw'];

    const quote = await quoteManager.addQuote(author, body, nsfw);

    if(quote)
        res.redirect(`/quote/${quote.uuid}`);
    else
        res.redirect('/quote/create');

frontendRoutes.get('/debug', async (req, res) => {
    try {
        const quotes = await quoteManager.getAllQuotes({ });
        res.render('debug', { debugText : syntaxHighlight(quotes) })
    } catch (error) {
        res.send(error.toString());
        console.error(error);
    }

});

export default frontendRoutes;