// Version 1.0
var noVideo = {
	started: false,
	version: "00.02"
}
noVideo.logException = function(msg) {  // Log exception to console
  try {   console.log("ERROR: " + msg);}
  catch(err) { console.log("ERROR:logException: " + err.message); }
};
noVideo.undisplayElement = function(elementName) {
	try {
	   document.getElementById(elementName).style.display = 'none';
        }
        catch(err) {
           noVideo.logException("undisplayElement: " + err.message);
        }
};
noVideo.hideElement = function(elementName) {
	try {
	   document.getElementById("elementName").style.visibility = "hidden";
        }
        catch(err) {
           noVideo.logException("hideElement: " + err.message);
        }
};
noVideo.init = function(){
  //var elem = document.getElementById("main_player");
  //elem.parentNode.removeChild(elem);
  noVideo.hideElement("ytp-player-content ytp-iv-player-content");
  noVideo.hideElement("main_player");
  noVideo.hideElement("left_section");
  noVideo.undisplayElement("ytp-player-content ytp-iv-player-content");
  noVideo.undisplayElement("main_player");
  noVideo.undisplayElement("left_section");
};

if (!noVideo.started) noVideo.init();
