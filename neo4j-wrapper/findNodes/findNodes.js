const _ = require('lodash');

const findNodes = function findNodes(properties, callback) {
  let {label} = properties;
  const propertiesOfNode = JSON.stringify(_.pick(properties, 'name')).replace(/\"(\w+)\":/g, '$1:');
  label = label ? ':'.concat(label) : '';
  const query = `MATCH (n${label} ${propertiesOfNode}) return n`;
  this.queryExecutor(query, callback);
};

module.exports = findNodes;
