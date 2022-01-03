const express = require('express');
const bcrypt = require('bcryptjs');

const { joiRegisterSchema, joiLoginSchema } = require('../../model/user');
const { User } = require('../../model');

const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    const { error } = joiRegisterSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    const { name, email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: 'Email in use',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({ name, email, password: hashPassword });
    res.status(201).json({
      user: {
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { error } = joiLoginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: 'Email or password is wrong',
      });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(401).json({
        message: 'Email or password is wrong',
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
