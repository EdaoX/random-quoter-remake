import { config } from "dotenv";
config();

export const BASE_URL = process.env.BASE_URL;
export const LISTEN_PORT = parseInt(process.env.LISTEN_PORT);

export const HELMET_OPTIONS = {
    contentSecurityPolicy: {
        directives: {
            "script-src": ["'self'", "code.jquery.com", "maxcdn.bootstrapcdn.com", "cdnjs.cloudflare.com"],
            "style-src": ["'self'", "maxcdn.bootstrapcdn.com"],
        },
    },
};