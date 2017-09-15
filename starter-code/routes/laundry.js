// routes/laundry.js
const express = require('express');

const router = express.Router();


router.get('/dashboard', (req, res, next) => {
  res.render('laundry/dashboard');
});


module.exports = router;
