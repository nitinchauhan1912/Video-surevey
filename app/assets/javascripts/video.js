var playerTotalTime;
var time_update_interval;
var done = false;
var player;
var area = {width:800,height:450};
var playerOption = {rel: 0, showinfo: 0, autoplay: 1, controls: 0, start: 0};
var is_mouse_enter_interaction_item = false;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        width: area.width,
        height: area.height,
        popover: true,
        videoId: videoID,
        playerVars: playerOption,
        events: {
            onReady: initialize,
            onStateChange: onPlayerStateChange
        }
    });
}

function initialize() {
    $('#yt_video_title').text(player.getVideoData().title);
    $('#progressBar').show();
    //updateTimerDisplay();
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
    $('#current-time').text(formatTime(player.getCurrentTime()));
    $('#duration').text(formatTime(player.getDuration()));
}

// This function is called by initialize()
function updateProgressBar() {
    var seek_bar_postion = (player.getCurrentTime() / player.getDuration()) * 100
    //$('#progress-bar').val(seek_bar_postion);
    var progressBarWidth = seek_bar_postion * $('#progressBar').width() / 100;
    $('#progessbarspot').animate({width: progressBarWidth});
    /******logic to open question while prgressing bar********/
    if($(".share_spot_question").length!==0){
        $('.share_spot_question').each(function() {
            var value = $(this).attr('interaction_at').split('_');
            var playerCurrTime = parseInt(player.getCurrentTime());
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
    var seek_bar_postion = (spotTime / player.getDuration()) * 100
    var barPosition = seek_bar_postion * $('#progressBar').width() / 100;
    player.seekTo(spotTime);
    pauseVideo();
    
    barPosition = barPosition - 75;
    if(barPosition <= 0){
        barPosition = 0;
    }else if(barPosition >= 620){
        barPosition = 620;
    }
    $('.moveAble').css({'left': barPosition});
           
    //$('#progessbarspot').animate({width: progressBarWidth});
}

function pauseVideo(){
    player.pauseVideo();
}

function playVideo(){
    player.playVideo();
}

$('#progress-bar').on('mouseup touchend', function(e) {
    // Calculate the new time for the video.
    // new time in seconds = total duration in seconds * ( value of range input / 100 )
    var newTime = player.getDuration() * (e.target.value / 100);
    // Skip video to new time.
    player.seekTo(newTime);

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
                var videoInSecs = player.getDuration();
                var percentOfVideo = barPosition / $this.width();
                var barSeekTime = videoInSecs * percentOfVideo;
                player.seekTo(barSeekTime);
            }
    });
    
    $('.progress-bar-interaction').mousemove(function(e) {
        if($("#progressBar").hasClass("progress-bar-interaction")){
            //  $("#interaction_items").show();
            is_mouse_enter_interaction_item = true;
            var $this = $('.progress-bar-interaction');
            var barPosition = parseInt(e.pageX - $this.offset().left);
            if (barPosition < parseInt($this.width()) && barPosition >= 5) {
                //var barSeekTime = player.getDuration() * (e.target.value / 100);  
                var videoInSecs = player.getDuration();
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