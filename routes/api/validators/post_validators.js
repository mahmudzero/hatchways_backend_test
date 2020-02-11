const ERROR_NAME__INVALID_PARAM = 'invalid_param';

module.exports = {
  validateTagParam: validateTagParam,
  validateSortByParam: validateSortByParam,
  validateSortDirectionParam: validateSortDirectionParam,
  'ERROR_NAME__INVALID_PARAM': ERROR_NAME__INVALID_PARAM,
}

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

function validateTagParam({ req = {} } = {}) {
  const tags = req.query.tags;
  const error = {
    name: ERROR_NAME__INVALID_PARAM,
    message: 'Tags parameter is required'
  };

  if (!tags || tags.length < 1) throw (error);

  var splitTags = req.query.tags.split(',');
  splitTags = splitTags.filter(tag => tag);
  if (splitTags.length === 0) throw (error);

  return splitTags;
}

function validateSortByParam({ req = {} } = {}) {
  const sortByParam = req.query.sortBy;
  const error = {
    name: ERROR_NAME__INVALID_PARAM,
    message: 'sortBy parameter is invalid'
  };

  if (sortByParam !== undefined && !sortByParams[sortByParam]) {
    throw (error);
  }

  if (sortByParam === undefined) return 'id';

  return sortByParam;
}

function validateSortDirectionParam({ req = {} } = {}) {
  const sortDirection = req.query.direction;
  const error = {
    name: ERROR_NAME__INVALID_PARAM,
    message: 'direciton parameter is invalid'
  };

  if (sortDirection !== undefined && !sortDirections[sortDirection]) {
    throw (error);
  }

  if (sortDirection === undefined) return 'asc';

  return sortDirection;
}
