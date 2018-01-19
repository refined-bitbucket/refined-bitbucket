const fs = require('fs');
const semver = require('semver');

// Write package.json's versino to the src/manifest.json
const packageJson = require('../package');
const validVersion = semver.valid(packageJson.version);
console.log(validVersion);

const manifestLocation = '../src/manifest';
const manifest = require(manifestLocation);
manifest.version = validVersion;

fs.writeFileSync('src/manifest.json', JSON.stringify(manifest, null, '  '));
