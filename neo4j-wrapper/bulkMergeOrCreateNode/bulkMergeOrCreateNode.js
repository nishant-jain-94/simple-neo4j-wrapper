const _ = require('lodash');
const {stringifyNodeProperties, prefixAndStringifyNodeProperties} = require('../commons');

/**
 * Creates Nodes in bulk. 
 * 
 * @param {Array} nodesToBeCreated - Refers to an Array of Nodes to be created.
 * @param {Function} cb - Refers to the callback to be called after creating nodes.
 * 
 * bulkMergeOrCreateNode maps over all the nodesToBeCreated and does the following:
 * 1. Fetches all the uniqueConstraintsOn the node.
 * 2. Based on uniqueConstraints it fetches all the uniqueProperties on the node.
 * 3. Merge node basically finds similar patterns using the uniqueConstraints.
 * 4. notUniquePropertiesOfNode basically contains the properties of the node discarding the uniqueProperties.
 * 5. notUniquePropertiesOfNode is basically used to add new properties while on matching or creating a node.
 * 6. A bulkQueryExecutor is then used to execute queries in bulk.
 */
const bulkMergeOrCreateNode = function bulkMergeOrCreateNode(nodesToBeCreated, cb) {
  const queries = nodesToBeCreated.map(({properties, options = {}}) => {
    const uniqueConstraintsOn = options.uniqueConstraintsOn ? options.uniqueConstraintsOn : [];
    const uniqueProperties = _.pick(properties, ...uniqueConstraintsOn);
    const notUniquePropertiesOfNode = _.omit(properties, 'label', ...uniqueConstraintsOn);
    const label = properties.label;
    const query = `MERGE (n:${label} ${stringifyNodeProperties(_.assign({}, uniqueProperties))}) 
        ${prefixAndStringifyNodeProperties('ON MATCH SET ', 'n', notUniquePropertiesOfNode)} 
        ${prefixAndStringifyNodeProperties('ON CREATE SET ', 'n', notUniquePropertiesOfNode)} RETURN n`;
    return query;
  });

  this.bulkQueryExecutor(queries, cb);
};

module.exports = bulkMergeOrCreateNode;
