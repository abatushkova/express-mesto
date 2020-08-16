const fs = require('fs').promises;

const readFile = file => {
  return fs.readFile(file);
};

module.exports = readFile;
