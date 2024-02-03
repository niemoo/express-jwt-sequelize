const jwt = require('jsonwebtoken');
const response = require('../config/response');
const { User } = require('../models');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

const AuthController = {
  registerUser: async (req, res) => {
    try {
      const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      const token = signToken(newUser.id);

      response(200, { newUser, token }, 'Register Successfully', res);
    } catch (err) {
      response(400, err, err.message, res);
    }
  },
  loginUser: async (req, res) => {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });
      const token = signToken(userData.id);

      // IF THE USER IS NOT ENTER THE EMAIL AND PASSWORD
      if (!req.body.email || !req.body.password) {
        response(400, 'Error validation', 'Please enter your email and password', res);
      }

      // IF THE EMAIL OR PASSWORD IS INCORRECT
      if (!userData || !(await userData.CorrectPassword(req.body.password, userData.password))) {
        response(404, 'Error validation', 'Email or password is incorrect', res);
      }

      // IF THE USER IS FOUND
      response(200, { userData, token }, 'Login Successfully', res);
    } catch (err) {
      response(400, err, err.message, res);
    }
  },
};

module.exports = AuthController;
