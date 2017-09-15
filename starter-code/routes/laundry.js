// routes/laundry.js
const express = require('express');

const router = express.Router();

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



module.exports = router;
