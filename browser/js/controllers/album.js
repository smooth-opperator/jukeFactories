app.controller('AlbumCtrl', function($scope, $http, $rootScope, StatsFactory, PlayerFactory) {

  // load our initial data
  $http.get('/api/albums/')
  .then(res => $http.get('/api/albums/' + res.data[1]._id))
  .then(res => res.data)
  .then(album => {
    album.imageUrl = '/api/albums/' + album._id + '.image';
    album.songs.forEach(function(song){
      song.audioUrl = '/api/songs/' + song._id + '.audio';
    });
    $scope.album = album;
    console.log(album);
    StatsFactory.totalTime(album)

    .then(function(albumDuration) {
      console.log(albumDuration);
      $scope.fullDuration = albumDuration;
    })
  }).catch(console.error.bind(console));

  // main toggle
  $scope.toggle = PlayerFactory.toggle;

  // incoming events (from Player, toggle, or skip)
  $scope.$on('pause', pause);
  $scope.$on('play', play);
  $scope.$on('next', next);
  $scope.$on('prev', prev);

  $scope.start = PlayerFactory.start;
  $scope.currentSong = PlayerFactory.getCurrentSong;
  $scope.playing = PlayerFactory.isPlaying;

  // functionality
  function pause () {
    $scope.playing = false;
  }
  function play (event, song){
    $scope.playing = true;
    $scope.currentSong = song;
  };

  // a "true" modulo that wraps negative to the top of the range
  function mod (num, m) { return ((num%m)+m)%m; };

  // jump `val` spots in album (negative to go back)
  function skip (val) {
    if (!$scope.currentSong) return;
    var idx = $scope.album.songs.indexOf($scope.currentSong);
    idx = mod( (idx + (val || 1)), $scope.album.songs.length );
    $rootScope.$broadcast('play', $scope.album.songs[idx]);
  };
  function next () { skip(1); };
  function prev () { skip(-1); };
});
