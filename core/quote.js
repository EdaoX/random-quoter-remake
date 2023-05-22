import uniqid from 'uniqid';
import { generateDatetime } from './utilities.js';

export default class Quote
{
    constructor(author, body, creationDatetime = null)
    {
        this.author = author;
        this.body = body;
        this.creationDatetime = creationDatetime || generateDatetime();
        this.uuid = uniqid();
    }

    getUuid()
    {
        return this.uuid;
    }

    setUuid(uuid)
    {
        this.uuid = uuid;
    }

    getAuthor()
    {
        return this.author;
    }

    setAuthor(author)
    {
        this.author = author;
    }

    getBody()
    {
        return this.body;
    }

    setBody(body)
    {
        this.body = body;
    }

    getCreationDatetime()
    {
        return this.creationDatetime;
    }

    setCreationDatetime(datetime)
    {
        this.creationDatetime = datetime;
    }

    toData()
    {
        const author = this.getAuthor();
        const body = this.getBody();
        const created_at = this.getCreationDatetime();
        const uuid = this.getUuid();
        return {author, body, uuid, created_at};
    }

    static fromData({author, body, uuid, created_at})
    {
        const quote = new Quote(author, body, created_at);
        quote.setUuid(uuid);
        return quote;
    }
}