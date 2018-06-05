(function () {
    // w5cValidator config
    app.config(['w5cValidatorProvider', function (w5cValidatorProvider) {
        w5cValidatorProvider.config({
            blurTrig: true,
            showError: true,
            removeError: true
        });
    }]);

    // lazyLoad config
    app.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            app.controller = $controllerProvider.register;
            app.directive = $compileProvider.directive;
            app.filter = $filterProvider.register;
            app.factory = $provide.factory;
            app.service = $provide.service;
            app.constant = $provide.constant;
        }]);

    // router config
    app.config(function ($stateProvider, $urlRouterProvider, $controllerProvider, $ocLazyLoadProvider) {
        app.controllerProvider = $controllerProvider;

        $urlRouterProvider.otherwise("/login");

        $ocLazyLoadProvider.config({
            // Set to true if you want to see what and when is dynamically loaded
            debug: 0
        });

        $stateProvider
        // system
            .state('login', {
                url: "/login",
                templateUrl: "views/common/login.html",
                controller: 'loginCtrl',
                data: {pageTitle: '登录', specialClass: 'gray-bg'},
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('views/common/login.js')
                    }]
                }
            })
            .state('register', {
                url: "/register",
                templateUrl: "views/common/register.html",
                data: {pageTitle: 'Register', specialClass: 'gray-bg'}
            })
            .state('forgot_password', {
                url: "/forgot_password",
                templateUrl: "views/common/forgot_password.html",
                data: {pageTitle: 'Forgot password', specialClass: 'gray-bg'}
            })
            .state('errorOne', {
                url: "/errorOne",
                templateUrl: "views/common/404.html",
                data: {pageTitle: '404', specialClass: 'gray-bg'}
            })
            .state('errorTwo', {
                url: "/errorTwo",
                templateUrl: "views/common/500.html",
                data: {pageTitle: '500', specialClass: 'gray-bg'}
            })

            // pages
            .state('app', {
                url: "/app",
                controller: 'mainCtrl2',
                templateUrl: "views/common/content.html",
            })

            // home
            .state('app.home', {
                url: "/home",
                templateUrl: "views/home/home.html",
                data: {pageTitle: '控制台首页'},
                resolve: {
                    deps: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                serie: true,
                                name: 'angular-flot',
                                files: [
                                    'views/home/home.js',
                                    'lib/flot/jquery.flot.js',
                                    'lib/flot/jquery.flot.resize.js',
                                    'lib/flot/angular-flot.js'
                                ]
                            }
                        ]);
                    }
                }
            })
            // customer
            .state('app.order', {
                abstract: true,
                url: "/order",
                template: "<div ui-view></div>",
                controller: 'customerCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('views/order/customerCtrl.js')
                    }]
                }
            })
            .state('app.order.returnManage', {
                url: "/returnManage",
                params: {companyId: '', route: ''},
                templateUrl: "views/order/returnManage.html",
                data: {pageTitle: '还款管理'},
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('views/order/merStat.js')
                    }]
                }
            })

            .state('app.order.orderManage', {
                url: "/orderManage",
                templateUrl: "views/order/orderManage.html",
                data: {pageTitle: '订单管理'},
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('views/order/applyCtrl.js')
                    }]
                }
            })
            .state('app.order.applyDetail', {
                url: "/applyDetail",
                params: {companyId: '', route: ''},
                templateUrl: "views/order/applyDetail.html",
                data: {pageTitle: '订单详情'},
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('views/order/applyDetailCtrl.js')
                    }]
                }
            })
            // merchant manage
            .state('app.user', {
                abstract: true,
                url: "/user",
                template: "<div ui-view></div>",
                controller: 'userCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('views/user/userManageCtrl.js')
                    }]
                }
            })
            .state('app.user.userManage', {
                url: "/userManage",
                templateUrl: "views/user/userManage.html",
                data: {pageTitle: '用户管理'},
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('views/user/userManageCtrl.js')
                    }]
                }
            })

            .state('app.changePassWord', {
                abstract: true,
                url: "/changePassWord",
                template: "<div ui-view></div>",
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('views/changePassWord/resetPassword.js')
                    }]
                }
            })
            .state('app.changePassWord.resetPassword', {
                url: "/resetPassword",
                templateUrl: "views/changePassWord/resetPassword.html",
                data: {pageTitle: '修改密码'}
            })

            // merchant manage
            .state('app.company', {
                abstract: true,
                url: "/company",
                template: "<div ui-view></div>",
                controller: 'merchantCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('views/company/merchantCtrl.js')
                    }]
                }
            })
            .state('app.company.companyManage', {
                url: "/companyManage",
                templateUrl: "views/company/companyManage.html",
                data: {pageTitle: '商户管理'},
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('views/company/managerCtrl.js')
                    }]
                }
            })

            .state('app.company.companyDetail', {
                url: "/companyDetail",
                params: {companyId: '', route: ''},
                templateUrl: "views/company/companyDetail.html",
                data: {pageTitle: '商户详情'},
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('views/company/detailCtrl_test.js')
                    }]
                }
            })

    })
})();
