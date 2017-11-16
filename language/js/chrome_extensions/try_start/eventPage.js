
chrome.runtime.onInstalled.addListener(function () {
    // chrome.alarms.onAlarm.addListener(function(){
    //     alert('great');
    // })
    
})

chrome.browserAction.onClicked.addListener(function (tab) {
    // No tabs or host permissions needed!
    console.log('Turning ' + tab.url + ' red!');
    chrome.tabs.executeScript({
        code: 'document.body.style.backgroundColor="#7dbba8"'
    });
});

chrome.commands.onCommand.addListener(function (command) {
    alert('onCommand event received for message: ' + command);
});

