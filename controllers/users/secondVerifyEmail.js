const { User } = require("../../models");
const { BadRequest, NotFound } = require("http-errors");
const { sendEmail } = require("../../helpers");
const { PORT } = process.env;

const secondVerifyEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw BadRequest("missing required field email");
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFound("User not found");
  }

  if (user.verify) {
    throw new BadRequest("Verification has already been passed");
  }

  const mail = {
    to: email,
    subject: "Email confirmation",
    html: `<a target="_blank" href="http://localhost:${PORT}/api/users/verify/${user.verificationToken}">Confirm Email</a>`,
  };

  await sendEmail(mail);
  res.json({
    status: "success",
    code: 200,
    message: "Verification email sent",
  });
};

module.exports = secondVerifyEmail;