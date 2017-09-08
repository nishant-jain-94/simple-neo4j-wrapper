require('should');
const async = require('async');

const Neo4jWrapper = require('../');
const neo4j = new Neo4jWrapper('bolt://localhost', 'neo4j', 'password');

describe('Bulk Merge Or Create Nodes', () => {
  before((done) => {
    async.series([
      neo4j.dropAllConstraints.bind(neo4j),
      neo4j.queryExecutor.bind(neo4j, 'MATCH (n) DETACH DELETE n'),
    ], done);
  });

  it("Should Create Nodes if it doesn't exists", (done) => {
    const nodes = [
      {
        properties: {
          label: 'concept',
          name: 'AngularJS',
          domain: 'frontend',
          level: 10,
          importance: 'high',
        },
        options: {
          uniqueConstraintsOn: ['name'],
        },
      },
      {
        properties: {
          label: 'concept',
          name: 'AngularJS1',
          domain: 'frontend',
          level: 10,
          importance: 'high',
        },
        options: {
          uniqueConstraintsOn: ['name'],
        },
      },
    ];
    neo4j.bulkMergeOrCreateNode(nodes, (err, results) => {
      const record = results[0].records[0];
      record.length.should.be.exactly(1);
      record._fields[0].properties.importance.should.be.exactly('high');
      record._fields[0].properties.domain.should.be.exactly('frontend');
      record._fields[0].properties.name.should.be.exactly('AngularJS');
      record._fields[0].labels[0].should.be.exactly('concept');
      done();
    });
  });

  it('Should Update Node if it already exists', (done) => {
    const nodes = [{
      properties: {
        label: 'concept',
        name: 'AngularJSTest',
        domain: 'frontend',
        level: 10,
        importance: 'high',
      },
      options: {
        uniqueConstraintsOn: ['name'],
      },
    }, {
      properties: {
        label: 'concept',
        name: 'AngularJSTest',
        domain: 'FrontEndProgramming',
        level: 8,
        importance: 'high',
      },
      options: {
        uniqueConstraintsOn: ['name'],
      },
    }];

    async.series([
      neo4j.bulkMergeOrCreateNode.bind(neo4j, nodes),
    ], (err, results) => {
      [resultOfFirstOperation, resultOfSecondOperation] = results[0];
      recordOfFirstOperation = resultOfFirstOperation.records[0];
      recordOfSecondOperation = resultOfSecondOperation.records[0];
      recordOfFirstOperation._fields[0].identity.low.should.be.exactly(recordOfSecondOperation._fields[0].identity.low);
      recordOfFirstOperation._fields[0].labels[0].should.be.exactly('concept');
      recordOfSecondOperation._fields[0].labels[0].should.be.exactly('concept');
      recordOfFirstOperation._fields[0].properties.name.should.be.exactly(recordOfSecondOperation._fields[0].properties.name);
      recordOfSecondOperation._fields[0].properties.domain.should.be.exactly('FrontEndProgramming');
      recordOfFirstOperation._fields[0].properties.domain.should.be.exactly('frontend');
      done();
    });
  });

  after((done) => {
    neo4j.queryExecutor('MATCH (n) DETACH DELETE n', done);
  });
});
