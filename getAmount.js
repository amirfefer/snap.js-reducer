chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        var jsSnippets = document.getElementsByClassName('js-file-header')
        var snapFiles = [];
        var numberOfLines = 0;

        for ( i =0; i < jsSnippets.length ; i++) {
          if(jsSnippets[i].dataset.path.match('/.*js.snap')) {
            snapFiles.push(jsSnippets[i])
          }
        }

        for (i = 0; i < snapFiles.length ; i++) {
            var label = snapFiles[i].children[1].children[0].getAttribute('aria-label');
            var lines = parseInt(label.replace(/(^\d+)(.+$)/i,'$1'));

            numberOfLines += lines;
        }

        var totalDiff = document.getElementsByClassName('diffbar-item diffstat');
        var totalAddition =  parseInt(totalDiff[0].children[0].innerText.replace(/\D/g,''));
        var substraction = totalAddition - numberOfLines;

        if (request.reduce)
          totalDiff[0].children[0].innerText = '+' + substraction;
        else
          totalDiff[0].children[0].innerText += ' (' + numberOfLines + ' snaps)';


        sendResponse({done: true});
    });