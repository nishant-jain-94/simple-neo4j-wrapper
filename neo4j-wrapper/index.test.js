const should = require('should');

const Neo4jWrapper = require('./');
const neo4j = new Neo4jWrapper('bolt://localhost', 'neo4j', 'password');

describe('Neo4j Wrapper', () => {
  it('Should have createNode', (done) => {
    should.exist(neo4j.createNode);
    done();
  });

  it('Should have createNodesFromCsv', (done) => {
    should.exist(neo4j.createNodesFromCsv);
    done();
  });

  it('Should have createRelationshipsFromCsv', (done) => {
    should.exist(neo4j.createRelationsFromCsv);
    done();
  });

  it('Should have createRelation', (done) => {
    should.exist(neo4j.createRelation);
    done();
  });

  it('Should have createUniqueConstraintOnNode', (done) => {
    should.exist(neo4j.createUniqueConstraintOnNode);
    done();
  });

  it('Should have createNodesAndRelationsFromTriple', (done) => {
    should.exist(neo4j.createNodesAndRelationsFromTriple);
    done();
  });

  it('Should have deleteAllNodes', (done) => {
    should.exist(neo4j.deleteAllNodes);
    done();
  });

  it('Should have dropAllConstraints', (done) => {
    should.exist(neo4j.dropAllConstraints);
    done();
  });

  it('Should have findNodes', (done) => {
    should.exist(neo4j.findNodes);
    done();
  });

  it('Should have findOrCreateNode', (done) => {
    should.exist(neo4j.findOrCreateNode);
    done();
  });

  it('Should have getConstraints', (done) => {
    should.exist(neo4j.getConstraints);
    done();
  });

  it('Should have getCountOfAllNodes', (done) => {
    should.exist(neo4j.getCountOfAllNodes);
    done();
  });

  it('Should have mergeOrCreateNode', (done) => {
    should.exist(neo4j.mergeOrCreateNode);
    done();
  });

  it('Should have mergeOrCreateRelation', (done) => {
    should.exist(neo4j.mergeOrCreateRelation);
    done();
  });

  it('Should have queryExecutor', (done) => {
    should.exist(neo4j.queryExecutor);
    done();
  });

  it('Should have bulkQueryExecutor', (done) => {
    should.exist(neo4j.bulkQueryExecutor);
    done();
  });

  it('Should have bulkMergeOrCreateNode', (done) => {
    should.exist(neo4j.bulkMergeOrCreateNode);
    done();
  });

  it('Should have bulkMergeOrCreateRelation', (done) => {
    should.exist(neo4j.bulkMergeOrCreateRelation);
    done();
  });
});
