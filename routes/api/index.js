var express = require('express');
var router = express.Router();
var AddCORS = require('../../services/add_cors');
var postsRoutes = require('./posts_routes');

router.get('/ping', ping);
router.use('/posts', postsRoutes);

module.exports = router;

function ping(req, res, next) {
  AddCORS(res);
  res.json({
    success: true
  });
  return;
}
