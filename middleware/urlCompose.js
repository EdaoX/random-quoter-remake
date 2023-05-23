import {BASE_URL, isDevelop, LISTEN_PORT} from "../config.js";

const compose = ( path ) => {

    if(!path.startsWith('/'))
        path = `/${path}`;
        
    if(!isDevelop || LISTEN_PORT === 80 || LISTEN_PORT === 443) {
        return `${BASE_URL}${path}`;
    }

    return `${BASE_URL}:${LISTEN_PORT}${path}`;
};

const urlCompose = (req, res, next) => {

    res.locals.url = compose;
    next();

};

export default urlCompose;
