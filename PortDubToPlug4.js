/*	Alternative API as modified by Doc_Z */
(function(){
	if (!document.location.host.match(/dubtrackz\.fm$/i)){
	  console.log("Must run on dubtrack");
	}
	window.DUB = {};
	_.extend(DUB, Backbone.Events);
	window.PLUG = {};
	_.extend(PLUG, Backbone.Events);
	
	PLUG.chatLog = function(msg) {
	try {
		API.chatLog(msg);
	}
	catch(err) { basicBot.roomUtilities.logException("chatLog: " + err.message); }
	};

	PLUG.importSongs = function(){
	  console.log("TEST");
	  console.log(API.getUser().username);
	  if (API.getUser().username == "Doc_Z") {
	    DUBPlaylists = DUB.definePlaylists();
	    setTimeout(function () { DUB.exportPlaylists(); }, 2000);
		}
	};
	DUB.exportSongs = function(){
	  if (Dubtrack.session.get("username") == "Doc_Z") {
	    DUBPlaylists = DUB.definePlaylists();
	    setTimeout(function () { DUB.exportPlaylists(); }, 2000);
		}
	};
	DUB.exportPlaylists = function(){
	  console.log("Playlist Len: " + DUBPlaylists.responseJSON.data.length);
	  //for (var i = 0; i < DUBPlaylists.responseJSON.data.length; i++) {
	  for (var i = 0; i < 3; i++) {
		var playlist = [];
		var PLItem = DUBPlaylists.responseJSON.data[i];
		console.log("------------------------------------------------------------------------------------------------------");
		console.log("LOADING Playlist: " + PLItem._id + " " + PLItem.name + ": " + PLItem.totalItems.toString());
		DUB.getPlaylist(playlist, PLItem._id, PLItem.name, PLItem.totalItems, 1, "", DUB.exportPlaylist);
      }
	};
	
	DUB.exportPlaylist = function(playlist, playlistID, playlistName, playlistCnt) {
    try {
		console.log(" EXPORT Playlist: " + playlistID + " " + playlistName + ": " + playlistCnt + " - " + playlist.length);
	}
    catch(err) { console.log("DUB.exportPlaylist: " + err.message); }
	};

    DUB.definePlaylists = function() {
    try {
	  //https://api.dubtrack.fm/playlist/560beb12faf08b030004fcec/songs?name=&page=1
	  //var urlPL = Dubtrack.config.apiUrl + Dubtrack.config.urls.playlist
	  var urlPL = "https://api.dubtrack.fm/playlist";
	  return $.ajax({ url: urlPL, type: "GET" });
	}
    catch(err) { console.log("DUB.definePlaylists: " + err.message); }
	};
    DUB.definePlaylist = function(playlistID, pageno, filterOn) {
      try {
	    //https://api.dubtrack.fm/playlist/560beb12faf08b030004fcec/songs?name=&page=1
	    //var urlsongs = Dubtrack.config.apiUrl + Dubtrack.config.urls.playlistSong.replace(":id", playlistID) + "?name=" + filterOn + "&page=" + pageno
		var urlsongs = "https://api.dubtrack.fm/playlist/:id/songs".replace(":id", playlistID) + "?name=" + filterOn + "&page=" + pageno;
	    return $.ajax({ url: urlsongs, type: "GET" });
	  }
      catch(err) { console.log("DUB.definePlaylist: " + err.message); }
	};

    DUB.getPlaylist = function(playlist, playlistID, playlistName, playlistCnt, pageno, filterOn, cb) {
     try {
    		//botDebug.debugMessage(true, "getPlaylist pageno: " + pageno);
    	  $.when(DUB.definePlaylist(playlistID, pageno, filterOn)).done(function(a1) {
            // the code here will be executed when all four ajax requests resolve.
            // a1 is a list of length 3 containing the response text,
            // status, and jqXHR object for each of the four ajax calls respectively.
    		var DUBCurrPlaylist = a1;
            for (var i = 0; i < DUBCurrPlaylist.data.length; i++) {
    	      playlist.push(new DUB.playListItem(DUBCurrPlaylist.data[i]));
    		}
    		//dubBot.queue.dubQueue = playlist;
    		pageno++;
    		if (DUBCurrPlaylist.data.length > 0 && filterOn.length === 0)
				DUB.getPlaylist(playlist, playlistID, playlistName, playlistCnt, pageno, filterOn, cb);
    		else
    			cb(playlist, playlistID, playlistName, playlistCnt);
    	  });
    	}
        catch(err) { console.log("getPlaylist: " + err.message); }
    };
	DUB.playListItem = function (dubPlaylistItem) {
		try {
			var track = DUB.formatTrack(dubPlaylistItem._song);
			var listItem = {track: track};
			return listItem;
		}
		catch(err) { console.log("DUB.playListItem: " + err.message); }
	  };
	DUB.formatTrack = function(dubSonginfo) {
		try {
		  var track = {songLength: 0, songName: "", songMediaType: "", songMediaId: "", dubSongID: "", mid: ""};
		  if (dubSonginfo === null) return track;
		  track.songLength = parseInt(dubSonginfo.songLength) / 1000;   // API returns MS we convert to seconds for our use.
		  track.songName = dubSonginfo.name;
		  track.songMediaType = dubSonginfo.type;
		  track.songMediaId = dubSonginfo.fkid;
		  track.dubSongID = dubSonginfo._id;
		  track.mid = dubSonginfo.type + ':' + dubSonginfo.fkid;
		  return track;
		}
		catch(err) { console.log("DUB.formatTrack: " + err.message); }
	  };

	var DUBPlaylists = [];
})();

(function(){
	var ow = {
		main : {
			init : function(){
				try {
				//ow.main.addEvents();
				console.log("init");
				PLUG.importSongs();
				}
				catch(err) { console.log("init: " + err.message); }
			},
			addEvents: function(){
				//$('.community__name').click(PLUG.importSongs);  	//Plug
				$('.community__name').click(console.log("name"));  	//Plug
				$('.community__meta').click(console.log("meta"));  	//Plug
			},
		}
	};
	console.log("FUN1");
	ow.main.init();
})();
