import { existsSync, writeFileSync } from "fs";
import crypto from "crypto";

const envPath = './.env'

// existsSync is used to check if a file exists
if (!existsSync(envPath)) {

    // Common way to make JWT_Secrets - hex is the safest most readable option for parsing
    const JWT_SECRET = crypto.randomBytes(64).toString('hex');

    // Writes to file - 2nd part is how to declare an .env var
    writeFileSync(envPath, `JWT_SECRET=${JWT_SECRET}`)
    console.log("Environment setup complete")
} else {
    console.log(".env already exists, skipping")
}

