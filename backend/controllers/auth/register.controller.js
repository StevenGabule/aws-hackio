const AWS = require('aws-sdk');

// accessKeyId: process.env.AWS_ACCESS_KEY_ID,
// secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// region: process.env.AWS_REGION

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
})

const ses = new AWS.SES({apiVersion: '2010-12-01'})

exports.register = (req, res) => {
  try {
    const {name, email, password} = req.body;
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
            Data: `<html><body><h1>Hello ${name}</h1><p>Test email</p></body></html>`
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