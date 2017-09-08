const log = require('../commons/logger')('Bulk Query Executor');
/**
 * Executes Bulk Queries on Neo4j. 
 * Makes use of Neo4j's Transaction Api to execute Bulk Queries
 * 
 * @param {Array} queries
 * @param {Object} options (optional)
 * @param {Function} callback (optional)
 * 
 * @returns {Promise}
 */
const bulkQueryExecutor = function bulkQueryExecutor(queries, callback) {
  if(!Array.isArray(queries)) {
    log.error('Expected queries to be of type Array');
    throw new Error('Expected queries to be of type Array');
  }

  if(callback && typeof callback !== 'function') {
    log.error('Expected callback to be of type Function');
    throw new Error('Expected callback to be of type Function');
  }

  const writeTxs = this.session.writeTransaction((transaction) => {
    const results = queries.map((query) => transaction.run(query));
    return Promise.all(results);
  });

  return writeTxs
    .then((results) => { callback(null, results); return; })
    .catch((error) => { log.error(error); callback(error, null); return; });
};

module.exports = bulkQueryExecutor;
