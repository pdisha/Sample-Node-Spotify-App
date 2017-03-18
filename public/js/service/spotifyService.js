/* Service to connect with Spotify API */
exploreMusicApp.service('spotifyService', ['$http', function($http) {
  return {
    search: function(keyword){
      var config = {
        params: {
          'q': keyword,
          'type': 'track',
          'limit': 50
        }
      }
      return $http.get('https://api.spotify.com/v1/search', config);
    }
  }
}]);