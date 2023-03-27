const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken');
const User = require('../../models/user.model');

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

    const params = {
      Source: process.env.EMAIL_FROM,
      Destination: {
        ToAddresses: [email]
      },
      ReplyToAddresses: [process.env.EMAIL_TO],
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: `<html>
              <body>
                <h1>Verify your email address</h1>
                <p>Please use the following link to complete your registration:</p>
                <p>${process.env.CLIENT_URI}/auth/activate/${token}</p>
              </body>
            </html>`
          }
        },
        Subject: { Charset: 'UTF-8', Data: 'Complete your registration'}
      }
    }
    const sendingEmail = ses.sendEmail(params).promise();
    sendingEmail.then(() => res.send('Email sent!')).catch(err => console.log(err.stack))
  } catch (error) {
    console.log(error.message);
  }
}