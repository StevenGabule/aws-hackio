const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken');
const User = require('../../models/user.model');
const { basicEmailTemplate } = require('../../templates/email/basic');

// accessKeyId: process.env.AWS_ACCESS_KEY_ID,
// secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// region: process.env.AWS_REGION

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
})

const ses = new AWS.SES({apiVersion: '2010-12-01'})

exports.register = async (req, res) => {
  try {
    const {name, email, password} = req.body;

    // check for duplicate email
    const user = await User.findOne({email}).exec();
    if (user) {
      return res.status(400).json({ error: 'Email is already taken. Please try new one.'})
    }

    const token = jwt.sign({name, email, password}, process.env.JWT_ACCOUNT_ACTIVATION, {
      expiresIn: '10m'
    });

    const sendingEmail = ses.sendEmail(basicEmailTemplate(email, token)).promise();
    sendingEmail
    .then(() => res.json({ message: `Email has been sent to ${email}, Follow the instructions to complete your registration.`}))
    .catch(err => {
      console.log(err.stack);
      res.status(400).json({ message: 'We could not verify your email address. Please try again.' })
    })
  } catch (error) {
    console.log(error.message);
  }
}