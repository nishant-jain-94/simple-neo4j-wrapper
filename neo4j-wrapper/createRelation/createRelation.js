const _ = require('lodash');

const createRelation = function createRelation(properties, callback) {
  const propertiesOfRelation = _.omit(properties, ['nameOfSourceNode', 'labelOfSourceNode', 'relation', 'nameOfTargetNode', 'labelOfTargetNode']);
  const propertiesOfRelationStringified = JSON
    .stringify(propertiesOfRelation)
    .replace(/\"(\w+)\":/g, '$1:');

  const query = `MATCH (m:${properties.labelOfSourceNode} {name: "${properties.nameOfSourceNode}"}),
                (n:${properties.labelOfTargetNode} {name: "${properties.nameOfTargetNode}"}) \
	              CREATE UNIQUE (m)-[relation:${properties.relation} ${propertiesOfRelationStringified}]->(n) \ 
                return relation`;

  return this.queryExecutor(query, callback);
};

module.exports = createRelation;
