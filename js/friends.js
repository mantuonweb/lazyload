var friendsTemplates = {
    "friend-detail.html": "<!--\nThis template loads for the 'tab.friend-detail' state (app.js)\n'friend' is a $scope variable created in the FriendsCtrl controller (controllers.js)\nThe FriendsCtrl pulls data from the Friends service (service.js)\nThe Friends service returns an array of friend data\n-->\n<ion-view view-title=\"{{friend.name}}\">\n  <ion-content class=\"padding\">\n    <img ng-src=\"{{friend.face}}\" style=\"width: 64px; height: 64px\">\n    <h3>Notes</h3>\n    <p>\n      {{friend.notes}}\n    </p>\n  </ion-content>\n</ion-view>\n",
    "tab-friends.html": "<ion-view view-title=\"Friends\">\n  <ion-content>\n    <ion-list>\n      <ion-item class=\"item-avatar\" ng-repeat=\"friend in friends\" type=\"item-text-wrap\" href=\"#/tab/friend/{{friend.id}}\">\n        <img ng-src=\"{{friend.face}}\">\n        <h2>{{friend.name}}</h2>\n      </ion-item>\n    </ion-list>\n  </ion-content>\n</ion-view>\n"
};
angular.module('friends.module', [])
.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  // Some fake testing data
  var friends = [{
    id: 0,
    name: 'Ben Sparrow',
    notes: 'Enjoys drawing things',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    notes: 'Odd obsession with everything',
    face: 'https://pbs.twimg.com/profile_images/479740132258361344/KaYdH9hE.jpeg'
  }, {
    id: 2,
    name: 'Andrew Jostlen',
    notes: 'Wears a sweet leather Jacket. I\'m a bit jealous',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    notes: 'I think he needs to buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    notes: 'Just the nicest guy',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];


  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
});
