#!/usr/bin/env node
const child_process = require("child_process");

const {getPkgJson, getLernaJson} = require('../lib/npm-package.js')

async function main() {
  const pkg = await getPkgJson();
  const lerna = await getLernaJson();

  if (pkg.version !== lerna.version) {
    console.log("Ignoring package since it wasn't updated in the last version")
    return;
  }

  try {
    console.log('Publishing...')
    child_process.execSync('npm publish', {stdio: 'inherit'})
  } catch (e) {
    console.error('There was an error publishing');
    console.error(e)
    process.exit(1);
  }
}

main();
