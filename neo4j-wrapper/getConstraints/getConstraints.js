const axios = require('axios');
const log = require('../commons/logger')('Get Constraints');

const getConstraints = function getConstraints(callback) {
  const base64EncodedCredentials = new Buffer(`${this.username}:${this.password}`).toString('base64');
  log.debug(base64EncodedCredentials);
  const options = {
    url: 'http://127.0.0.1:7474/db/data/schema/constraint',
    headers: {
      'Authorization': `Basic ${base64EncodedCredentials}`,
    },
  };

  axios.request(options)
    .then((response) => callback(null, response.body))
    .catch((error) => callback(error, null));
};

module.exports = getConstraints;
