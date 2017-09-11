const _ = require('lodash');
const async = require('async');

/**
 * Creates Nodes and Relationship from a triple.
 * A triple having the following structure.
 * A triple with three properties propertiesOfSubject, propertiesOfObject, propertiesOfPredicate
 * With of these three objects having sub properties name and label.
 * @param {Object} triple 
 * @param {*} cb
 */
const createNodesAndRelationsFromTriple = function createNodesAndRelationsFromTriple(triple, cb) {
  const operations = [];

  if(_.get(triple, 'propertiesOfSubject.label')) {
    operations.push(this.findOrCreateNode.bind(this, triple.propertiesOfSubject));
  }

  if(_.get(triple, 'propertiesOfObject.label')) {
    operations.push(this.findOrCreateNode.bind(this, triple.propertiesOfObject));
  }

  if(_.get(triple, 'propertiesOfPredicate.relation')) {
    const relation = {
      nameOfSourceNode: triple.propertiesOfSubject.name,
      labelOfSourceNode: triple.propertiesOfSubject.label,
      nameOfTargetNode: triple.propertiesOfObject.name,
      labelOfTargetNode: triple.propertiesOfObject.label,
    };
    _.assign(relation, triple.propertiesOfPredicate);
    operations.push(this.createRelation.bind(this, relation));
  }

  return async.series(operations, cb);
};

module.exports = createNodesAndRelationsFromTriple;
