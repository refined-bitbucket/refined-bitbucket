console.log('test', browser.runtime.getManifest().version)
function run() {
    document.getElementById(
        'version-number'
    ).innerHTML = browser.runtime.getManifest().version
}

function handleOptionsClick() {
    browser.runtime.openOptionsPage()
}

run()
