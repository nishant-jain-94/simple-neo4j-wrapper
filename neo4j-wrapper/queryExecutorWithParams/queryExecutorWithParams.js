/**
 * Executes a Cypher Query with parameters.
 * @param {String} query 
 * @param {Object} params - Refers to the parameters of Cypher Query.
 * @param {Function} callback 
 */
const queryExecutorWithParams = function queryExecutorWithParams(query, params, callback) {
  return this.session
    .run(query, params)
    .then((result) => { return callback(null, result); })
    .catch((error) => { console.error(error); return callback(error, null); });
};

module.exports = queryExecutorWithParams;
