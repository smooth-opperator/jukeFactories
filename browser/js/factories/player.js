app.factory('PlayerFactory', function ($q, $rootScope){
	var PlayerFactory = {};
	PlayerFactory.songPlaying = false;

	var audio = document.createElement('audio');
	var ourSongList;
	var currentSong = null;
	var currentSongIndex = 0;
	var progress = 0;
	audio.addEventListener('ended', function () {
    PlayerFactory.next();
	});

	audio.addEventListener('timeupdate', function () {
		PlayerFactory.getProgress();
    	// $scope.progress = 100 * audio.currentTime / audio.duration;
    	$rootScope.$digest();
  	});

	PlayerFactory.start = function(song, songList){
		console.log('song from album ctrl: ', song)
		// stop existing audio (e.g. other song) in any case
		PlayerFactory.pause();
		currentSong = song;
		console.log('current song: ', currentSong)

		if (songList) {
			ourSongList = songList.songs;
			currentSongIndex = ourSongList.indexOf(currentSong);
			// enable loading new song
	    	audio.src = ourSongList[currentSongIndex].audioUrl;

		}
		else {
			audio.src = song.audioUrl;
		}
	    // audio.src = song.audioUrl;
	    audio.load();
	    audio.play();
	    PlayerFactory.songPlaying = true;
	    

	}

	PlayerFactory.pause = function(){
		audio.pause();
		PlayerFactory.songPlaying = false;
	   
	}

	PlayerFactory.resume = function(){
		audio.play();
		PlayerFactory.songPlaying = true;
	}

	PlayerFactory.isPlaying = function(){
		return PlayerFactory.songPlaying;
	}

	PlayerFactory.getCurrentSong = function(){
		return currentSong;

	}

	PlayerFactory.next = function(){
		currentSongIndex++;
		if (currentSongIndex === ourSongList.length) currentSongIndex = 0;
		
		currentSong = ourSongList[currentSongIndex];
		PlayerFactory.start(currentSong);

	}

	PlayerFactory.previous = function(){
		currentSongIndex--;
		if (currentSongIndex === -1) currentSongIndex = ourSongList.length -1 ;
		currentSong = ourSongList[currentSongIndex];
		PlayerFactory.start(currentSong);
		
	}

	PlayerFactory.getProgress = function(){
		if (!PlayerFactory.isPlaying() ) return 0;
		progress =  audio.currentTime / audio.duration;
		return progress;	
	}

	PlayerFactory.toggle = function(){
		if (PlayerFactory.isPlaying() ) PlayerFactory.pause();
    	else PlayerFactory.resume();
	}
	return PlayerFactory;
});
