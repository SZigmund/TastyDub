// Version 1.0
var killVideo = {
	started: false,
	version: "00.02"
}
killVideo.logException = function(msg) {  // Log exception to console
  try {   console.log("ERROR: " + msg);}
  catch(err) { console.log("ERROR:logException: " + err.message); }
};
killVideo.undisplayElement = function(elementName) {
	try {
	   document.getElementById(elementName).style.display = 'none';
        }
        catch(err) {
           killVideo.logException("undisplayElement: " + err.message);
        }
};
killVideo.hideElement = function(elementName) {
	try {
	   document.getElementById("elementName").style.visibility = "hidden";
        }
        catch(err) {
           killVideo.logException("hideElement: " + err.message);
        }
};
killVideo.init = function(){
  var elem = document.getElementById("main_player");
  elem.parentNode.removeChild(elem);
};

if (!killVideo.started) killVideo.init();
