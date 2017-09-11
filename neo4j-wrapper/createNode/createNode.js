const _ = require('lodash');

/**
 * Creates a node in neo4j.
 * @param {Object} properties - Properties of node. With a property named label (mandatory). 
 * @param {Function} callback - Callback to be called after creating node.
 * 
 * CreateNode basically does the following:
 * 1. Fetches the label on the node.
 * 2. Fetches all the properties on the node.
 * 3. Creates a query using the label and the properties of the node.
 * 4. Executes the query on Neo4j
 */
const createNode = function createNode(properties, callback) {
  const {label} = properties;
  const propertiesOfNode = JSON.stringify(_.omit(properties, 'label')).replace(/\"(\w+)\":/g, '$1:');
  const query = `CREATE (n:${label} ${propertiesOfNode}) return n`;
  this.queryExecutor(query, callback);
};

module.exports = createNode;
