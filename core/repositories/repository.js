export default class Repository
{
    async save(quote){}
    
    async update(uuid, quote){}

    async retrieve(uuid){}

    async retrieveRandom(hideNsfw = false){}

    async retrieveAll(filter = {}){};

    async delete(uuid){}
}