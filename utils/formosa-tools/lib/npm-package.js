const child_process = require("child_process");
const path = require("path");
const findUp = require("find-up");

module.exports = {
  getLernaJson: () => {
    return findUp('lerna.json').then(require);
  },
  getPkgJson: () => {
    return require(path.join(process.cwd(), '/package.json'));
  }
};
