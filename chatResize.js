// Version 1.0
var chatResize = {
	started: false,
	version: "00.02"
}
chatResize.logException = function(msg) {  // Log exception to console
  try {   console.log("ERROR: " + msg);}
  catch(err) { console.log("ERROR:logException: " + err.message); }
};
chatResize.undisplayElement = function(elementName) {
	try {
	   document.getElementById(elementName).style.display = 'none';
        }
        catch(err) {
           chatResize.logException("undisplayElement: " + err.message);
        }
};
chatResize.hideElement = function(elementName) {
	try {
	   document.getElementById("elementName").style.visibility = "hidden";
        }
        catch(err) {
           chatResize.logException("hideElement: " + err.message);
        }
};
chatResize.init = function(){
  //var elem = document.getElementById("main_player");
  //elem.parentNode.removeChild(elem);
  document.getElementById('main-user-list-room').style.width = "800px";
  //chatResize.hideElement("main_player");
  //chatResize.hideElement("left_section");
  //chatResize.undisplayElement("ytp-player-content ytp-iv-player-content");
  //chatResize.undisplayElement("main_player");
  //chatResize.undisplayElement("left_section");
};

if (!chatResize.started) chatResize.init();
