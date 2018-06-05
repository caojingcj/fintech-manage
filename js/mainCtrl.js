(function () {
  'use strict'
  app.controller('MainCtrl', ['$rootScope', '$scope', '$window', function ($rootScope, $scope, $window) {

    $rootScope.close = function () {
      swal.close()
    }

  }]);
  app.controller('mainCtrl2', ['$rootScope', '$scope', '$state', 'REST', function ($rootScope, $scope, $state, REST) {
    $scope.state = $state;
    $scope.user = JSON.parse(sessionStorage.getItem('qrmngr_user_info'));
    $scope.$on('$stateChangeSuccess', function () {
      // alert($scope.isSmart)
      $("#page-wrapper")[0].style.minHeight = $(window).innerHeight() + 'px';
      if ($scope.isSmart) {
        // alert(456)
        $('body').removeClass('mini-navbar');
        // console.log(123, $scope.isSmart)
      }
    });

    $scope.signOut = function () {
        $state.go('login')
    };

    // 后退检测
    // $scope.$on('$viewContentLoaded', function(){
    //   if(!$rootScope.rightList){
    //     $state.go('login');
    //   }
    // });
  }]);
})();

