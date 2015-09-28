
var noVideo = {
	started: false,
	version: "00.02"
}

noVideo.init = function(){
  var elem = document.getElementById("main_player");
  elem.parentNode.removeChild(elem);
};

if (!noVideo.started) noVideo.init();
