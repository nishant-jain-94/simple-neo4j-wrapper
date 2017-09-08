const request = require('request');
const log = require('../commons/logger')('Get Constraints');

const getConstraints = function getConstraints(callback) {
  const base64EncodedCredentials = new Buffer(`${this.username}:${this.password}`).toString('base64');
  log.debug(base64EncodedCredentials);
  const options = {
    url: 'http://localhost:7474/db/data/schema/constraint',
    headers: {
      'Authorization': `Basic ${base64EncodedCredentials}`,
    },
  };
  request(options, (error, response) => {
    log.debug(options);
    log.error(error);
    log.debug(response);
    callback(error, JSON.parse(response.body));
  });
};

module.exports = getConstraints;
