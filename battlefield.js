var battlefield = function(){
  console.log('Running battlefield function.');

  chrome.storage.local.get("myStrikeAction", function(res){
    console.log(res["myStrikeAction"]);
    var myStrikeAction = res["myStrikeAction"];
    _checkPlayers(myStrikeAction);

    $($('.table_lines')[0]).before('My strike action: ' + _formatNumber(myStrikeAction));
  });

  function _checkPlayers(myStrikeAction){
    var players = $('table.battlefield').find('tr.player');

    for(var i = 0; i < players.length; i++){

      var playerInfo = $(players[i]).find('td');

      var alliance = $(playerInfo[1]).text(),
          name = $(playerInfo[2]).text(),
          armySize = $(playerInfo[3]).text(),
          gold = $(playerInfo[5]).text();

      alliance = _cleanString(alliance);
      name = _cleanString(name);
      armySize = _parseNumber(armySize);
      gold = _parseNumber(gold);

      var goldLimit = 1000000;
      if(gold < goldLimit){
        $(players[i]).hide();
      } else {
        (function(){ // Scoping
          var n = name;
          var $pItem = $(players[i]);
          chrome.storage.local.get(n, function(res){
              if(res.hasOwnProperty(n)){
                console.log("Had info for " + n + ":");
                console.log(res);
                var defense = res[n]["defense"];

                var className = "higherStrikeAction";
                if(defense > myStrikeAction){
                  className = "lowerStrikeAction";
                }

                $($pItem.find('td')[2]).append(" (<span class='"+className+"'>" + _formatNumber(defense) + "</span>)");
              }
          });
        })();
      }
    }
  }
};