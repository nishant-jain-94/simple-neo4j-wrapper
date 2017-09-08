const deleteAllNodes = function deleteAllNodes(cb) {
  const query = 'MATCH (n) DETACH DELETE n';
  this.queryExecutor(query, cb);
};

module.exports = deleteAllNodes;
