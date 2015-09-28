
var noVideo = {
	started: false,
	version: "00.02"
}
logException: function(msg) {  // Log exception to console
  try {   console.log("ERROR: " + msg);}
  catch(err) { console.log("ERROR:logException: " + err.message); }
}
undisplayElement = function(elementName) {
	try {
	   document.getElementById(elementName).style.display = 'none';
        }
        catch(err) {
           logException("undisplayElement: " + err.message);
        }
}
hideElement = function(elementName) {
	try {
	   document.getElementById("elementName").style.visibility = "hidden";
        }
        catch(err) {
           logException("hideElement: " + err.message);
        }
}
noVideo.init = function(){
  //var elem = document.getElementById("main_player");
  //elem.parentNode.removeChild(elem);
  hideElement("ytp-player-content ytp-iv-player-content");
  hideElement("main_player");
  hideElement("left_section");
  undisplayElement("ytp-player-content ytp-iv-player-content");
  undisplayElement("main_player");
  undisplayElement("left_section");
};

if (!noVideo.started) noVideo.init();
