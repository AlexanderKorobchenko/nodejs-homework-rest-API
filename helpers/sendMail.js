const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const { SENDGRID_API_KEY, MY_EMAIL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

// const msg = {
//   to: 'korobchenko_ua@ukr.net', // Change to your recipient
//   from: 'korobchenko_ua@ukr.net', // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };

const sendEmail = async data => {
  try {
    const msg = { ...data, from: MY_EMAIL };
    await sgMail.send(msg);
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;
