/* Explore Music Controller */
exploreMusicApp.controller('exploreMusicController', function($scope, spotifyService) {
  $scope.headerTmpl = "templates/header.html";

  $scope.musicList = [];

  /* Live Music Search using Spotify API on input value change */
  $scope.search = function() {
    if ($scope.keyword) {
      $scope.musicList = [];
      $scope.spin = 1;
      $scope.error = 0;
      spotifyService.search($scope.keyword)
      .then(function(response) {
        angular.forEach(response.data.tracks.items, function(value, key) {
          var artists = [];
          angular.forEach(value.artists, function(v, k) {
            this.push(v.name);
          }, artists);
          this.push({
            'name': value.name,
            'album': value.album.name,
            'duration': value.duration_ms,
            'artists': artists,
            'url': value.external_urls.spotify
          });
        }, $scope.musicList);
        $scope.spin = undefined;
        $scope.error = 0;
        $scope.end = ($scope.begin + $scope.itemsPerPage < $scope.musicList.length) ? ($scope.begin + $scope.itemsPerPage) : $scope.musicList.length;
      }, function(response) {
        $scope.spin = undefined;
        $scope.error = 1;
      });
    } else {
      $scope.musicList = [];
    }
  };

  /* Sort table data in ASC or DESC order */
  $scope.sort = function(keyname) {
    if ($scope.sortKey && $scope.sortKey.toString() == keyname.toString()) {
      $scope.reverse = !$scope.reverse;
    } else {
      $scope.reverse = false;
    }
    $scope.sortKey = keyname;
  };
  $scope.sortKey = 'id';

  /* Pagination logic */
  $scope.currentPage = 1;
  $scope.maxSize = 5;
  $scope.itemsPerPage = 5;
  $scope.begin = (($scope.currentPage - 1) * $scope.itemsPerPage);

  $scope.$watch('currentPage + itemsPerPage', function() {
    $scope.begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
    $scope.end = ($scope.begin + $scope.itemsPerPage < $scope.musicList.length) ? ($scope.begin + $scope.itemsPerPage) : $scope.musicList.length;
  });

  $scope.itemsPerPageSelection = {
    '3 Items' : 3,
    '5 Items' : 5,
    '10 Items' : 10,
    '20 Items' : 20
  };
});