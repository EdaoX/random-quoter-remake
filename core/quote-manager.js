import Quote from "./quote.js";

export default class QuoteManager
{
    constructor(repository)
    {
        this.repository = repository;
    }

    async addQuote(author, body)
    {
        const quote = new Quote(author, body);
        if(!await this.repository.save(quote)) {
            throw new Error("Couldn't save quote");
        }

        return quote;
    }

    async getQuote(uuid)
    {
        const quoteData = await this.repository.retrieve(uuid);
        if(!quoteData) {
            throw new Error('Quote not found');
        }
        return Quote.fromData(quoteData);
    }

    async getRandomQuote()
    {
        const quoteData = await this.repository.retrieveRandom();
        if(!quoteData) {
            throw new Error('Quote not found');
        }
        return Quote.fromData(quoteData);
    }
}