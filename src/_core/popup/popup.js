/* global chrome */

import OptionsSync from 'webext-options-sync'

const optionsStorage = new OptionsSync()

// Common functions
function getToggleState(target) {
    return target.getAttribute('data-state') === 'enabled'
}
function updateCommonToggleAttributes(target, isEnabled) {
    target.setAttribute('data-state', isEnabled ? 'enabled' : 'disabled')
    target.title = isEnabled ? 'Disable' : 'Enable'
}

// All toggle buttons are declared here
const toggleExtState = document.getElementById('toggle-ext-state')
// Menu
const toggleSyntaxHighlight = document.getElementById('toggle-syntax-highlight')

function run() {
    // Set version tag
    const versionTag = document.getElementById('version-number')
    versionTag.innerHTML = chrome.runtime.getManifest().version

    // View options listener
    const buttonOptions = document.getElementById('view-options')
    buttonOptions.addEventListener('click', () =>
        chrome.runtime.openOptionsPage()
    )

    addToggleEventListeners()

    initOptions()
}

// Init all toggle with current value of options here
async function initOptions() {
    const { _isExtEnabled, syntaxHighlight } = await optionsStorage.getAll()

    // Toggle extension state
    updateToggleExtStateButton(_isExtEnabled)
    updateToggleSyntaxHighlightButton(syntaxHighlight)
}

// All toggle event handler are declared here
function addToggleEventListeners() {
    toggleExtState.addEventListener('click', handleToggleExtStateClick)
    toggleSyntaxHighlight.addEventListener(
        'click',
        handleToggleSyntaxHighlightClick
    )
}

// All toggle buttons listeners are declared below
function handleToggleExtStateClick(e) {
    updateToggleExtStateButton(!getToggleState(e.target), e.target)
}
function handleToggleSyntaxHighlightClick(e) {
    updateToggleSyntaxHighlightButton(!getToggleState(e.target), e.target)
}

// All toggle buttons visual update functions are declared below
function updateToggleExtStateButton(isEnabled, target = null) {
    if (target !== null) optionsStorage.set({ _isExtEnabled: isEnabled })
    updateCommonToggleAttributes(target || toggleExtState, isEnabled)

    const menuFieldset = document.getElementById('menu')
    if (isEnabled) {
        menuFieldset.removeAttribute('disabled')
    } else {
        menuFieldset.setAttribute('disabled', true)
    }
}
function updateToggleSyntaxHighlightButton(isEnabled, target = null) {
    if (target !== null) optionsStorage.set({ syntaxHighlight: isEnabled })
    updateCommonToggleAttributes(target || toggleSyntaxHighlight, isEnabled)
}

run()
