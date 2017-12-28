const fs = require('fs');
const semver = require('semver');

// Write package.json's versino to the extension/manifest.json
const packageJson = require('../package');
const validVersion = semver.valid(packageJson.version);
console.log(validVersion);

const manifestLocation = '../extension/manifest';
const manifest = require(manifestLocation);
manifest.version = validVersion;

fs.writeFileSync('extension/manifest.json', JSON.stringify(manifest, null, '  '));
