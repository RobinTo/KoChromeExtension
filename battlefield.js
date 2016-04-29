var battlefield = function(){
  console.log('Running battlefield function.');

  chrome.storage.local.get("myStrikeAction", function(res){
    console.log(res["myStrikeAction"]);
    var myStrikeAction = res["myStrikeAction"];
    _checkPlayers(myStrikeAction);

    if($('#showAllPlayers').length <= 0){
      $($('.table_lines')[0]).before('My strike action: ' + _formatNumber(myStrikeAction)+ " ");

      $($('.table_lines')[0]).before("<button id='showAllPlayers'>Show all players</button>");

      $('#showAllPlayers').click(function(){
        if($('#showAllPlayers').hasClass('shown')){
          $('#showAllPlayers').removeClass('shown');
          $('#showAllPlayers').text('Show all players');
          _checkPlayers(myStrikeAction);
        } else {
          $('#showAllPlayers').addClass('shown');
          $('#showAllPlayers').text('Filter players');
          $('table.battlefield').find('tr.player').show();
        }
      });
    }
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

      var goldLimit = 100000;
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

                console.log(res[n]["lastUpdated"]);
                var date = res[n]["lastUpdated"],
                    timeDelta = 0,
                    timeDeltaInHours = -1,
                    timeDeltaFormatted = "No time";
                if(date && typeof date !== 'undefined' && date !== null){
                  date = new Date(JSON.parse(date));
                  timeDelta = new Date() - date;
                  timeDeltaInHours = Math.floor(timeDelta / (1000*60*60))

                  if(timeDeltaInHours === 0){
                    timeDeltaFormatted = "<1 hour ago";
                  } else if(timeDeltaInHours > 48){
                    timeDeltaFormatted = ">2 days ago";
                  } else {
                    timeDeltaFormatted = timeDeltaInHours + " hours ago";
                  }
                }

                $($pItem.find('td')[2]).append(" - <span class='"+className+"'>" + _formatNumber(defense) + " </span> " + timeDeltaFormatted + "");
              }
          });
        })();
      }
    }
  }
};
