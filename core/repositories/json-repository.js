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
        await fs.writeFile(this.filePath, json);
    }

    async retrieve(searchedUuid)
    {
        const quoteData = await this.getQuoteData();
        return quoteData.find(datum => datum.uuid === searchedUuid);
    }

    async retrieveRandom(hideNsfw = false)
    {
        const quoteData = await this.getQuoteData();

        if(hideNsfw) {
            let arr = quoteData.filter(datum => !datum.nsfw);
            return pickRandomFromArray(arr);
        }

        return pickRandomFromArray(quoteData);
    }

    async getQuoteData()
    {
        const json = await fs.readFile(this.filePath, 'utf-8');
        return JSON.parse(json);
    }

    async retrieveAll(filter = {})
    {
        return (await this.getQuoteData()).filter(data => {
            const filterKeys = Object.keys(filter);

            for (const key of filterKeys) {
                if(typeof data[key] !== 'undefined' && data[key] !== filter[key]) {
                    return false;
                }
            }

            return true;
        });
    }
}