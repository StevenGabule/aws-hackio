const jwt = require('jsonwebtoken');
const User = require('../../models/user.model');

exports.Login = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email}).exec();
    if (!user || !user.authenticate(password)) {
      return res.status(400).json({ error: 'Email or password not found.' })
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_TOKEN, { expiresIn: '7d'})
    const {_id, name, email: userEmail, password: userPassword} = user;
    return res.status(200).json({
      token,
      user: {_id, name, email: userEmail, password: userPassword},
      message: 'Successfully login'
    })
  } catch (error) {
    return res.status(400).json({error: error.message})
  }
}