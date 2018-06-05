(function () {
  'use strict';

  app.controller('customerCtrl', ['$scope', function ($scope) {
    $scope.$on('$destroy', function () {
      sessionStorage.removeItem('applySearchParams')
    })
  }])
})();