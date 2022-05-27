const { User } = require('../../models');
const { Conflict } = require('http-errors');
const bcrypt = require('bcryptjs');
const gravatar = require("gravatar");
const { v4 } = require("uuid");
const { sendEmail } = require("../../helpers");
const { PORT } = process.env;
require("dotenv").config();

const signup = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw new Conflict(`This email '${email}' is already in use.`)
    }

    const avatarURL = gravatar.url(email);
    const hashPasword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const verificationToken = v4();
    const result = await User.create({ email, password: hashPasword, avatarURL, verificationToken });
   
    const mail = {
        to: mail,
        subject: "Email confirmation",
        html: `<a target="_blank" href="http://localhost:${PORT}/api/users/verify/${verificationToken}">Confirm Email</a>`,
    };
    
    await sendEmail(mail);

    res.status(201).json({
        status: "success",
        code: 201,
        data: {
            user: {
                email: result.email,
                subscription: result.subscription,
                avatarURL,
                verificationToken,
            }
        }
    })
}

module.exports = signup;