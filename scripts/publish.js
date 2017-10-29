const fs = require('fs');
const semver = require('semver');
const AdmZip = require('adm-zip');

// Write package.json's versino to the extension/manifest.json
const manifestLocation = 'extension/manifest.json';
const manifest = JSON.parse(fs.readFileSync(manifestLocation, {encoding: 'utf8'}));
const packageJson = JSON.parse(fs.readFileSync('package.json', {encoding: 'utf8'}));
const validVersion = semver.valid(packageJson.version);

manifest.version = validVersion;

fs.writeFileSync(manifestLocation, JSON.stringify(manifest, null, '  '));

// Archive the extension folder into 'extension.zip'
const zip = new AdmZip();
zip.addLocalFolder('extension');
zip.writeZip('extension.zip');
