exports.register = (req, res) => {
  res.status(201).json({user: req.body})
}