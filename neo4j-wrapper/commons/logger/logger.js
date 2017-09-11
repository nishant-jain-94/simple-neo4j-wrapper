const bunyan = require('bunyan');
const bformat = require('bunyan-format');
const formatOut = bformat({ outputMode: 'bunyan' });

const logger = (name) => {
  let log;
  if(process.env.NODE_ENV === 'test') {
    log = bunyan.createLogger({ name: name, stream: formatOut, level: 'fatal' });
  } else {
    log = bunyan.createLogger({ name: name, stream: formatOut });
  }
  return log;
};

module.exports = logger;
