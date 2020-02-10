var express = require('express');
var router = express.Router();

router.get('/ping', ping);
router.get('/posts', get_posts)

module.exports = router;

function ping(req, res, next) {
  add_cors(res);
  res.json({
    success: true
  });
  return;
}

function get_posts(req, res, next) {
  add_cors(res);

  const tags = req.query.tags;
  if (!tags || tags.length < 1) {
    res.json({
      error: 'tags required'
    });
    return;
  }
  res.json({
    todo: 'fetch from hatchaways api'
  });
  return;
}

function add_cors(res) {
  res.set('Access-Control-Allow-Origin', ['*']);
  res.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
}
