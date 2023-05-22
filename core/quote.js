import uniqid from 'uniqid';
import { generateDatetime } from './utilities.js';

export default class Quote
{
    constructor(author, body, nsfw = false, creationDatetime = null)
    {
        this.setUuid(uniqid());
        this.setAuthor(author);
        this.setBody(body);
        this.setCreationDatetime(creationDatetime || generateDatetime());
        this.setNsfw(nsfw);
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

    isNsfw()
    {
        return this.nsfw;
    }

    setNsfw(nsfw)
    {
        this.nsfw = nsfw;
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
        const nsfw = this.isNsfw();
        return {author, body, uuid, nsfw, created_at};
    }

    static fromData({author, body, uuid, nsfw, created_at})
    {
        const quote = new Quote(author, body, nsfw, created_at);
        quote.setUuid(uuid);
        return quote;
    }
}