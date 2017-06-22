  $('.spot_question').click(function(){
    var id_attr = $(this).attr('id').split('_');
    var id = id_attr[2];
    $("#progressBar").removeClass("progress-bar-interaction");
    $(this).addClass("active");
    //$(".spot_question_action").find('a').each(function(){$(this).attr("spot_question_id",id)});
    //$(".spot_question_action").find('#spot_delete_question').attr("href","/questions/"+id);
    //$("#spot_interaction_items").show();
    $("#question_"+id).show();
    
    var seek_bar_postion = (player.getCurrentTime() / player.getDuration()) * 100;
    alert(seek_bar_postion);
    
    player.seekTo(id_attr[3]);
    pauseVideo();
    
  });
  
