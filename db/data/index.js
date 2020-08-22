/* this imports data from the 2 index.js' that are inside both he test-data and dev-data folders, 
then exports 'development' and 'test' data to the model(or is it the knex to seed). This is a go between file.
*/

const ENV = process.env.NODE_ENV || 'development';
const testData = require('./test-data');
const devData = require('./dev-data');

const data = {
  development: devData,
  test: testData,
  production: devData
};

module.exports = data[ENV];