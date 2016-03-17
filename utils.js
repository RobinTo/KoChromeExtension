function _parseNumber(num){
  num = num.replace(/[a-zA-Z\,\s\t\r\n\?]+/g, '');
  if(num.length <= 0){
    num = 0;
  }
  return parseInt(num);
}

function _cleanString(s){
  s = s.replace(/[\s\t\r\n]+/g, '');
  return s;
}

function _formatNumber(num){
  var num = num.toString(),
      index = num.length;
  while(index > 0){
    index-=3;
    if (index > 0){
        num = num.substring(0, index) + "." + num.substring(index);
    }
  }
  return num;
}

function _updateMultipleValues(key, valueNamesList, newValuesList){

  console.log(valueNamesList, newValuesList);
  console.log(valueNamesList.length !== newValuesList.length);
  console.log(typeof(valueNamesList) !== "object");
  console.log(typeof(newValueList) !== "object");
  if(valueNamesList.length !== newValuesList.length || typeof(valueNamesList) !== "object" || typeof(newValuesList) !== "object"){
    console.log('Value names length was not equal to new values length or not arrays at all.');
    return;
  }

  chrome.storage.local.get(key, function(res){
    var newObject;
    if(!res.hasOwnProperty(key)){
      newObject = {};
    } else {
      newObject = res[key]
    }

    for(var i = 0; i < valueNamesList.length; i++){
      newObject[valueNamesList[i]] = newValuesList[i];
    }

    var saveObject = {};
    saveObject[key] = newObject;
    console.log(JSON.stringify(saveObject));
    chrome.storage.local.set(saveObject, function(res){
      console.log('Set for ' + key + ' values ' + valueNamesList.join(', ') + ' to ' + newValuesList.join(', '));
      console.log(saveObject);
    });
  });
}

function _setValueInStorage(key, valueName, newValue){
  console.log('Setting value in storage, creating new object if key does not exist.');

  if(typeof(valueName) !== "number" || typeof(newValue) !== number){
    console.log("Values was not pure numbers, going to set multi values");
    _updateMultipleValues(key, valueName, newValue);
    return;
  }

  chrome.storage.local.get(key, function(res){
    if(!res.hasOwnProperty(key)){
      // Create value
      var newObject = {};
      newObject[key] = {"defense": 0, "userId": 0};
      newObject[key][valueName] = newValue;
      chrome.storage.local.set(newObject, function(res){
        console.log('Created new object for ' + key + ' with value ' + valueName + ' set to ' + newValue);
      });
    } else {
      // Update value
      var saveObject = res[key];

      saveObject[valueName] = newValue;

      var newObject = {};
      newObject[key] = saveObject;
      chrome.storage.local.set(newObject, function(res){
        console.log('Updated ' + valueName + ' to ' + newValue + ' for ' + key);
      });
    }
  });
}
