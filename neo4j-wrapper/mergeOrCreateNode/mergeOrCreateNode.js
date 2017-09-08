const _ = require('lodash');
const {stringifyNodeProperties, prefixAndStringifyNodeProperties} = require('../commons');


const mergeOrCreateNode = function mergeOrCreateNode({properties, options = {}}, cb) {
  let uniqueConstraintsOn = [];
  if(_.get(options, 'uniqueConstraintsOn')) {
    uniqueConstraintsOn = options.uniqueConstraintsOn;
  }
  const uniqueProperties = _.pick(properties, ...uniqueConstraintsOn);
  const nodeProperties = _.omit(properties, 'label', ...uniqueConstraintsOn);
  const {label} = properties;
  const query = `MERGE (n:${label} ${stringifyNodeProperties(_.assign({}, uniqueProperties))}) 
    ${prefixAndStringifyNodeProperties('ON MATCH SET ', 'n', nodeProperties)} 
    ${prefixAndStringifyNodeProperties('ON CREATE SET ', 'n', nodeProperties)} RETURN n`;
  this.queryExecutor(query, cb);
};

module.exports = mergeOrCreateNode;
