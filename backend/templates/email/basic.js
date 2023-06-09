exports.basicEmailTemplate = (email, token) => {
  return {
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
                <p>${process.env.CLIENT_URI}/account/activate/${token}</p>
              </body>
            </html>`
        }
      },
      Subject: { Charset: 'UTF-8', Data: 'Complete your registration' }
    }
  }
}