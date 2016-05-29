const angular = require('angular');

var githubApp = angular.module('githubApp', []);

githubApp.controller('GithubController', ['$http', function($http) {
  this.stuff = "the data from github will go here"
  var blah = this;
  this.fetchEvents = function(username) {
    $http.get('https://api.github.com/users/' + username + '/events')
      .then(
        function(res) {
          var data = res.data.slice(0, 1)[0];
          console.log(data)
          var eventType = data.type;
          var commitMsg;
          if (eventType === 'PushEvent' ) {
            commitMsg = data.payload.commits[0].message;
          } else {
            commitMsg = 'The last event was not a commit - so no message';
          }

          blah.stuff = {
            username: data.actor.display_login,
            repo: data.repo.name,
            imgUrl: data.actor.avatar_url,
            commitMessage: commitMsg,
            date: data.created_at,
            type: eventType
          }
        },
        function(err) {
          console.log(err);
          blah.stuff = 'Apparently Github has no such user:' + username;
        }
    );
  }
}]);
