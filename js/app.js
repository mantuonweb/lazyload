// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var lazyPathJS = "/js/";
var lazyPathHtml = "/templates/";
var version = "v2";

function getPath(name, ishtml) {
  if (!ishtml) {
    return lazyPathJS + name + "?v=" + version;
  } else {
    return lazyPathHtml + name + "?v=" + version;
  }
}
angular.module('starter', ['ionic', 'starter.controllers', 'oc.lazyLoad'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('login', {
    url: '/login',
    templateProvider: function() {
      return lazyLoginDeferred.promise;
    },
    resolve: {
      load: function($templateCache, $ocLazyLoad, $q, $http) {
        lazyLoginDeferred = $q.defer();
        return $ocLazyLoad.load(getPath('login.js')).then(function() {
          lazyLoginDeferred.resolve(loginTemplates["login.html"]);
        });
      }
    },
    //templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',

    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      resolve: {
        load: function($templateCache, $ocLazyLoad, $q, $http) {
          lazyChatDeferred = $q.defer();
          return $ocLazyLoad.load(getPath('chat.js')).then(function() {
            // $http.get(getPath('tab-chats.html', true)).then(function(res) {
            //   lazyChatDeferred.resolve(res.data);
            // }, function() {

            // });
            lazyChatDeferred.resolve(chatTemplates['tab-chats.html']);
          });
        }
      },
      views: {
        'tab-chats': {
          templateProvider: function() {
            return lazyChatDeferred.promise;
          },
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      resolve: {
        load: function($templateCache, $ocLazyLoad, $q, $http) {
          lazyChatDeferred = $q.defer();
          return $ocLazyLoad.load(getPath('chat.js')).then(function() {
            // $http.get(getPath('chat-detail.html', true)).then(function(res) {
            //   lazyChatDeferred.resolve(res.data);
            // }, function() {

            // });
            lazyChatDeferred.resolve(chatTemplates['chat-detail.html']);
          });
        }
      },
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateProvider: function() {
            return lazyChatDeferred.promise;
          },
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.friends', {
      url: '/friends',

      resolve: {
        load: function($templateCache, $ocLazyLoad, $q, $http) {
          lazyFriendsDeferred = $q.defer();
          return $ocLazyLoad.load(getPath('friends.js')).then(function() {
            lazyFriendsDeferred.resolve(friendsTemplates['tab-friends.html']);
          });
        }
      },
      views: {
        'tab-friends': {
          templateProvider: function() {
            return lazyFriendsDeferred.promise;
          },
          controller: 'FriendsCtrl'
        }
      }
    })
    .state('tab.friend-detail', {
      url: '/friend/:friendId',
      resolve: {
        load: function($templateCache, $ocLazyLoad, $q, $http) {
          lazyFriendsDeferred = $q.defer();
          return $ocLazyLoad.load(getPath('friends.js')).then(function() {
            // $http.get(getPath('friend-detail.html', true)).then(function(res) {
            //   lazyFriendsDeferred.resolve(res.data);
            // }, function() {

            // });
            lazyFriendsDeferred.resolve(friendsTemplates['friend-detail.html']);
          });
        }
      },

      views: {
        'tab-friends': {
          templateProvider: function() {
            return lazyFriendsDeferred.promise;
          },
          controller: 'FriendDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});