// Initialte variables
var video = document.querySelector('video');
var playbackDuration = document.querySelector('.playback-duration');
var progressBar = document.querySelector('.progress-bar');
var progressBarBackground = document.querySelector('.progress-bar-background');
var clip = {};
var buttons = {};
// Function to convert a date object to 'mm:ss' format
var toTimeString = function (date) {
    var date = date.toTimeString().split(' ')[0];
    date = date.slice(3, 8);
    return date;
};
// Get buttons
buttons.play = document.querySelector('.play');
buttons.pause = document.querySelector('.pause');
buttons.mute = document.querySelector('.mute');
buttons.unmute = document.querySelector('.unmute');
// By default, these shouldn't be displayed
buttons.pause.style.display = 'none';
buttons.mute.style.display = 'none';
// Don't want to annoy visitors
video.volume = 0;
// Show duration when video is ready to play
video.onloadeddata = function (_) {
    var duration = new Date(0, 0, 0, 0, 0, 0, video.duration * 1000);
    playbackDuration.querySelector('.duration').innerHTML = toTimeString(duration);
};
// Set actions on buttons
buttons.play.onclick = function (_) { return video.play(); };
buttons.pause.onclick = function (_) { return video.pause(); };
buttons.mute.onclick = function (_) { return video.volume = 1; };
buttons.unmute.onclick = function (_) { return video.volume = 0; };
// Toggle buttons when played / paused
video.onplay = function (_) {
    buttons.play.style.display = 'none';
    buttons.pause.style.display = 'block';
};
video.onpause = function (_) {
    buttons.play.style.display = 'block';
    buttons.pause.style.display = 'none';
};
// Toggle mute buttons when volume changes
video.onvolumechange = function (_) {
    if (video.volume == 0) {
        buttons.mute.style.display = 'block';
        buttons.unmute.style.display = 'none';
    }
    else {
        buttons.mute.style.display = 'none';
        buttons.unmute.style.display = 'block';
    }
};
// Change video location when user clicks on progress bar
progressBarBackground.onclick = function (event) {
    var positionRatio = event.offsetX / progressBarBackground.offsetWidth;
    video.currentTime = video.duration * positionRatio;
};
// update display as video seeks
video.ontimeupdate = function (_) {
    // Update progress bar
    var durationRatio = video.currentTime / video.duration;
    progressBar.style.width = durationRatio * 100 + '%';
    // Update playback duration
    var currentTime = new Date(0, 0, 0, 0, 0, 0, video.currentTime * 1000);
    currentTime = toTimeString(currentTime);
    playbackDuration.querySelector('.progress').innerHTML = currentTime;
};