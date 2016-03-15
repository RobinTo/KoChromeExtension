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
