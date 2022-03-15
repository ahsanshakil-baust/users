// Dot Env
const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendMail = async (req, user) => {
    try {
        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "shakilahsan46@gmail.com",
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });

        const mailOptions = {
            from: "TEAM <shakilahsan46@gmail.com>",
            to: user.email,
            subject: "verify your email",
            html: `<h2>${user.username}! Thanks for registering on our site</h2> 
    <h4> Please verify your mail to continue...</h4> <a href="http://${req.headers.host}/user/verify-email/${user.token}">verify your Email</a>`,
        };

        const result = await transport.sendMail(mailOptions);

        return result;
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    sendMail,
};
