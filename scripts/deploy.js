require('dotenv').config()

const fs = require('fs')
const path = require('path')
const chromeDeploy = require('chrome-extension-deploy')
const firefoxDeploy = require('firefox-extension-deploy')

// eslint-disable-next-line no-void
void (async function() {
    console.log(
        '⏳ Deploying to Chrome Web Store and Add-ons for Firefox... ⏳'
    )

    const zipPath = path.join(__dirname, '../extension.zip')

    const chromePromise = chromeDeploy({
        clientId: process.env.CHROME_CLIENT_ID,
        clientSecret: process.env.CHROME_CLIENT_SECRET,
        refreshToken: process.env.CHROME_REFRESH_TOKEN,
        id: 'afppminkfnfngihdocacbgeajbbdklkf',
        zip: fs.readFileSync(zipPath),
    })

    let chromeSuccess
    try {
        await chromePromise
        console.log('✅ Chrome deployment complete!')
        chromeSuccess = true
    } catch (error) {
        console.error('❌ Chrome deployment failed: ', error)
        chromeSuccess = false
    }

    const firefoxPromise = firefoxDeploy({
        issuer: process.env.FIREFOX_ISSUER,
        secret: process.env.FIREFOX_SECRET,
        id: 'refined-bitbucket@refined-bitbucket.org',
        // eslint-disable-next-line import/no-unresolved
        version: require('../extension/manifest.json').version, // eslint-disable-line global-require
        src: fs.createReadStream(zipPath),
    })

    let firefoxSucceess
    try {
        await firefoxPromise
        console.log('✅ Firefox deployment complete!')
        firefoxSucceess = true
    } catch (error) {
        console.error('❌ Firefox failed: ', error)
        firefoxSucceess = false
    }

    if (!chromeSuccess || !firefoxSucceess) {
        process.exitCode = 1
    }
})()
