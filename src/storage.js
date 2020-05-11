/* global chrome */

import { getRepoURL } from './page-detect'

export const getDefaultReviewersStorageKey = () =>
    `_rbb-default-reviewers.${getRepoURL()}`

export function getStorageSyncValue(key: string) {
    return new Promise(resolve => {
        chrome.storage.sync.get(key, function(result) {
            resolve(result[key])
        })
    })
}

export function setStorageSyncValue(key: string, value: any) {
    return new Promise(resolve => {
        chrome.storage.sync.set({ [key]: value }, function(result) {
            resolve()
        })
    })
}

export function getStorageLocalValue(key: string) {
    return new Promise(resolve => {
        chrome.storage.local.get(key, function(result) {
            resolve(result[key])
        })
    })
}

export function setStorageLocalValue(key: string, value: any) {
    return new Promise(resolve => {
        chrome.storage.local.set({ [key]: value }, function(result) {
            resolve()
        })
    })
}
