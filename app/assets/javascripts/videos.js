var playerTotalTime;
var time_update_interval;
var done = false;
var player;
function onYouTubeIframeAPIReady(videoId) {
    player = new YT.Player('player', {
        width: 800,
        height: 400,
        popover: true,
        videoId: 'vIUp4CzOrpQ',
        playerVars: {'rel': 1, 'showinfo': 1, 'autoplay': 0, 'controls': 1, 'start': 0},
        events: {
            onReady: initialize
        }
    });
}

function initialize() {
    //$('#yt_video_title').text(event.target.getVideoData().title);
    $('#progressBar').show();
    //updateTimerDisplay();
    updateProgressBar();
    clearInterval(time_update_interval);
    time_update_interval = setInterval(function() {
        //updateTimerDisplay();
        updateProgressBar();
    }, 1000);
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
}

$('#progress-bar').on('mouseup touchend', function(e) {
    // Calculate the new time for the video.
    // new time in seconds = total duration in seconds * ( value of range input / 100 )
    var newTime = player.getDuration() * (e.target.value / 100);
    // Skip video to new time.
    player.seekTo(newTime);

});

$('#progressBar').on('click', function(e) {
    // Calculate the new time for the video.
    // new time in seconds = total duration in seconds * ( value of range input / 100 )
    //var newTime = player.getDuration() * (e.target.value / 100);
    // Skip video to new time.
    var barPosition = parseInt(e.pageX - this.offsetLeft);
    var videoInSecs = player.getDuration();
    var percentOfVideo = barPosition / 800;
    var newTime = videoInSecs * percentOfVideo;

    player.seekTo(newTime);

});

$('#progressBar').mousemove(function(e) {
    var barPosition = parseInt(e.pageX - this.offsetLeft) - 15;
    if (barPosition < parseInt(jQuery("#progressBar").width()) && barPosition >= 15) {
        //var barSeekTime = player.getDuration() * (e.target.value / 100);  
        var videoInSecs = player.getDuration();
        var percentOfVideo = barPosition / 800;
        var barSeekTime = videoInSecs * percentOfVideo;
        $("#time").html(formatTime(barSeekTime));
        $('.moveAble').css({'left': barPosition});
    }
});


function formatTime(time) {
    time = Math.round(time);

    var minutes = Math.floor(time / 60),
            seconds = time - minutes * 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    return minutes + ":" + seconds;
}

function convert_time(seconds) {
    var s = seconds,
            h = Math.floor(s / 3600);
    s -= h * 3600;
    var m = Math.floor(s / 60);
    s -= m * 60;

    if (seconds >= "3600") {
        return "0" + h + ":" + (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
    } else {
        return (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
    }
}