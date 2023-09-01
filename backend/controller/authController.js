const formidable = require('formidable');
const validator = require('validator');
const register = require('../models/authModel');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userRegister = (req, res) => {
  const form = formidable.formidable();
  form.parse(req, async (err, fields, files) => {
    const { username, email, password, confirmPassword } = fields;
    const { image } = files;
    const error = [];

    if (!username[0]) {
      error.push('Please provide your username');
    }
    if (!email[0]) {
      error.push('Please provide your email');
    }
    if (email[0] && !validator.isEmail(email[0])) {
      error.push('Please provide a valid email');
    }
    if (!password[0]) {
      error.push('Please provide a password');
    }
    if (!confirmPassword[0]) {
      error.push('Please enter your password again');
    }
    if (password[0] && confirmPassword[0] && confirmPassword[0] !== password[0]) {
      error.push('Your password and confirm password are not the same');
    }
    if (password[0] && password[0].length < 6) {
      error.push('Your password should atleast be 6 characters');
    }
    if (Object.keys(files).length === 0) {
      error.push('Please provide user image');
    }
    if (error.length > 0) {
      res.status(400).json({
        error: {
          message: error,
        },
      });
    } else {
      const getImageName = image[0].originalFilename;
      const randomNumber = Math.floor(Math.random() * 99999);
      const newImageName = randomNumber + getImageName;
      files.image.originalFilename = newImageName;
      const newPath =
        __dirname + `../../../chatapp-client/public/images/${files.image.originalFilename}`;

      // inserting into database
      try {
        const checkUser = await register.findOne({ email: email });
        if (checkUser) {
          res.status(404).json({
            error: {
              message: ['Email has already been registered'],
            },
          });
        } else {
          fs.copyFile(files.image[0].filepath, newPath, async (err) => {
            if (!err) {
              const userCreate = await register.create({
                username: username[0],
                email: email[0],
                password: await bcrypt.hash(password[0], 10),
                image: files.image.originalFilename,
              });

              // creating token
              const tokenUser = {
                id: userCreate._id,
                email: userCreate.email,
                username: userCreate.username,
                image: userCreate.image,
                registerTime: userCreate.createdAt,
              };

              const token = jwt.sign(tokenUser, process.env.SECRET, {
                expiresIn: process.env.TOKEN_EXP,
              });

              const options = {
                expires: new Date(Date.now() + process.env.COOKIE_EXP * 24 * 60 * 60 * 1000),
              };

              console.log(options.expires);
              res.status(201).cookie('authToken', token, options).json({
                message: 'Registration successfull!',
                token,
              });
            } else {
              res.status(500).json({
                error: {
                  message: err,
                },
              });
            }
          });
        }
      } catch (error) {
        res.status(500).json({
          error: {
            message: error,
          },
        });
      }
    }
  });
};

module.exports = userRegister;
