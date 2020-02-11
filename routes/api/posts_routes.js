var express = require('express');
var router = express.Router();
var AddCORS = require('../../services/add_cors');
var GetPostsFromHatchways = require('../../services/get_posts_from_hatchways');

router.get('/', getPosts);

module.exports = router;

const ERROR_NAME__INVALID_PARAM = 'invalid_param';

const sortByParams = {
  id: true,
  reads: true,
  likes: true,
  popularity: true
};

const sortDirections = {
  desc: true,
  asc: true
};

function sortFinalArray(postA, postB, sortBy, sortDir) {
  sortByA = postA[sortBy];
  sortByB = postB[sortBy];

  if (sortByA > sortByB) return sortDir === 'asc' ? 1 : -1;
  if (sortByA < sortByB) return sortDir === 'asc' ? -1 : 1;
  return 0;
}

function lintPosts(postsObject, sortBy, sortDir) {
  var finalArray = Object.keys(postsObject).map((key) => {
    return postsObject[key];
  });

  finalArray.sort((postA, postB) => sortFinalArray(postA, postB, sortBy, sortDir));
  return finalArray;
}

function getPosts(req, res, next) {
  AddCORS(res);
  try {
    validateTagParam({ req });
    var sortBy = validateSortByParam({ req });
    var sortDir = validateSortDirectionParam({ req });

    const tagsLinted = req.query.tags.split(',');

    GetPostsFromHatchways(tagsLinted).then((posts) => {
      var final = lintPosts(posts, sortBy, sortDir);
      res.json({
        posts: final
      });
    });

  } catch (e) {
    if (e.name === ERROR_NAME__INVALID_PARAM) {
      res.status(400).json({ error: e.message });
      return;
    } else {
      res.status(500).json({ error: 'unknown error' });
      return;
    }
  }
}

function validateTagParam({ req = {} } = {}) {
  const tags = req.query.tags;
  if (!tags || tags.length < 1) {
    throw ({
      name: ERROR_NAME__INVALID_PARAM,
      message: 'Tags paramter is required'
    });
  }
}

function validateSortByParam({ req = {} } = {}) {
  const sortByParam = req.query.sortBy;
  if (sortByParam != undefined && !sortByParams[sortByParam]) {
    throw ({
      name: ERROR_NAME__INVALID_PARAM,
      message: 'sortBy parameter is invalid'
    });
  }
  if (sortByParam === undefined) {
    return 'id';
  }
  return sortByParam;
}

function validateSortDirectionParam({ req = {} } = {}) {
  const sortDirection = req.query.direction;
  if (sortDirection != undefined && !sortDirections[sortDirection]) {
    throw ({
      name: ERROR_NAME__INVALID_PARAM,
      message: 'direciton parameter is invalid'
    });
  }
  if (sortDirection === undefined) {
    return 'asc';
  }
  return sortDirection;
}
