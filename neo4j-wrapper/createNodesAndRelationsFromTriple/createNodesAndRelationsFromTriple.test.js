const should = require('should');
const async = require('async');

const Neo4jWrapper = require('../');
const neo4j = new Neo4jWrapper('bolt://localhost', 'neo4j', 'password');

describe('Nodes and Relations from Triples', () => {
  before((done) => {
    async.series([
      neo4j.dropAllConstraints.bind(neo4j),
      neo4j.queryExecutor.bind(neo4j, 'MATCH (n) DETACH DELETE n'),
    ], done);
  });

  it('Should create Nodes and Relations from Relations', (done) => {
    const triple = {
      propertiesOfSubject: {
        label: 'testConcept',
        name: 'AngularJS',
      },
      propertiesOfObject: {
        label: 'testConcept',
        name: 'TwoWayBinding',
      },
      propertiesOfPredicate: {
        relation: 'subConceptOf',
      },
    };

    neo4j.createNodesAndRelationsFromTriple(triple, (err, data) => {
      should.not.exist(err);
      should.exist(data);
      const [subject, object, predicate] = data;
      subject.summary.counters._stats.nodesCreated.should.be.exactly(1);
      subject.summary.counters._stats.labelsAdded.should.be.exactly(1);
      subject.records[0]._fields[0].labels[0].should.be.exactly('testConcept');
      subject.records[0]._fields[0].properties.name.should.be.exactly('AngularJS');
      object.summary.counters._stats.nodesCreated.should.be.exactly(1);
      object.summary.counters._stats.labelsAdded.should.be.exactly(1);
      object.records[0]._fields[0].labels[0].should.be.exactly('testConcept');
      object.records[0]._fields[0].properties.name.should.be.exactly('TwoWayBinding');
      predicate.records[0]._fields[0].type.should.be.exactly('subConceptOf');
      predicate.summary.counters._stats.relationshipsCreated.should.be.exactly(1);
      done(err, data);
    });
  });

  it('Should create Nodes in the absence of Relations', (done) => {
    const triple = {
      propertiesOfSubject: {
        label: 'testConcept',
        name: 'AngularJS',
      },
      propertiesOfObject: {
        label: 'testConcept',
        name: 'TwoWayBinding',
      },
      propertiesOfPredicate: {
        relation: '',
      },
    };

    neo4j.createNodesAndRelationsFromTriple(triple, (err, data) => {
      should.not.exist(err);
      should.exist(data);
      const [subject, object] = data;
      subject.summary.counters._stats.nodesCreated.should.be.exactly(0);
      subject.summary.counters._stats.labelsAdded.should.be.exactly(0);
      subject.records[0]._fields[0].labels[0].should.be.exactly('testConcept');
      subject.records[0]._fields[0].properties.name.should.be.exactly('AngularJS');
      object.summary.counters._stats.nodesCreated.should.be.exactly(0);
      object.summary.counters._stats.labelsAdded.should.be.exactly(0);
      object.records[0]._fields[0].labels[0].should.be.exactly('testConcept');
      object.records[0]._fields[0].properties.name.should.be.exactly('TwoWayBinding');
      done(err, data);
    });
  });

  after((done) => {
    async.series([
      neo4j.dropAllConstraints.bind(neo4j),
      neo4j.queryExecutor.bind(neo4j, 'MATCH (n) DETACH DELETE n'),
    ], done);
  });
});
