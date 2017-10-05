var appData = require('../data.json');
var express = require('express');

var router = express.Router();

/* GET seller listing. */
router.get('/seller', (req, res) => {
  res.json({
    errno: 0,
    data: appData.seller,
  });
});

router.get('/goods', (req, res) => {
  res.json({
    errno: 0,
    data: appData.goods,
  });
});

router.get('/ratings', (req, res) => {
  res.json({
    errno: 0,
    data: appData.ratings,
  });
});

module.exports = router;
