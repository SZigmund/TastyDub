/*	Alternative API as modified by Doc_Z */
var DBUAPI = {
	chatLog: function(txt) {
	  var b = new Dubtrack.View.chatLoadingItem;
	  b.$el.text(txt).appendTo(Dubtrack.room.chat._messagesEl);
	},
	getUsername: function(msg) {
      return Dubtrack.session.get("username");
	}
};
var	DUBEXPORT = {
	DUBPlaylists: [],
    exportSongs = function(){
	  if (DUBAPI.getUsername() == "Doc_Z") {
	    DUBPlaylists = DUBEXPORT.definePlaylists();
	    setTimeout(function () { DUBEXPORT.exportPlaylists(); }, 2000);
		}
	},

	exportPlaylists = function(){
	  console.log("Playlist Len: " + DUBPlaylists.responseJSON.data.length);
	  //for (var i = 0; i < DUBPlaylists.responseJSON.data.length; i++) {
	  for (var i = 0; i < 3; i++) {
		var playlist = [];
		var PLItem = DUBPlaylists.responseJSON.data[i];
		console.log("------------------------------------------------------------------------------------------------------");
		console.log("LOADING Playlist: " + PLItem._id + " " + PLItem.name + ": " + PLItem.totalItems.toString());
		DUBEXPORT.getPlaylist(playlist, PLItem._id, PLItem.name, PLItem.totalItems, 1, "", DUBEXPORT.exportPlaylist);
      }
	},
	
	exportPlaylist = function(playlist, playlistID, playlistName, playlistCnt) {
    try {
		console.log(" EXPORT Playlist: " + playlistID + " " + playlistName + ": " + playlistCnt + " - " + playlist.length);
		ExportJSON(playlist, playlistName);
	}
    catch(err) { console.log("DUBEXPORT.exportPlaylist: " + err.message); }
	},

    definePlaylists = function() {
    try {
	  //https://api.dubtrack.fm/playlist/560beb12faf08b030004fcec/songs?name=&page=1
	  //var urlPL = Dubtrack.config.apiUrl + Dubtrack.config.urls.playlist
	  var urlPL = "https://api.dubtrack.fm/playlist";
	  return $.ajax({ url: urlPL, type: "GET" });
	}
    catch(err) { console.log("DUBEXPORT.definePlaylists: " + err.message); }
	},

    definePlaylist = function(playlistID, pageno, filterOn) {
      try {
	    //https://api.dubtrack.fm/playlist/560beb12faf08b030004fcec/songs?name=&page=1
	    //var urlsongs = Dubtrack.config.apiUrl + Dubtrack.config.urls.playlistSong.replace(":id", playlistID) + "?name=" + filterOn + "&page=" + pageno
		var urlsongs = "https://api.dubtrack.fm/playlist/:id/songs".replace(":id", playlistID) + "?name=" + filterOn + "&page=" + pageno;
	    return $.ajax({ url: urlsongs, type: "GET" });
	  }
      catch(err) { console.log("DUBEXPORT.definePlaylist: " + err.message); }
	},

    getPlaylist = function(playlist, playlistID, playlistName, playlistCnt, pageno, filterOn, cb) {
     try {
    		//botDebug.debugMessage(true, "getPlaylist pageno: " + pageno);
    	  $.when(DUBEXPORT.definePlaylist(playlistID, pageno, filterOn)).done(function(a1) {
            // the code here will be executed when all four ajax requests resolve.
            // a1 is a list of length 3 containing the response text,
            // status, and jqXHR object for each of the four ajax calls respectively.
    		var DUBCurrPlaylist = a1;
            for (var i = 0; i < DUBCurrPlaylist.data.length; i++) {
    	      playlist.push(new DUBEXPORT.playListItem(DUBCurrPlaylist.data[i]));
    		}
    		//dubBot.queue.dubQueue = playlist;
    		pageno++;
    		if (DUBCurrPlaylist.data.length > 0 && filterOn.length === 0)
				DUBEXPORT.getPlaylist(playlist, playlistID, playlistName, playlistCnt, pageno, filterOn, cb);
    		else
    			cb(playlist, playlistID, playlistName, playlistCnt);
    	  });
    	}
        catch(err) { console.log("getPlaylist: " + err.message); }
    },

	playListItem = function (dubPlaylistItem) {
		try {
			var track = DUBEXPORT.formatTrack(dubPlaylistItem._song);
			var listItem = {track: track};
			return listItem;
		}
		catch(err) { console.log("DUBEXPORT.playListItem: " + err.message); }
	},

	formatTrack = function(dubSonginfo) {
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
		catch(err) { console.log("DUBEXPORT.formatTrack: " + err.message); }
    },

    ExportJSON = function(jsonData, fileName) {
      try {
		var dataStr = JSON.stringify(jsonData);
        var dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        var exportFileDefaultName = fileName + '.json';
        var linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        console.log("ExportJSON:Complete");
      }
      catch(err) { console.log("ExportJSON: " + err.message); }
	}
};
DUBEXPORT.exportSongs();
