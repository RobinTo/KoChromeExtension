var base = function(){
  var $stats = $($('.table_lines')[8])

  var strikeAction = $($($stats.find('tr')[1]).find('td')[1]).text();
  strikeAction = _parseNumber(strikeAction);
  
  chrome.storage.local.set({myStrikeAction:strikeAction}, function(){
    console.log('Updated my own strike action.');
    console.log(strikeAction);
  });
}
