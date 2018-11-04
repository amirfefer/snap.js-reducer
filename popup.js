document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('checkPage');
    var reducerToggle = document.getElementById('toggle');
    var img = document.getElementById('example');
    var images = {true: 'reduced.png', false: 'unreduce.png'}
    
    chrome.storage.sync.get(['reduce'], function(result) {
        reducerToggle.checked = result.reduce;
        img.src = images[reducerToggle.checked]
      });
 
    reducerToggle.addEventListener('change', function() {
        chrome.storage.sync.set({"reduce": reducerToggle.checked});
        img.src = images[reducerToggle.checked]
    });
    checkPageButton.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {reduce: reducerToggle.checked}, function(response) {
            });
          });
    }, false);
  }, false);