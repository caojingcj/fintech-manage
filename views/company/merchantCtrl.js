(function () {
  'use strict';

  app.controller('merchantCtrl', ['$scope', function ($scope) {
    $scope.$on('$destroy', function () {
      sessionStorage.removeItem('searchParams')
    })
  }])
})();