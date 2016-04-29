$(document).ready(function(){
  $('#clearAllData').click(function(){
    chrome.storage.local.get(null, function(items){
      var allKeys = Object.keys(items);

      chrome.storage.local.remove(allKeys, function(){
        console.log('Removed all');
      });
    });
  });
});
