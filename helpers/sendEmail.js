const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { HW_06_API_KEY } = process.env;

sgMail.setApiKey(HW_06_API_KEY);

const sendEmail = async (data) => {
  const mail = { ...data, from: "lotoshead@gmail.com" };
  await sgMail.send(mail);
};

module.exports = sendEmail;