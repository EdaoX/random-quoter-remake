import DynamoDBRepository from "../repositories/dynamodb-repository.js";
import QuoteManager from "./quote-manager.js";

const repository = new DynamoDBRepository();
export default new QuoteManager(repository);