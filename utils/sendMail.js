
const nodemailer = require("nodemailer")
const config = require("../config/config")
const options = {
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
        user: config.EMAIL_FROM,
        pass: config.PASSWORD,
    },
};
const transporter = nodemailer.createTransport(options);

const sendMail = (email, subject, body) => {
    try {
        const mailOptions = {
            to: email,
            from: config.EMAIL_FROM,
            subject: subject,
            html: body
        }
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Email sent to", info.response);
            }
        })
    } catch (error) {
        console.log(error);
        throw new Error("Error in sending email")
    }
}

module.exports = sendMail;
