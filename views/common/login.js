(function () {
  'use strict';

  app.controller('loginCtrl', ['$rootScope', '$scope', '$state', 'REST', function ($rootScope, $scope, $state, REST) {
    $('.loginName').focus();
    $scope.login = function (name, pwd) {
        $state.go('app.home');
    };
  }])
})();