var fetch = require('node-fetch');

const HATCHWAYS_API = 'https://hatchways.io/api/assessment/blog/posts';

module.exports = function(tags) {
  var final = {};

  var resultPromises = tags.map((tag, index) => {
    return (
      fetch(HATCHWAYS_API + '?tag=' + tag)
        .then((res) => {
          var _resJSON = res.json();
          if (!res.ok) {
            _resJSON.then((_err) => {
              throw(_err);
            })
          } else {
            return _resJSON;
          }
        }).then((resJSON) => {
          return resJSON;
        })
    );
  });

  return (
    Promise.all(resultPromises).then((results) => {
      results.map((result) => {
        var accumulated = result.posts.reduce((acc, post) => {
        	acc[post.id] = post;
          return acc;
        }, {});
        final = Object.assign(final, accumulated);
      });
      return final;
    })
  );
}
