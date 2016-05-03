var recruiter = function(){
  // Remove the autofocus input field, since numpad inputs are not accepted.
  $('input[name="image_click_number"]').remove();
  $( document ).on( "keydown", function( event ) {
    if(keyCodeToLetter.hasOwnProperty(event.keyCode)){
      console.log(keyCodeToLetter[event.keyCode]);

      var img = $('form[name="image_clickthrough_form"]').find('img')[0].src;
      chrome.runtime.sendMessage({
        url: img,
        filename: "./imgs/" + keyCodeToLetter[event.keyCode] + "/" + keyCodeToLetter[event.keyCode] + ".jpg",
        conflictAction: "uniquify"
      }, function(response){
        console.log(response);
      });

      $('input[value="' + keyCodeToLetter[event.keyCode] + '"]').click();
    }
  });
}

// Could also bind other keycodes here.
// Currently only numpads bound.
var keyCodeToLetter = {
  103 : "k",
  104 : "i",
  105 : "n",
  100 : "g",
  101 : "c",
  102 : "h",
  97 : "a",
  98 : "o",
  99 : "s"
}
