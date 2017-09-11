require('should');
const async = require('async');

const Neo4jWrapper = require('../');
const neo4j = new Neo4jWrapper('bolt://localhost', 'neo4j', 'password');

describe('Create Nodes and Relations from CSV', () => {
  before((done) => {
    async.series([
      neo4j.dropAllConstraints.bind(neo4j),
      neo4j.queryExecutor.bind(neo4j, 'MATCH (n) DETACH DELETE n'),
    ], done);
  });

  it('Should create nodes from the supplied csv file', (done) => {
    neo4j.createNodesFromCsv('./conceptNodes.test.csv', done);
  });

  it('should create relations from the supplied csv file', (done) => {
    neo4j.createRelationsFromCsv('./conceptRelations.test.csv', done);
  });

  after((done) => {
    async.series([
      neo4j.dropAllConstraints.bind(neo4j),
      neo4j.queryExecutor.bind(neo4j, 'MATCH (n) DETACH DELETE n'),
    ], done);
  });
});
