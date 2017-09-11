const neo4j = require('neo4j-driver').v1;
const log = require('./commons/logger')('Neo4j Wrapper');

process.on('unhandledRejection', (error) => {
  log.error(error);
});

class Neo4jWrapper {
  /**
   * Creates an instance of Neo4jWrapper.
   * 
   * @param {String} host 
   * @param {String} username 
   * @param {String} password 
   * @memberof Neo4jWrapper
   */
  constructor(host, username, password) {
    this.host = host;
    this.username = username;
    this.password = password;
    this.driver = this._initializeDriver();
    this.session = this._initializeSession();
  }

  /**
   * Creates an instance of Neo4j Driver.
   * 
   * @returns Neo4jDriver
   * @memberof Neo4jWrapper
   */
  _initializeDriver() {
    if(Neo4jWrapper.drivers.get(this.host)) {
      this.driver = Neo4jWrapper.drivers.get(this.host);
    } else {
      this.driver = neo4j.driver(this.host, neo4j.auth.basic(this.username, this.password));
      Neo4jWrapper.drivers.set(this.host, this._driver);
    }
    return this.driver;
  }

  /**
   * Creates an instance of Neo4j Session.
   * 
   * @returns Neo4jSession
   * @memberof Neo4jWrapper
   */
  _initializeSession() {
    if(Neo4jWrapper.sessions.get(this.host)) {
      this.session = Neo4jWrapper.sessions.get(this.host);
    } else {
      this.session = this.driver.session();
      Neo4jWrapper.sessions.set(this.host, this.session);
    }
    return this.session;
  }
}

Neo4jWrapper.drivers = new Map();
Neo4jWrapper.sessions = new Map();

Neo4jWrapper.prototype.createNode = require('./createNode');
Neo4jWrapper.prototype.createNodesFromCsv = require('./createNodesAndRelationsFromCsv').createNodesFromCsv;
Neo4jWrapper.prototype.createRelationsFromCsv = require('./createNodesAndRelationsFromCsv').createRelationsFromCsv;
Neo4jWrapper.prototype.createNodesAndRelationsFromTriple = require('./createNodesAndRelationsFromTriple');
Neo4jWrapper.prototype.createRelation = require('./createRelation');
Neo4jWrapper.prototype.createUniqueConstraintOnNode = require('./createUniqueConstraintOnNode');
Neo4jWrapper.prototype.deleteAllNodes = require('./deleteAllNodes');
Neo4jWrapper.prototype.dropAllConstraints = require('./dropAllConstraints');
Neo4jWrapper.prototype.findNodes = require('./findNodes');
Neo4jWrapper.prototype.findOrCreateNode = require('./findOrCreateNode');
Neo4jWrapper.prototype.getConstraints = require('./getConstraints');
Neo4jWrapper.prototype.getCountOfAllNodes = require('./getCountOfAllNodes');
Neo4jWrapper.prototype.mergeOrCreateNode = require('./mergeOrCreateNode');
Neo4jWrapper.prototype.mergeOrCreateRelation = require('./mergeOrCreateRelation');
Neo4jWrapper.prototype.queryExecutor = require('./queryExecutor');
Neo4jWrapper.prototype.bulkMergeOrCreateNode = require('./bulkMergeOrCreateNode');
Neo4jWrapper.prototype.bulkMergeOrCreateRelation = require('./bulkMergeOrCreateRelation');
Neo4jWrapper.prototype.bulkQueryExecutor = require('./bulkQueryExecutor');
Neo4jWrapper.prototype.queryExecutorWithParams = require('./queryExecutorWithParams');

module.exports = Neo4jWrapper;
