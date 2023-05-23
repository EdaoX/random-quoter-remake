import * as Config from '../config.js';
import path from "path";
import {promises as fs} from 'fs';
import JsonRepository from "../core/repositories/json-repository.js";
import dynamoDbManager from "../core/managers/dynamodb-manager.js";

download();

async function download()
{
    const dumpFilePath = path.resolve('./data/quotes-dump.json');

    // Clears previous data
    await fs.writeFile(dumpFilePath, '');

    const jsonRepo = new JsonRepository(dumpFilePath);
    const quotes = await dynamoDbManager.getAllQuotes();

    for (const quote of quotes) {
        await jsonRepo.save(quote);
    }
}