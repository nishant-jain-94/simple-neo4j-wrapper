const async = require('async');

/**
 * Deletes all the constraints in Neo4j.
 * @param {Function} callback 
 */
const dropAllConstraints = function dropAllConstraints(callback) {
  const dropConstraints = (constraints, cb) => {
    const queryExecutorToDropConstraints = async.map(constraints, ({property_keys, label}) => {
      const query = `DROP CONSTRAINT ON (label:${label}) ASSERT label.${property_keys[0]} IS UNIQUE`;
      return this.queryExecutor.bind(this, query);
    });
    async.series(queryExecutorToDropConstraints, cb);
  };

  async.waterfall([
    this.getConstraints.bind(this),
    dropConstraints,
  ], callback);
};

module.exports = dropAllConstraints;
