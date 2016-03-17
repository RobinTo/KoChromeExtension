$(document).ready(function(){
  chrome.storage.local.get(null, function(items){
    var allKeys = Object.keys(items);

    var strikeAction = parseInt(items['myStrikeAction']);

    for(var i = 0; i < allKeys.length; i++){
      var key = allKeys[i],
          val = items[key];

      if(key === "myStrikeAction" || !val.hasOwnProperty('defense') || !val.hasOwnProperty('userId')){
          // Wrong stuff, do something?
          console.log('No defense/userid or is mystrike')
      } else {
        if(parseInt(val['defense']) < strikeAction){
          $("#status").append("<span class='user' id='"+val['userId']+"'>" +key + ": " + _formatNumber(val['defense']) + '</span><br />');
        } else {
          console.log('to high.');
          // Append it with red class or something.
        }
      }
    }
  });

  $('#clearAllData').click(function(){
    chrome.storage.local.get(null, function(items){
      var allKeys = Object.keys(items);

      chrome.storage.local.remove(allKeys, function(){
        console.log('Removed all');
      });
    });
  });
  $(document).on('click', '.user', function(e){
    var $target = $(e.target),
        targetId = $target.attr('id');

    chrome.tabs.update({
      url: "http://www.kingsofchaos.com/stats.php?id="+targetId
    });
  });
});
