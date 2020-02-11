module.exports = {
  lintPosts: lintPosts
}

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
