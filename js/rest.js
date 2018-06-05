(function () {
    app.service('REST', ['$rootScope', '$http', '$q', '$state', 'toaster', 'RS', '$timeout', function ($rootScope, $http, $q, $state, toaster, RS, $timeout) {

        var sessionId = '';
        var userInfo = JSON.parse(sessionStorage.getItem('qrmngr_user_info'));
        var pendingUrls = [];

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            pendingUrls = [];
        });
        $rootScope.timeoutToast = true;
    }])
})();