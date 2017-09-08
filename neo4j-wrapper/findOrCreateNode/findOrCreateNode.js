const async = require('async');

const createNodeIfNotFound = function createNodeIfNotFound(properties, result, cb) {
  if (result.records.length) {return cb(null, result);}
  return this.createNode(properties, cb);
};

const findOrCreateNode = function findOrCreateNode(properties, cb) {
  async.waterfall([
    this.findNodes.bind(this, properties),
    createNodeIfNotFound.bind(this, properties),
  ], cb);
};

module.exports = findOrCreateNode;
