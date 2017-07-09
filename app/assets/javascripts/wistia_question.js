$(document).ready(function() {
    $('.spot_question').click(function() {
        is_mouse_enter_interaction_item = false;
        $("#interaction_items").hide();
        $(".move_cursor").hide();
        
        var id_attr = $(this).attr('id').split('_');
        var id = id_attr[2];
        if ($("#question_" + id).length !== 0) {
            $("#progressBar").removeClass("progress-bar-interaction");
            $(this).addClass("active");
            $(".spot_bar_" + id).show();
            $("#question_" + id).show();
            seekToVideo(id_attr[3]);
            pauseVideo();
            playUnbind();
        }else{
            if($(this).hasClass("active")) {
                $(".right_video_overlay").hide();
            }
        }

    });

    $('.remove_popup').click(function() {
        $(".spot_bar_" + $(this).attr('role')).hide();
        $("#question_" + $(this).attr('role')).remove();
        playVideo();
    });
   
});