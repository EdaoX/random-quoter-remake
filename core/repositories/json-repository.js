import { pickRandomFromArray } from "../utilities.js";
import Repository from "./repository.js";
import {promises as fs} from 'fs';

export default class JsonRepository extends Repository
{
    constructor(filePath)
    {
        super();
        this.filePath = filePath;
    }

    async save(quote)
    {
        const quotes = await this.getQuoteData();
        quotes.push(quote.toData());

        const json = JSON.stringify(quotes);
        try {
            await fs.writeFile(this.filePath, json);
            return true;
        } catch(error) {
            return false;
        }
    }

    async retrieve(searchedUuid)
    {
        const quoteData = await this.getQuoteData();
        return quoteData.find(datum => datum.uuid === searchedUuid);
    }

    async retrieveRandom()
    {
        const quoteData = await this.getQuoteData();
        return pickRandomFromArray(quoteData);
    }

    async getQuoteData()
    {
        const json = await fs.readFile(this.filePath);
        return JSON.parse(json);
    }
}