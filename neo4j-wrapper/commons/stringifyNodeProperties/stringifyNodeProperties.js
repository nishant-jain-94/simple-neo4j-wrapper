const _ = require('lodash');

const stringifyNodeProperties = function stringifyNodeProperties(properties, exclusionList = []) {
  const propertiesToBeStringified = _.omit(properties, ...exclusionList);
  const stringifiedNodeProperties =  JSON.stringify(propertiesToBeStringified).replace(/\"(\w+)\":/g, '$1:');
  return stringifiedNodeProperties;
};

module.exports = stringifyNodeProperties;
