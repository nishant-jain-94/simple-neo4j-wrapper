const _ = require('lodash');
const {stringifyNodeProperties, prefixAndStringifyNodeProperties} = require('../commons');


const mergeOrCreateRelation = function mergeOrCreateRelation(properties, cb) {
  const {source, target, relation} = properties;
  const labelOfSource = source.properties.label;
  const labelOfTarget = target.properties.label;
  const propertiesOfSource = _.pick(source.properties, ...source.options.uniqueConstraintsOn);
  const propertiesOfTarget = _.pick(target.properties, ...target.options.uniqueConstraintsOn);
  const propertiesOfRelationship = _.omit(relation.properties, 'relation');
  const relationship = relation.properties.relation;
  const exclusionList = ['label'];
  const query = `MATCH (source:${labelOfSource} ${stringifyNodeProperties(propertiesOfSource, exclusionList)}), 
                   (target:${labelOfTarget} ${stringifyNodeProperties(propertiesOfTarget, exclusionList)})
                   MERGE (source)-[relation:${relationship}]->(target)
                   ${prefixAndStringifyNodeProperties('ON MATCH SET ', 'relation', propertiesOfRelationship)} 
                   ${prefixAndStringifyNodeProperties('ON CREATE SET ', 'relation', propertiesOfRelationship)} 
                   RETURN source, target, relation`;
  this.queryExecutor(query, cb);
};

module.exports = mergeOrCreateRelation;
