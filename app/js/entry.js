const angular = require('angular');

var githubApp = angular.module('githubApp', []);

githubApp.controller('GithubController', ['$http', function($http) {
  var blah = this;
  this.fetchEvents = function(username) {
    $http.get('https://api.github.com/users/' + username + '/events')
      .then(
        function(res) {
          var data = res.data.slice(0, 1)[0];
          console.log(data)
          var eventType = data.type;
          var commitMsg;
          if (eventType === 'PushEvent' ) commitMsg = data.payload.commits[0].message;

          var date = new Date(data.created_at);

          blah.stuff = {
            username: data.actor.display_login,
            repo: data.repo.name,
            imgUrl: data.actor.avatar_url,
            commitMessage: commitMsg,
            date: date,
            type: eventType
          };
          blah.error = null;
        },
        function(err) {
          console.log(err);
          blah.error = 'Apparently Github has no such user: ' + username;
          blah.stuff = null;
        }
    );
  }
}]);
