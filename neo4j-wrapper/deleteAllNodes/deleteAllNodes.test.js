const should = require('should');
const async = require('async');

const Neo4jWrapper = require('../');
const neo4j = new Neo4jWrapper('bolt://localhost', 'neo4j', 'password');

describe('Delete All Nodes', () => {
  it('should delete all nodes', (done) =>  {
    async.series([
      neo4j.deleteAllNodes.bind(neo4j),
      neo4j.getCountOfAllNodes.bind(neo4j),
    ], (err, result) => {
      should.not.exist(err);
      should.exist(result);
      result[1].records[0]._fieldLookup['count(n)'].should.be.exactly(0);
      done();
    });
  });
});
