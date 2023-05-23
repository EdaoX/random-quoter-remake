import * as Config from '../config.js';
import path from "path";
import JsonRepository from "../core/repositories/json-repository.js";
import DynamoDBRepository from "../core/repositories/dynamodb-repository.js";
import QuoteManager from "../core/managers/quote-manager.js";

upload();

async function upload()
{
    const dynamoDBRepository = new DynamoDBRepository();
    const dynamoDBManager = new QuoteManager(dynamoDBRepository);
    const dumpFilePath = path.resolve('./data/quotes.json');

    // Clears previous data
    const oldQuotes = await dynamoDBManager.getAllQuotes();
    for (const quote of oldQuotes) {
        await dynamoDBManager.delete(quote.getUuid());
    }

    const jsonRepo = new JsonRepository(dumpFilePath);
    const jsonManager = new QuoteManager(jsonRepo);
    const quotes = await jsonManager.getAllQuotes();

    for (const quote of quotes) {
        await dynamoDBRepository.save(quote);
    }
}