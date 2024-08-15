const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYU52ck1IRWZZeFFIQzF2bUFxRXRxQk1wRCtKMTVzcG9wWVBLVEluMG5WST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUJRdXpWZVVCcEg0ZEhWRTNTTzdyMkVUbDhJckJPcUkxVFMrTUQrQ0NHcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJRng3RkY3TTFidUlZSzc5cUlIWlIvVEIwWmUraU9ZZzk1Sm9vZUxTdUY4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJMWk5VeWJJVXp4Nm5xOE9LUC8vYTZmU3ZQVDY1T29vaGNmeTBrNnFFMkhZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVLazNOZStITktLUXFibFpZRHpnSU5kTWFYRFkwMHgrSHU2ZXBlL08xMFE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlA1S3gwQ0x2RFJsa3VUNlVVL3g5TlgwbThScVZCRFZHM2NFNjFjS09XekE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUJxQjVOTGxHVTJHbWZPUEJnaUdaWVFiN0hWMGtuMCsxR1JCSklYai8zaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMW03OWg4SWhPVjBqNW4yOVNPRVcyUXd4L28rY3RJUWpkOFdMcDZQYXB3VT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJJZDcyb1JkVkhCN2kxeXFMYkJyWHBGUjFOWjFOOUp6T3h0MHdvRlVBVjBEcGU5dU1GSllxNlVIMjc1Skc0eWttcGVOdnJSTW1vWmJYZXhuM3JRTENRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTMyLCJhZHZTZWNyZXRLZXkiOiJ0UzIyWWx6MWcyU0RjSi93ZGpQSXRuY1pKRnR0bjVuU1dValZNZFYyUWY4PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJNQWZ5aEp1ZlNWbThtSm9lS29LenJRIiwicGhvbmVJZCI6IjE0NmQyOTk2LWE0YzItNDBlOC04MTYzLWUxMDgyM2U1Mjc4YyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJWZjBtcmtpenI4aXNneHVhZlpIaXFxUGRrMkE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTFIwdisvV25SWmdUSm1HTTcyZXJyZjdsY2EwPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjJUWjJaUEQzIiwibWUiOnsiaWQiOiI5MjM0MTY5ODY1MTk6NDNAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0k2UTJrRVF5SkwydFFZWUFTQUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlIvRG04Q3FyOExpd0dkQzE4Zit3WVpZRDNmU1NIQXJ0bnlVTi84YW5iMG89IiwiYWNjb3VudFNpZ25hdHVyZSI6IkNyZGhHTmtGSUduaHRraEgrSUduY0pwNXhLSWE1RWZUSFA2aUhOdzBQUFkwTDlaaFdkbzJuUUhxc2liMG0xMXpNUkRBVE5GMStpbjN3UWlTZlR3NUJBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiIvZVVaWlEvWDRlWndWREZBNjEycW55SVJRblpDam41czBwYTI5R3VHbHJtMGFxSG9ZQ1BXRUhWQnRPc2RXVjA5TnJ0MUY3NHlDNnNwODhiU2VxS3dDZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkyMzQxNjk4NjUxOTo0M0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJVZnc1dkFxcS9DNHNCblF0Zkgvc0dHV0E5MzBraHdLN1o4bERmL0dwMjlLIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIzNjk3NDk0LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUVuZyJ9',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "254105915061", 
    A_REACT : process.env.AUTO_REACTION || 'on',     
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
//    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd" : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
