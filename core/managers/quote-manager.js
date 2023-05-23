import Quote from "../quote.js";

export default class QuoteManager
{
    constructor(repository)
    {
        this.repository = repository;
    }

    async addQuote(author, body, nsfw)
    {
        const quote = new Quote(author, body, nsfw);
        await this.repository.save(quote);

        return quote;
    }

    async getQuote(uuid)
    {
        const quoteData = await this.repository.retrieve(uuid);
        if(!quoteData)
            return null;
        return Quote.fromData(quoteData);
    }

    async getRandomQuote(hideNsfw = false)
    {
        const quoteData = await this.repository.retrieveRandom(hideNsfw);

        if(!quoteData) {
            throw new Error('Quote not found');
        }

        return Quote.fromData(quoteData);
    }

    async getAllQuotes(filter = {})
    {
        const data = await this.repository.retrieveAll(filter);
        return data.map(datum => Quote.fromData(datum));
    }
}