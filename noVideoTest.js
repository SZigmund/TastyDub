// Version 1.0
var noVideo = {
	started: false,
	version: "00.02"
}
noVideo.init = function(){
  document.getElementById("main_player").style.display = 'none';
};

if (!noVideo.started) noVideo.init();
