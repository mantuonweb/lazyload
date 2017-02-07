
var loginTemplates = {
    "login.html": "<ion-view view-title=\"Login\" name=\"login-view\">\n  <ion-content class=\"padding\">\n      <div class=\"list list-inset\">\n          <label class=\"item item-input\">\n              <input type=\"text\" placeholder=\"Username\" ng-model=\"data.username\">\n          </label>\n          <label class=\"item item-input\">\n              <input type=\"password\" placeholder=\"Password\" ng-model=\"data.password\">\n          </label>\n      </div>\n      <button class=\"button button-block button-calm\" ng-click=\"login()\">Login</button>\n  </ion-content>\n</ion-view>\n"
};
angular.module('login.module', [])
.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};

    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            $state.go('tab.dash');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }
})
.service('LoginService', function($q) {
    return {
        loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;

            if (name == 'test' && pw == 'test') {
                deferred.resolve('Welcome ' + name + '!');
            } else {
                deferred.reject('Wrong credentials.');
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})

