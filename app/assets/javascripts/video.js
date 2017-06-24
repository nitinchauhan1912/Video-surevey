var playerTotalTime;
var time_update_interval;
var done = false;
var player;
var area = {width:798,height:450};
var playerOption = {rel: 0, showinfo: 0, autoplay: 1, controls: 0, start: 0};
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
    //var seek_bar_postion = (spotTime / player.getDuration()) * 100
    //var progressBarWidth = seek_bar_postion * $('#progressBar').width() / 100;
    //player.playVideo();
    //alert(spotTime);
    player.seekTo(spotTime);
    pauseVideo();
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

$('.progress-bar-interaction').on('click', function(e) {
    // Calculate the new time for the video.
    // new time in seconds = total duration in seconds * ( value of range input / 100 )
    //var newTime = player.getDuration() * (e.target.value / 100);
    // Skip video to new time.
    var $this = $('#progressBar');
    var barPosition = parseInt(e.pageX - $this.offset().left);
    var progressBarWidth = $this.width();
    var videoInSecs = player.getDuration();
    var percentOfVideo = barPosition / progressBarWidth;
    var newTime = videoInSecs * percentOfVideo;
    //alert(newTime);
    //$('#progessbarspot').animate({width: newTime});
    player.seekTo(newTime);
//    if(player.getPlayerState() == 0 || player.getPlayerState() == 2 || player.getPlayerState() == 5 || player.getPlayerState() == -1){
//        player.playVideo();
//    }  
    
    

});

$('.progress-bar-interaction').mousemove(function(e) {
    if($("#progressBar").hasClass("progress-bar-interaction")){
        var $this = $('.progress-bar-interaction');
        var barPosition = parseInt(e.pageX - $this.offset().left);
        if (barPosition < parseInt($this.width()) && barPosition >= 5) {
            //var barSeekTime = player.getDuration() * (e.target.value / 100);  
            var videoInSecs = player.getDuration();
            var percentOfVideo = barPosition / $this.width();
            var barSeekTime = videoInSecs * percentOfVideo;
            $("#time").html(formatTime(barSeekTime));
            $("#time").attr("interaction-offset",barPosition);
            $('.moveAble').css({'left': barPosition - 95});
        }
    }
});

$(".video_overlay_on").click(function(){
    //$(".right_video_overlay").attr('style','width:'+area.width+';height:'+area.height);
    $(".right_video_overlay").show();
});
$(".video_overlay_off").click(function(){
    $(".right_video_overlay").hide();
});




