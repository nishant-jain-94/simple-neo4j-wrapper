const _  = require('lodash');

const prefixAndStringifyNodeProperties = function prefixAndStringifyNodeProperties(stringPrefix, propertyPrefix, properties, exclusionList = []) {
  const propertiesToBeStringified = _.omit(properties, ...exclusionList);
  let stringifiedProperties = JSON.stringify(propertiesToBeStringified).replace(/\"(\w+)\":/g, `${propertyPrefix}.$1=`).slice(1, -1);
  if(stringifiedProperties) {
    stringifiedProperties = `${stringPrefix}${stringifiedProperties}`;
  }
  return stringifiedProperties;
};

module.exports = prefixAndStringifyNodeProperties;
