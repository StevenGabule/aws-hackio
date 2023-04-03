const shortId = require('shortid');
const jwt = require('jsonwebtoken')
const User = require('../../models/user.model');

exports.ActivateAccount = async (req, res) => {
  try {
    const { token } = req.body;

    const decoded = await jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION);

    if (!decoded) {
      return res.status(401).json({ error: 'Expired link. Please try again.' })
    }

    const { name, email, password } = jwt.decode(token);
    const username = shortId.generate();

    const checkUserIfExists = await User.findOne({ email }).exec();
    if (checkUserIfExists) {
      return res.status(401).json({ error: 'User email was already taken by other user. Please used new one.' })
    }

    const user = new User({username, name, email, password})
    await user.save();
    return res.status(201).json({ message: 'Registration was successful. Please login.'})

  } catch (error) {
    return res.status(400).json({ error: error.message})
  }

  
  
}