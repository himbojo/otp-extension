// background.js

let color = '#3aa757';
let tokens = ["token1", "token2", "token3", "token4", "token5"]

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);

  // new set
  chrome.storage.sync.set({ tokens });
  console.log('Set rows');
});