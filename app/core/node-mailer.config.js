// Import the Nodemailer library
import nodemailer from "nodemailer";
import logger from "./winston.config.js";

// Create a transporter object
const transporter = nodemailer.createTransport({
    secure: false, // use SSL
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: 'ddommy378@gmail.com',
        pass: 'qkyz vmkn ezqc nqgt',
    },
    // logger: true, // Logs information
    // debug: true,  // Debugs SMTP traffic
});

export async function sendMail(to, subject, text) {
    const mailOptions = {
        from:'ddommy378@gmail.com',
        to,
        subject,
        text
    };
    try {
        const info = await transporter.sendMail(mailOptions,(err,mailRes)=>{
            if(err)
                throw err;
            return { success: true, mailRes };
        });
    }
    catch (e) {
        logger.error(e)
    }
}