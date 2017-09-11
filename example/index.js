const Neo4jWrapper = require('../');
const neo4j = new Neo4jWrapper('bolt://localhost', 'neo4j', 'password');

neo4j.queryExecutor('MATCH (n) return count(n)', (err, results) => {
  if(!err) {
    console.log(results);
  }
});
