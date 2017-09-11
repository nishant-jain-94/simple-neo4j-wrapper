const should = require('should');
const async = require('async');

const Neo4jWrapper = require('../');
const neo4j = new Neo4jWrapper('bolt://localhost', 'neo4j', 'password');

const node = {label: 'concept', name: 'AngularJS', domain: 'frontend', level: 10, importance: 'high'};


describe('Find Nodes', () => {
  before((done) => {
    async.series([
      neo4j.dropAllConstraints.bind(neo4j),
      neo4j.queryExecutor.bind(neo4j, 'MATCH (n) DETACH DELETE n'),
    ],
    done);
  });

  it('should find nodes by property', (done) => {
    async.series([
      neo4j.createNode.bind(neo4j, node),
      neo4j.findNodes.bind(neo4j, node),
    ], (error, [resultsOfCreateNode, resultsOfFindNodeByProperties]) => {
      should.not.exist(error);
      should.exist(resultsOfCreateNode);
      should.exist(resultsOfFindNodeByProperties);
      resultsOfFindNodeByProperties.records.length.should.be.exactly(1);
      resultsOfFindNodeByProperties.records[0].length.should.be.exactly(1);
      resultsOfFindNodeByProperties.records[0].should.have.keys('keys', 'length', '_fields');
      resultsOfFindNodeByProperties.records[0].length.should.be.exactly(1);
      resultsOfFindNodeByProperties.records[0]._fields.length.should.be.exactly(1);
      resultsOfFindNodeByProperties.records[0]._fields[0].labels.should.not.be.empty();
      resultsOfFindNodeByProperties.records[0]._fields[0].labels.length.should.be.exactly(1);
      resultsOfFindNodeByProperties.records[0]._fields[0].labels[0].should.be.exactly('concept');
      resultsOfFindNodeByProperties.records[0]._fields[0].properties.should.not.be.empty();
      resultsOfFindNodeByProperties.records[0]._fields[0].properties.should.have.keys('level', 'importance', 'domain', 'name');
      const {level, importance, domain, name} = resultsOfFindNodeByProperties.records[0]._fields[0].properties;
      level.low.should.exactly(10);
      importance.should.be.exactly('high');
      domain.should.be.exactly('frontend');
      name.should.be.exactly('AngularJS');
      done();
    });
  });

  it('should find all the nodes', (done) => {
    neo4j.findNodes({}, (error, results) => {
      results.records.length.should.be.exactly(1);
      results.records[0].length.should.be.exactly(1);
      results.records[0].should.have.keys('keys', 'length', '_fields');
      results.records[0].length.should.be.exactly(1);
      results.records[0]._fields.length.should.be.exactly(1);
      results.records[0]._fields[0].labels.should.not.be.empty();
      results.records[0]._fields[0].labels.length.should.be.exactly(1);
      results.records[0]._fields[0].labels[0].should.be.exactly('concept');
      results.records[0]._fields[0].properties.should.not.be.empty();
      results.records[0]._fields[0].properties.should.have.keys('level', 'importance', 'domain', 'name');
      const {level, importance, domain, name} = results.records[0]._fields[0].properties;
      level.low.should.exactly(10);
      importance.should.be.exactly('high');
      domain.should.be.exactly('frontend');
      name.should.be.exactly('AngularJS');
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
