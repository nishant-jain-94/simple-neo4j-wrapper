const createUniqueConstraintOnNode = function createUniqueConstraintOnNode(label, callback) {
  const query = `CREATE CONSTRAINT ON (${label}:${label}) ASSERT ${label}.name IS UNIQUE`;
  this.queryExecutor(query, callback);
};

module.exports = createUniqueConstraintOnNode;
