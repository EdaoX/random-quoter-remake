import express from 'express';
import {syntaxHighlight} from "../core/utilities.js";
import {isDevelop} from "../config.js";
const frontendRoutes = express();

import quoteManager from '../core/managers/dynamodb-manager.js'


frontendRoutes.get('/random', async (req, res) => {
    const hideNsfw = req.query.nsfw !== 'true';

    try {
        const quote = await quoteManager.getRandomQuote(hideNsfw);
        if(!quote) {
            res.send("Quote not found");
            return;
        }

        const autoUpdate = false;

        res.render('quote', { quote, autoUpdate } );
    } catch (error) {
        res.send(error.toString());
        console.error(error);
    }
});

frontendRoutes.get('/dash', async (req, res) => {
    const hideNsfw = req.query.nsfw !== 'true';
    try {
        const quote = await quoteManager.getRandomQuote(hideNsfw);
        if(!quote) {
            res.send("Quote not found");
            return;
        }

        const autoUpdate = true;
        const updateUrl =  hideNsfw ? '/api/quote/random?nsfw=false' : '/api/quote/random';

        res.render('quote', { quote, autoUpdate, updateUrl } );
    } catch(error) {
        res.send(error.toString());
        console.error(error);
    }
});

frontendRoutes.get('/:uuid(\\w{13}|\\w{15}|\\w{18})', async (req, res) => {
    try {
        const quote = await quoteManager.getQuote(req.params.uuid);
        if(!quote) {
            res.send("Quote not found");
            return;
        }
        const autoUpdate = false;
        res.render('quote', { quote, autoUpdate } );
    } catch(error) {
        res.send(error.toString());
        console.error(error);
    }
});

frontendRoutes.get('/create', (req, res) => {
    res.render('create');
});

frontendRoutes.post('/create', async (req, res) => {

    const body = req.body['quote-body'];
    const author = req.body['quote-author'];
    const nsfw = !!req.body['nsfw'];

    try {
        const quote = await quoteManager.addQuote(author, body, nsfw);
        res.redirect(`/quote/${quote.uuid}`);
    } catch (error) {
        res.send(error.toString());
        console.error(error);
    }

});

if(isDevelop) {
    frontendRoutes.get('/debug', async (req, res) => {
        try {
            const quotes = await quoteManager.getAllQuotes({ });
            res.render('debug', { debugText : syntaxHighlight(quotes) });
        } catch (error) {
            res.send(error.toString());
            console.error(error);
        }

    });
}

export default frontendRoutes;