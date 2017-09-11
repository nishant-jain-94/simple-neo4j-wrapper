const path = require('path');
const csv = require('fast-csv');
const highland = require('highland');

/**
 * createFromCsv reads the csv file from path and creates nodes/relationship.
 * @param {String} pathOfCsvFile 
 * @param {Function} intent - Refers to the intent createNode/createRelation 
 * @param {Function} cb - Refers to the callback.
 */
const createFromCsv = (pathOfCsvFile, intent, cb) => {
  const csvStream = csv.fromPath(path.join(__dirname, pathOfCsvFile), { headers: true });

  highland(csvStream)
    .flatMap(intent)
    .collect()
    .toCallback(cb);
};

/**
 * Creates Nodes from CSV file.
 * @param {String} pathOfCsvFile - refers to the path of the csv file.
 * @param {Function} cb - refers to the callback to be called after creatingNodesFromCsv
 */
const createNodesFromCsv = function createNodesFromCsv(pathOfCsvFile, cb) {
  const createNodes = highland.wrapCallback(this.createNode.bind(this));
  createFromCsv(pathOfCsvFile, createNodes, cb);
};

/**
 * Creates Relations from CSV file.
 * @param {String} pathOfCsvFile 
 * @param {Function} cb 
 */
const createRelationsFromCsv = function createRelationsFromCsv(pathOfCsvFile, cb) {
  const createRelations = highland.wrapCallback(this.createRelation.bind(this));
  createFromCsv(pathOfCsvFile, createRelations, cb);
};

exports.createNodesFromCsv = createNodesFromCsv;
exports.createRelationsFromCsv = createRelationsFromCsv;
