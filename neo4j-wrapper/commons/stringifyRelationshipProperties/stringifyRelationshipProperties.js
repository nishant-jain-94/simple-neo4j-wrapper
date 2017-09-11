const _ = require('lodash');

const stringifyRelationshipProperties = function stringifyRelationshipProperties(properties, exclusionList = []) {
  const propertiesToBeStringified = _.omit(properties, ...exclusionList);
  const stringifiedRelationshipProperties = JSON.stringify(propertiesToBeStringified).replace(/\"(\w+)\":/g, '$1:');
  return stringifiedRelationshipProperties;
};

module.exports = stringifyRelationshipProperties;
