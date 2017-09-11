const async = require('async');
const should = require('should');

const Neo4jWrapper = require('../');
const neo4j = new Neo4jWrapper('bolt://localhost', 'neo4j', 'password');

const source = {
  properties: {
    label: 'conceptTest',
    name: 'Javascript',
    domain: 'frontend and backend',
    level: 10,
    importance: 'high',
  },
  options: {
    uniqueConstraintsOn: [
      'name',
    ],
  },
};

const target = {
  properties: {
    label: 'conceptTest',
    name: 'AngularJS',
    domain: 'frontend',
    level: 10,
    importance: 'high',
  },
  options: {
    uniqueConstraintsOn: [
      'name',
    ],
  },
};

describe('Bulk Merge or Create Relations', () => {
  before((done) => {
    async.series([
      neo4j.dropAllConstraints.bind(neo4j),
      neo4j.queryExecutor.bind(neo4j, 'MATCH (n) DETACH DELETE n'),
      neo4j.mergeOrCreateNode.bind(neo4j, source),
      neo4j.mergeOrCreateNode.bind(neo4j, target),
    ], done);
  });

  it("Should create realtions if it doesn't exists", (done) => {
    const triples = [{
      source: {
        properties: {
          label: 'conceptTest',
          name: 'Javascript',
        },
        options: {
          uniqueConstraintsOn: [
            'name',
          ],
        },
      },
      target: {
        properties: {
          label: 'conceptTest',
          name: 'AngularJS',
        },
        options: {
          uniqueConstraintsOn: [
            'name',
          ],
        },
      },
      relation: {
        properties: {
          relation: 'subConceptOf',
        },
        options: {
          uniqueConstraintsOn: [
            'name',
          ],
        },
      },
    }];

    neo4j.bulkMergeOrCreateRelation(triples, (err, results) => {
      should.not.exist(err);
      should.exist(results);
      const record = results[0].records[0];
      record.length.should.be.exactly(3);
      const [fieldsOfSource, fieldsOfTarget, fieldsOfRelation] = record._fields;
      fieldsOfSource.labels[0].should.be.exactly('conceptTest');
      fieldsOfTarget.labels[0].should.be.exactly('conceptTest');
      fieldsOfRelation.type.should.be.exactly('subConceptOf');
      fieldsOfSource.properties.name.should.be.exactly('Javascript');
      fieldsOfTarget.properties.name.should.be.exactly('AngularJS');
      done();
    });
  });

  it('Should merge the properties of a relation if it already exists', (done) => {
    const triples = [{
      source: {
        properties: {
          label: 'conceptTest',
          name: 'Javascript',
        },
        options: {
          uniqueConstraintsOn: [
            'name',
          ],
        },
      },
      target: {
        properties: {
          label: 'conceptTest',
          name: 'AngularJS',
        },
        options: {
          uniqueConstraintsOn: [
            'name',
          ],
        },
      },
      relation: {
        properties: {
          relation: 'subConceptOf',
          importance: 'high',
        },
        options: {
          uniqueConstraintsOn: [
            'name',
          ],
        },
      },
    }];

    neo4j.bulkMergeOrCreateRelation(triples, (err, results) => {
      should.not.exist(err);
      should.exist(results);
      const record = results[0].records[0];
      record.length.should.be.exactly(3);
      const [fieldsOfSource, fieldsOfTarget, fieldsOfRelation] = record._fields;
      fieldsOfSource.labels[0].should.be.exactly('conceptTest');
      fieldsOfTarget.labels[0].should.be.exactly('conceptTest');
      fieldsOfRelation.type.should.be.exactly('subConceptOf');
      fieldsOfRelation.properties.importance.should.be.exactly('high');
      fieldsOfSource.properties.name.should.be.exactly('Javascript');
      fieldsOfTarget.properties.name.should.be.exactly('AngularJS');
      done();
    });
  });

  after((done) => {
    async.series([
      neo4j.dropAllConstraints.bind(neo4j),
      neo4j.queryExecutor.bind(neo4j, 'MATCH (n) DETACH DELETE n'),
    ], done);
  });
});
