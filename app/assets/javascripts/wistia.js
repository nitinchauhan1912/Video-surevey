var playerTotalTime;
var time_update_interval;
var done = false;
var player;
window._wq = window._wq || [];
var area = {width:800,height:450};
var playerOption = {rel: 0, showinfo: 0, autoplay: 1, controls: 0, start: 0};
var is_mouse_enter_interaction_item = false;
_wq.push({ id: videoID, onReady: function(video) {
   $(".w-control-bar").hide();
              
   video.videoWidth(area.width);
   video.videoHeight(area.height);
   initialize(video);
}});


function initialize(video) {
    
    player = video;
    
    $('#yt_video_title').text(player.name());
    $('#progressBar').show();
    //updateTimerDisplay();
    player.play();
    updateProgressBar();
    clearInterval(time_update_interval);
    time_update_interval = setInterval(function() {
        //updateTimerDisplay();
        updateProgressBar();
    }, 1000);
}

function onPlayerStateChange(event){
    //alert(even.target.getPlayerState());
    //event.target.playVideo();
}

// This function is called by initialize()
function updateTimerDisplay() {
    // Update current time text display.
    $('#current-time').text(formatTime(player.time()));
    $('#duration').text(formatTime(player.duration()));
}

// This function is called by initialize()
function updateProgressBar() {
    $(".w-control-bar").hide();
        
    var seek_bar_postion = (player.time() / player.duration()) * 100
    var progressBarWidth = seek_bar_postion * $('#progressBar').width() / 100;
    $('#progessbarspot').animate({width: progressBarWidth});
    /******logic to open question while prgressing bar********/
    if($(".share_spot_question").length!==0){
        $('.share_spot_question').each(function() {
            var value = $(this).attr('interaction_at').split('_');
            var playerCurrTime = parseInt(player.time());
            var shareSpotQuestTime = parseInt(value[0]);
            if(playerCurrTime == shareSpotQuestTime && $("#question_"+value[1]).length!==0){
                $(".right_video_overlay").show();
                $(this).addClass("active");
                $(".spot_bar_"+value[1]).show();
                $("#question_"+value[1]).show();
                    pauseVideo();
            }    
        });
    }
    /******end logic to open question while prgressing bar********/
}

function spotProgressBar(spotTime) {
    pauseVideo();
    seekToVideo(spotTime);
    playUnbind();
    var seek_bar_postion = (spotTime / player.duration()) * 100
    var barPosition = seek_bar_postion * $('#progressBar').width() / 100;
    barPosition = barPosition - 75;
    if(barPosition <= 0){
        barPosition = 0;
    }else if(barPosition >= 620){
        barPosition = 620;
    }
    $('.moveAble').css({'left': barPosition});
}

function pauseVideo(){
    player.pause();
}

function playVideo(){
    player.play();
}

function playUnbind(){
    return player.unbind;
}

function seekToVideo(spotTime){
    player.time(spotTime);
}

$('#progress-bar').on('mouseup touchend', function(e) {
    // Calculate the new time for the video.
    // new time in seconds = total duration in seconds * ( value of range input / 100 )
    var newTime = player.duration() * (e.target.value / 100);
    // Skip video to new time.
    player.time(newTime);
    return player.unbind;

});

$(document).ready(function(){
    
     $('.new_question').on('click', function(e) {
        var newTime = $('#time').text();
        spotProgressBar(inseconds(newTime));
        var interaction_item = $("#interaction_items");
        if($(interaction_item).is(":visible")) {
            $(".right_video_overlay").show();
        }
    });
    
    $('.show_embed_bar').on('click', function(e) {
            var $this = $('#progressBar');
            var barPosition = parseInt(e.pageX - $this.offset().left);
            if (barPosition < parseInt($this.width()) && barPosition >= 5) {
                //var barSeekTime = player.getDuration() * (e.target.value / 100);  
                var videoInSecs = player.duration();
                var percentOfVideo = barPosition / $this.width();
                var barSeekTime = videoInSecs * percentOfVideo;
                player.time(barSeekTime);
            }
    });
    
    
//    $('.progress-bar-interaction,.move_cursor').on('click', function(e) {
//        var $this = $('#progressBar');
//        var barPosition = parseInt(e.pageX - $this.offset().left);
//        var progressBarWidth = $this.width();
//        var videoInSecs = player.duration();
//        var percentOfVideo = barPosition / progressBarWidth;
//        var newTime = videoInSecs * percentOfVideo;
//        //alert(newTime);
//        //$('#progessbarspot').animate({width: newTime});
//        player.time(newTime);
//        $(".hover_actions").show();
//        if($('.hover_actions').is(":visible")) {
//            $(".right_video_overlay").show();
//            //pauseVideo();
//        }
//        return player.unbind;
//    });
    
    $('.progress-bar-interaction').mousemove(function(e) {
        if($("#progressBar").hasClass("progress-bar-interaction")){
            is_mouse_enter_interaction_item = true;
            var $this = $('.progress-bar-interaction');
            var barPosition = parseInt(e.pageX - $this.offset().left);
            if (barPosition  < parseInt($this.width()) && barPosition >= 5) {
                //var barSeekTime = player.getDuration() * (e.target.value / 100);  
                var videoInSecs = player.duration();
                var percentOfVideo = barPosition / $this.width();
                var barSeekTime = videoInSecs * percentOfVideo;
                $("#time").html(formatTime(barSeekTime));
                $("#time").attr("interaction-offset",barPosition);
                $('.move_cursor').css({'left': barPosition});
                barPosition = barPosition - 142;
                if(barPosition <= 0){
                    barPosition = 0;
                }else if(barPosition >= 515){
                    barPosition = 515;
                }
                $('.moveAble').css({'left': barPosition});
            }
        }
    });
    
    /******************new code here*****************/
    $( ".progress-bar-interaction" ).mouseleave(function(e) {
        if($("#progressBar").hasClass("progress-bar-interaction")){
            var interaction_item = $("#interaction_items");
            if($(interaction_item).is(":visible")) {
                $(interaction_item).mouseenter(function(){
                    is_mouse_enter_interaction_item = true;
                })
            }
         }
    });
    
    $("#interaction_items").mouseleave(function(){
        is_mouse_enter_interaction_item = false;
        $("#interaction_items").hide();
        $(".move_cursor").hide();
    });
    
    
    $(".right_video").mousemove(function(){
        var spot_interaction_item = $("#spot_interaction_items");
        if(is_mouse_enter_interaction_item && !$(spot_interaction_item).is(":visible")){
            $(".move_cursor").show();
            $("#interaction_items").show();
        }else{
            $(".move_cursor").hide();
            $("#interaction_items").hide();
        }
    });
    
    $(".right_video").mouseleave(function(){
         $(".move_cursor").hide();
         $("#interaction_items").hide();
    });
    
    /*******************new code end here********************/

    $(".video_overlay_on").click(function(){
        //$(".right_video_overlay").attr('style','width:'+area.width+';height:'+area.height);
        $(".right_video_overlay").show();
    });
    $(".video_overlay_off").click(function(){
        $(".right_video_overlay").hide();
    });
});