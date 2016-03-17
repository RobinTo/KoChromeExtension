var intelDetail = function(){
  console.log("Running intelDetail function");

  var allContent = $('.content').text();

  name = _findName(allContent);

  var tables = $('table.table_lines');

  var $armyTable = $(tables[0]),
      $statsTable = $(tables[1]),
      $treasuryTable = $(tables[2]),
      $weaponsTable = $(tables[3]);

  var strikeAction = $($($statsTable.find('tr')[1]).find('td')[1]).text(),
      defensiveAction = $($($statsTable.find('tr')[2]).find('td')[1]).text(),
      userId = $('input[name=id]').attr('value');

  defensiveAction = _parseNumber(defensiveAction);

  if(defensiveAction > 0){
    _setValueInStorage(name, ["defense", "userId"], [defensiveAction, userId]);
  }
}


function _findName(text){
  var searchPhrase = "your spy sneaks into ";

  var index = text.indexOf(searchPhrase);

  if(index < 0){
    return false;
  } else {
    return text.substring(index+searchPhrase.length, text.indexOf("\'", index+searchPhrase.length));
  }
}
