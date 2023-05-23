import Repository from "./repository.js";

import CyclicDb from "@cyclic.sh/dynamodb";
import {pickRandomFromArray} from "../utilities.js";

const db = CyclicDb("fancy-foal-khakisCyclicDB");

export default class DynamoDBRepository extends Repository
{
    async save(quote)
    {
        const quotes = db.collection('quotes');
        await quotes.set(quote.getUuid(), quote.toData());
    }

    async update(uuid, quote)
    {

    }

    async retrieve(uuid)
    {
        const quotes = db.collection('quotes');
        const cyclicItem = await quotes.get(uuid);
        if(!cyclicItem?.props)
            return null;
        return cyclicItem.props;
    }

    async retrieveRandom(hideNsfw = false)
    {
        const all = await this.retrieveAll(hideNsfw ? { nsfw : false } : {});
        return pickRandomFromArray(all);
    }

    async retrieveAll(filter = {})
    {
        const quotes = db.collection('quotes');
        const results = (await quotes.filter(filter)).results;
        return results.map(result => result.props);
    }

    async delete(uuid)
    {
        const quotes = db.collection('quotes');
        await quotes.delete(uuid);
    }
}