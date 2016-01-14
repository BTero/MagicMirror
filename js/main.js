
jQuery.fn.updateWithText = function(text,speed){
    var temp = $('<div/>').html(text);

    if ($(this).html() != temp.html()){
      $(this).fadeOut(speed/2, function(){
        $(this).html(text);
        $(this).fadeIn(speed/2, function(){
          // do nothing
        });
      });
    }
};

$(document).ready(function(){
  moment.locale(config.lang);

  time.init();
});
