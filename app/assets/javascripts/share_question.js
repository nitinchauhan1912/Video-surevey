  $('.spot_question').click(function(){
    var id_attr = $(this).attr('id').split('_');
    var id = id_attr[2];
    if($("#question_"+id).length!==0){
        $("#progressBar").removeClass("progress-bar-interaction");
        $(this).addClass("active");
        //$(".spot_question_action").find('a').each(function(){$(this).attr("spot_question_id",id)});
        //$(".spot_question_action").find('#spot_delete_question').attr("href","/questions/"+id);
        //$("#spot_interaction_items").show();
        $(".spot_bar_"+id).show(); 
        $("#question_"+id).show();
        player.seekTo(id_attr[3]);
        pauseVideo();
    }
    
  });
  
  $('.remove_popup').click(function(){
     $(".spot_bar_"+$(this).attr('role')).hide(); 
     $("#question_"+$(this).attr('role')).remove();
      playVideo();
  });
  
