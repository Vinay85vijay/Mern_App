const authService = require('../services/auth.service');

exports.register = async (req, res) => {
  try {
    const message = await authService.register(req.body);
    res.status(201).json({ message });
  } catch (err) {
    const status = err.statusCode || 500;
    res.status(status).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { message, token } = await authService.login(req.body);
    res.status(200).json({ message, token });
  } catch (err) {
    const status = err.statusCode || 500;
    res.status(status).json({ message: err.message });
  }
};
