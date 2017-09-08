const request = require('request');

const getConstraints = function getConstraints(callback) {
  const base64EncodedCredentials = new Buffer(`${this.username}:${this.password}`).toString('base64');
  const options = {
    url: 'http://localhost:7474/db/data/schema/constraint',
    headers: {
      'Authorization': `Basic ${base64EncodedCredentials}`,
    },
  };
  request(options, (error, response) => {
    callback(error, JSON.parse(response.body));
  });
};

module.exports = getConstraints;
