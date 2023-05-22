import { config } from "dotenv";
config();

export const BASE_URL = process.env.BASE_URL;
export const LISTEN_PORT = parseInt(process.env.PORT);

export const HELMET_OPTIONS = {
    contentSecurityPolicy: {
        directives: {
            "script-src": ["'self'", "maxcdn.bootstrapcdn.com", "cdnjs.cloudflare.com", "cdn.jsdelivr.net"],
            "style-src": ["'self'", "maxcdn.bootstrapcdn.com", "cdn.jsdelivr.net"],
        },
    },
};