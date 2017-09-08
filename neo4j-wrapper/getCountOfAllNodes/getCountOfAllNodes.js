const getCountOfAllNodes = function getCountOfAllNodes(cb) {
  const query = 'MATCH (n) return count(n)';
  this.queryExecutor(query, cb);
};

module.exports = getCountOfAllNodes;
