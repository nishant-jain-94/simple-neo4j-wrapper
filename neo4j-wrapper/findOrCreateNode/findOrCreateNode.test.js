const should = require('should');
const async = require('async');

const Neo4jWrapper = require('../');
const neo4j = new Neo4jWrapper('bolt://localhost', 'neo4j', 'password');

const node = {label: 'concept', name: 'AngularJS', domain: 'frontend', level: 10, importance: 'high'};

describe('FindOrCreateNode', () => {
  before((done) => {
    async.series([
      neo4j.dropAllConstraints.bind(neo4j),
      neo4j.queryExecutor.bind(neo4j, 'MATCH (n) DETACH DELETE n'),
      neo4j.createNode.bind(neo4j, node),
    ],
    done);
  });

  it('Should find the existing node and not trigger createNode when node exist', (done) => {
    neo4j.findOrCreateNode(node, (error, {records}) => {
      should.not.exists(error);
      records.should.not.be.empty();
      records.length.should.be.exactly(1);
      records[0].should.have.keys('keys', 'length', '_fields');
      records[0].length.should.be.exactly(1);
      records[0]._fields.length.should.be.exactly(1);
      records[0]._fields[0].labels.should.not.be.empty();
      records[0]._fields[0].labels.length.should.be.exactly(1);
      records[0]._fields[0].labels[0].should.be.exactly('concept');
      records[0]._fields[0].properties.should.not.be.empty();
      records[0]._fields[0].properties.should.have.keys('level', 'importance', 'domain', 'name');
      const {level, importance, domain, name} = records[0]._fields[0].properties;
      level.low.should.exactly(10);
      importance.should.be.exactly('high');
      domain.should.be.exactly('frontend');
      name.should.be.exactly('AngularJS');
      done();
    });
  });

  it("Should trigger createNode when node doesn't exist", (done) => {
    const nodeToBeCreatedIfDoesntExists = {label: 'concept', name: 'ReactJS', domain: 'frontend', level: 10, importance: 'high'};
    neo4j.findOrCreateNode(nodeToBeCreatedIfDoesntExists, (error, {records}) => {
      should.not.exists(error);
      records.should.not.be.empty();
      records.length.should.be.exactly(1);
      records[0].should.have.keys('keys', 'length', '_fields');
      records[0].length.should.be.exactly(1);
      records[0]._fields.length.should.be.exactly(1);
      records[0]._fields[0].labels.should.not.be.empty();
      records[0]._fields[0].labels.length.should.be.exactly(1);
      records[0]._fields[0].labels[0].should.be.exactly('concept');
      records[0]._fields[0].properties.should.not.be.empty();
      records[0]._fields[0].properties.should.have.keys('level', 'importance', 'domain', 'name');
      const {level, importance, domain, name} = records[0]._fields[0].properties;
      level.low.should.exactly(10);
      importance.should.be.exactly('high');
      domain.should.be.exactly('frontend');
      name.should.be.exactly('ReactJS');
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
