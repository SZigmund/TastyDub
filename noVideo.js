
var noVideo = {
	started: false,
	version: "00.02"
}

noVideo.init = function(){
  //var elem = document.getElementById("main_player");
  //elem.parentNode.removeChild(elem);
  document.getElementById("main_player").style.visibility = "hidden";
  document.getElementById("left_section").style.visibility = "hidden";
};

if (!noVideo.started) noVideo.init();
