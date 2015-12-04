app.controller('PlayerCtrl', function($scope, $rootScope, PlayerFactory){

//   // initialize audio player
//   // var audio = document.createElement('audio');
//   //   audio.addEventListener('ended', function () {
//   //   $scope.next();
//   // });
//   // audio.addEventListener('timeupdate', function () {
//   //   $scope.progress = 100 * audio.currentTime / audio.duration;
//   //   $scope.$digest();
//   // });

//   // state variables
$scope.getCurrentSong = PlayerFactory.getCurrentSong;
  // console.log($scope.currentSong);
//   // $scope.playing = false;

//   // main toggle **
//   $scope.toggle = function (song) {
//     if ($scope.playing) $rootScope.$broadcast('pause');
//     else $rootScope.$broadcast('play', song);
//   }

  // incoming events (from Album or toggle) **
// $scope.$on('pause', PlayerFactory.pause() );
// $scope.$on('play', PlayerFactory.start() );
$scope.start = PlayerFactory.start;
$scope.pause = PlayerFactory.pause;
$scope.next = PlayerFactory.next;
$scope.prev = PlayerFactory.previous;
$scope.toggle = PlayerFactory.toggle;
$scope.playing = PlayerFactory.isPlaying;
$scope.progress = PlayerFactory.getProgress;
$scope.currentSong = PlayerFactory.getCurrentSong;

//   // functionality

//   // function pause () {
//   //   PlayerFactory.pause();
//   //   // audio.pause();
//   //   $scope.playing = false;
//   // }
//   // function play (event, song){
    
    
//   //   $scope.playing = true;
//   //   // resume current song


//   //   if (song === $scope.currentSong) return PlayerFactory.start(song);
   
    
//   //   // audio.src = song.audioUrl;
//   //   // audio.load();
//   //   // audio.play();
//   // }

//   // outgoing events (to Album) **
//   $scope.next = function(){ $rootScope.$broadcast('next'); };
//   $scope.prev = function(){ $rootScope.$broadcast('prev'); };

});
