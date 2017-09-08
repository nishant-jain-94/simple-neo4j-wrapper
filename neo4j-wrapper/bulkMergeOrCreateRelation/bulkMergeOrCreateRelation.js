const _ = require('lodash');
const {stringifyNodeProperties, prefixAndStringifyNodeProperties} = require('../commons');

/**
 * Creates a Relation between the source and the target node If it doesnt exists in bulk.
 * 
 * @param {Object} relations - Refers to the array of relationship objects.
 * @param {Function} cb - Refers to the callback to be called after mergeOrCreateRelation
 *  
 * MergeOrCreateRelation maps over all the relations and does the following:
 * 1. Fetches all the unique properties on source node.
 * 2. Fetches all the unique properties on target node.
 * 3. Fetches all the properties on the relation object excluding the key named 'relation'.
 * 4. Relationship is set to the value of relation.
 * 5. Creates a query by replacing it with appropriate properties.
 * 6. All the queries are then collated and is executed using bulkQueryExecutor.
 */
const mergeOrCreateRelation = function mergeOrCreateRelation(relations, cb) {
  const queries = relations.map((properties) => {
    const {source, target, relation} = properties;
    const uniquePropertiesOnSourceNode = _.pick(source.properties, ...source.options.uniqueConstraintsOn);
    const uniquePropertiesOnTargetNode = _.pick(target.properties, ...target.options.uniqueConstraintsOn);
    const propertiesOfRelationship = _.omit(relation.properties, 'relation');
    const relationship = relation.properties.relation;
    const exclusionList = ['label'];
    const query = `MATCH (source:${source.properties.label} ${stringifyNodeProperties(uniquePropertiesOnSourceNode, exclusionList)}), 
                    (target:${source.properties.label} ${stringifyNodeProperties(uniquePropertiesOnTargetNode, exclusionList)})
                    MERGE (source)-[relation:${relationship}]->(target)
                    ${prefixAndStringifyNodeProperties('ON MATCH SET ', 'relation', propertiesOfRelationship)} 
                    ${prefixAndStringifyNodeProperties('ON CREATE SET ', 'relation', propertiesOfRelationship)} 
                    RETURN source, target, relation`;
    return query;
  });

  this.bulkQueryExecutor(queries, cb);
};

module.exports = mergeOrCreateRelation;
