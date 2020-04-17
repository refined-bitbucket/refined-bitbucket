/* global chrome */

import OptionsSync from 'webext-options-sync'

const optionsStorage = new OptionsSync()

// common functions
function getToggleState(target) {
    return target.getAttribute('data-state') === 'enabled'
}
function updateCommonToggleAttributes(target, isEnabled) {
    target.setAttribute('data-state', isEnabled ? 'enabled' : 'disabled')
    target.title = isEnabled ? 'Disable' : 'Enable'
}

// all toggle buttons are declared here
var toggleExtState = document.getElementById('toggle-ext-state')
// menu
var toggleSyntaxHighlight = document.getElementById('toggle-syntax-highlight')

function run() {
    // set version tag
    var versionTag = document.getElementById('version-number')
    versionTag.innerHTML = browser.runtime.getManifest().version

    // view options listener
    var buttonOptions = document.getElementById('view-options')
    buttonOptions.addEventListener('click', () =>
        chrome.runtime.openOptionsPage()
    )

    addToggleEventListeners()

    initOptions()
}

// init all toggle with current value of options here
async function initOptions() {
    var { _isExtEnabled, syntaxHighlight } = await optionsStorage.getAll()

    // toggle extension state
    updateToggleExtStateButton(_isExtEnabled)
    updateToggleSyntaxHighlightButton(syntaxHighlight)
}

// all toggle event handler are declared here
function addToggleEventListeners() {
    toggleExtState.addEventListener('click', handleToggleExtStateClick)
    toggleSyntaxHighlight.addEventListener(
        'click',
        handleToggleSyntaxHighlightClick
    )
}

// all toggle buttons listeners are declared below
function handleToggleExtStateClick(e) {
    updateToggleExtStateButton(!getToggleState(e.target), e.target)
}
function handleToggleSyntaxHighlightClick(e) {
    updateToggleSyntaxHighlightButton(!getToggleState(e.target), e.target)
}

// all toggle buttons visual update functions are declared below
function updateToggleExtStateButton(isEnabled, target = null) {
    if (target != null) optionsStorage.set({ _isExtEnabled: isEnabled })
    updateCommonToggleAttributes(target || toggleExtState, isEnabled)
}
function updateToggleSyntaxHighlightButton(isEnabled, target = null) {
    if (target != null) optionsStorage.set({ syntaxHighlight: isEnabled })
    updateCommonToggleAttributes(target || toggleSyntaxHighlight, isEnabled)
}

run()
