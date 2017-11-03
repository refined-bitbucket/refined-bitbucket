require('dotenv').config();

const fs = require('fs');
const path = require('path');
const chromeDeploy = require('chrome-extension-deploy');

console.log('Deploying to Chrome Web Store...');

chromeDeploy({
    clientId: process.env.CHROME_CLIENT_ID,
    clientSecret: process.env.CHROME_CLIENT_SECRET,
    refreshToken: process.env.CHROME_REFRESH_TOKEN,
    id: 'afppminkfnfngihdocacbgeajbbdklkf',
    zip: fs.readFileSync(path.join(__dirname, '../extension.zip')),
}).then(() => {
    console.log('Chrome deployment complete!');
}, err => {
    console.error('Chrome deployment failed:', err);
    process.exitCode = 1;
});
