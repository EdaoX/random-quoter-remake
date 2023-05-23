// const repository = new JsonRepository(path.resolve('./data/quotes.json'));
import JsonRepository from "../repositories/json-repository.js";
import QuoteManager from "./quote-manager.js";
import path from "path";

const repository = new JsonRepository(path.resolve('./data/test-quotes.json'));
export default new QuoteManager(repository);