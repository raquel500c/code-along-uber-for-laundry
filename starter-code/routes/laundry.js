// routes/laundry.js
const express = require('express');
const User = require('../models/user');
const router = express.Router();

//middleware controla acceso si no logedin
router.use((req, res, next) => {
  if (req.session.currentUser) {
    next();
    return;
  }
  res.redirect('/login');
});

router.get('/dashboard', (req, res, next) => {
  res.render('laundry/dashboard');
});

router.get('/launderers', (req, res, next) => {
  User.find({ isLaunderer: true }, (err, launderersList) => {
    if (err) {
      next(err);
      return;
    }

    res.render('laundry/launderers', {
      launderers: launderersList
    });
  });
});

router.post('/launderers', (req, res, next) => {
  const userId = req.session.currentUser._id;
  const laundererInfo = {
    fee: req.body.fee,
    isLaunderer: true
  };

  User.findByIdAndUpdate(userId, laundererInfo, {
    new: true
  }, (err, theUser) => {
    if (err) {
      next(err);
      return;
    }
    req.session.currentUser = theUser;
    res.redirect('/dashboard');
  });
});

module.exports = router;
