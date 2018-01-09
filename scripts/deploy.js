require('dotenv').config();

const fs = require('fs');
const path = require('path');
const chromeDeploy = require('chrome-extension-deploy');
const firefoxDeploy = require('firefox-extension-deploy');

console.log('Deploying to Chrome Web Store and Add-ons for Firefox...');

const zipPath = path.join(__dirname, '../extension.zip');

chromeDeploy({
    clientId: process.env.CHROME_CLIENT_ID,
    clientSecret: process.env.CHROME_CLIENT_SECRET,
    refreshToken: process.env.CHROME_REFRESH_TOKEN,
    id: 'afppminkfnfngihdocacbgeajbbdklkf',
    zip: fs.readFileSync(zipPath),
}).then(() => {
    console.log('Chrome deployment complete!');
}, err => {
    console.error('Chrome deployment failed: ', err);
    process.exitCode = 1;
});

firefoxDeploy({
    issuer: process.env.FIREFOX_ISSUER,
    secret: process.env.FIREFOX_SECRET,
    id: 'refined-bitbucket@refined-bitbucket.org',
    version: require('../extension/manifest.json').version, // eslint-disable-line global-require
    src: fs.createReadStream(zipPath),
}).then(() => {
    console.log('Firefox deployment complete!');
}, err => {
    console.error('Firefox failed: ', err);
    process.exitCode = 1;
});
