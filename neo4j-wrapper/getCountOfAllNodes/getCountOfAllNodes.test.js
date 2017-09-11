const should = require('should');
const async = require('async');

const Neo4jWrapper = require('../');
const neo4j = new Neo4jWrapper('bolt://localhost', 'neo4j', 'password');

const node = {label: 'concept', name: 'AngularJS', domain: 'frontend', level: 10, importance: 'high'};

describe('Count of all Nodes', () => {
  before((done) => {
    async.series([
      neo4j.deleteAllNodes.bind(neo4j),
      neo4j.createNode.bind(neo4j, node),
    ], done);
  });

  it('Should get count of all the nodes', (done) => {
    neo4j.getCountOfAllNodes((err, result) => {
      should.not.exist(err);
      should.exist(result);
      result.records[0]._fieldLookup['count(n)'].should.be.exactly(0);
      done();
    });
  });

  after((done) => {
    neo4j.deleteAllNodes(done);
  });
});
