const should = require('should');
const async = require('async');

const Neo4jWrapper = require('../');
const neo4j = new Neo4jWrapper('bolt://localhost', 'neo4j', 'password');

const sourceNode = {label: 'concept', name: 'AngularJS', domain: 'frontend', level: 10, importance: 'high'};
const targetNode = {label: 'concept', name: 'MEANStack', domain: 'frontend', level: 10, importance: 'high'};


const relation = {
  nameOfSourceNode: 'AngularJS',
  labelOfSourceNode: 'concept',
  relation: 'subConceptOf',
  nameOfTargetNode: 'MEANStack',
  labelOfTargetNode: 'concept',
  isNecessary: true,
  importance: 'high',
};

describe('Create Relations', () => {
  before((done) => {
    async.series([
      neo4j.dropAllConstraints.bind(neo4j),
      neo4j.queryExecutor.bind(neo4j, 'MATCH (n) DETACH DELETE n'),
    ],
    done);
  });

  it('Should create relations', (done) => {
    async.series([
      neo4j.createNode.bind(neo4j, sourceNode),
      neo4j.createNode.bind(neo4j, targetNode),
      neo4j.createRelation.bind(neo4j, relation),
    ], (error, [resultsOfCreateSourceNode, resultsOfCreateTargetNode, resultsOfCreateRelation]) => {
      should.not.exist(error);
      should.exist(resultsOfCreateSourceNode);
      should.exist(resultsOfCreateTargetNode);
      resultsOfCreateRelation.records.length.should.be.exactly(1);
      resultsOfCreateRelation.records[0].should.have.keys('keys', 'length', '_fields');
      resultsOfCreateRelation.records[0]._fields.length.should.be.exactly(1);
      resultsOfCreateRelation.records[0]._fields[0].type.should.be.exactly('subConceptOf');
      resultsOfCreateRelation.records[0]._fields[0].properties.should.have.keys('importance', 'isNecessary');
      resultsOfCreateRelation.records[0]._fields[0].properties.importance.should.be.exactly('high');
      resultsOfCreateRelation.records[0]._fields[0].properties.isNecessary.should.be.exactly(true);
      done();
    });
  });

  it('Should create unique relations', (done) => {
    neo4j.createRelation(relation, (error, {records}) => {
      should.not.exist(error);
      records.length.should.be.exactly(1);
      records[0].length.should.be.exactly(1);
      records[0]._fields.length.should.be.exactly(1);
      records[0]._fields[0].type.should.be.exactly('subConceptOf');
      records[0]._fields[0].properties.should.have.keys('importance', 'isNecessary');
      records[0]._fields[0].properties.importance.should.be.exactly('high');
      records[0]._fields[0].properties.isNecessary.should.be.exactly(true);
      done();
    });
  });

  after((done) => {
    async.series([
      neo4j.dropAllConstraints.bind(neo4j),
      neo4j.queryExecutor.bind(neo4j, 'MATCH (n) DETACH DELETE n'),
    ],
    done);
  });
});
