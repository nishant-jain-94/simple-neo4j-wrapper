
const queryExecutorWithParams = function queryExecutorWithParams(query, params, callback) {
  log.debug(query);
  return session
    .run(query, params)
    .then((result) => { return callback(null, result); })
    .catch((error) => { log.error(error); return callback(error, null); });
};

module.exports = queryExecutorWithParams;
