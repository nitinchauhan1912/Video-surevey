// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
// require bootstrap-sprockets
// require turbolinks
function formatTime(time) {
    time = Math.round(time);
    var hours = Math.floor(time / 3600);
    var minutes = Math.floor(time / 60) - hours * 60;
    var seconds = time - hours * 3600 - minutes * 60;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    return hours+ ":" + minutes + ":" + seconds;
}

function convert_time(seconds) {
    var t = new Date(1970,0,1);
    t.setSeconds(secs);
    var time = t.toTimeString().substr(0,8);
    if(secs > 86399)
        time = Math.floor((t - Date.parse("1/1/70")) / 3600000) + s.substr(2);
    return time;
}

function inseconds(){
    
}