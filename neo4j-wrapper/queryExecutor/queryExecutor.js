const log = require('../commons/logger')('Query Executor');

const queryExecutor = function queryExecutor(query, callback) {
  if(typeof query !== 'string') {
    throw new Error('Expected query to be of type string');
  }

  if(callback && typeof callback !== 'function') {
    throw new Error('Expected callback to be of type Function');
  }

  const result = this.session.run(query);

  result.then((records) => { callback(null, records); return; })
    .catch((error) => { log.error(error); callback(error, null); return; });
};

module.exports = queryExecutor;
