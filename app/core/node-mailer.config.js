// Import the Nodemailer library
import nodemailer from "nodemailer";
import logger from "./winston.config.js";

// Create a new test account
export async function createMail() {
    try {
        const account = await nodemailer.createTestAccount();
        logger.info("Test account created successfully");
        return account;
    } catch (err) {
        logger.error("Failed to create a test account:", err);
        throw err;
    }
}

// Create a transporter object

export async function sendMail(to, subject, text) {

    const transporter = nodemailer.createTransport({
        secure: false, // use SSL
        host: process.env.NODE_MAILER_HOST,
        port: process.env.NODE_MAILER_PORT,
        auth: {
            user: process.env.NODE_MAILER_EMAIL,
            pass: process.env.NODE_MAILER_PASSWORD,
        },
        logger: true, // Logs information
        debug: true,  // Debugs SMTP traffic
    });

    const mailOptions = {
        from: process.env.NODE_MAILER_EMAIL,
        to,
        subject,
        text
    };
    try {
        const info = await transporter.sendMail(mailOptions, (err, mailRes) => {
            if (err)
                throw err;
            return { success: true, mailRes };
        });
    }
    catch (e) {
        logger.error(e)
    }
}