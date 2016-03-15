var pathName = window.location.pathname;

$(document).on('ready', function(){
    console.log('document ready');
})

$(document).on('load', function(){
    console.log('document load');
})

$(document).on('load', function(){
    console.log('document load');
})

$(document).on('resize', function(){
    console.log('document resize');
})

$(document).on('ready', function(){
  _handlePaths();
});

function _bind(){
  $('tr.nav').find('a').click(function(){
    setTimeout(_handlePaths, 1000);
  });
}

function _handlePaths(){
  switch(pathName){
    case "/base.php":
      base();
      break;
    case "/battlefield.php":
      battlefield();
      _bind();
    break;
    case "/inteldetail.php":
      intelDetail();
      break;
    default:
      console.log('No actions defined for path:');
      console.log(pathName);
      break;
  }
}
