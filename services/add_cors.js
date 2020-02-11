module.exports = function(res) {
  res.set('Access-Control-Allow-Origin', ['*']);
  res.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
}
