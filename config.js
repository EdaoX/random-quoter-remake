import { config } from "dotenv";
config();

export const BASE_URL = process.env.BASE_URL;
export const LISTEN_PORT = parseInt(process.env.PORT);

export const AWS_REGION = process.env.AWS_REGION;
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
export const AWS_SESSION_TOKEN = process.env.AWS_SESSION_TOKEN;

export const HELMET_OPTIONS = {
    contentSecurityPolicy: {
        directives: {
            "script-src": ["'self'", "maxcdn.bootstrapcdn.com", "cdnjs.cloudflare.com", "cdn.jsdelivr.net"],
            "style-src": ["'self'", "maxcdn.bootstrapcdn.com", "cdn.jsdelivr.net"],
        },
    },
};