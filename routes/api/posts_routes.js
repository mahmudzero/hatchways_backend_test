var express = require('express');
var router = express.Router();
var AddCORS = require('../../services/add_cors');
var GetPostsFromHatchways = require('../../services/get_posts_from_hatchways');
var postValidators = require('./validators/post_validators');
var postUtils = require('./utils/post_utils');

router.get('/', getPosts);

module.exports = router;

function getPosts(req, res, next) {
  AddCORS(res);
  try {
    var tagsLinted = postValidators.validateTagParam({ req });
    var sortBy = postValidators.validateSortByParam({ req });
    var sortDir = postValidators.validateSortDirectionParam({ req });

    GetPostsFromHatchways(tagsLinted).then((posts) => {
      var final = postUtils.lintPosts(posts, sortBy, sortDir);
      res.json({
        posts: final
      });
    });

  } catch (e) {
    if (e.name === postValidators['ERROR_NAME__INVALID_PARAM']) {
      res.status(400).json({ error: e.message });
      return;
    } else {
      res.status(500).json({ error: 'unknown error' });
      return;
    }
  }
}
