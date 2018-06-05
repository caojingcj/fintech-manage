(function () {
    'use strict';

    app
        .controller('userCtrl', ['REST', '$timeout', '$scope', '$compile', function (REST, $timeout, $scope, $compile) {
            var vm = this;

            vm.handle = {
                search: search,
                draw: draw,
                addUser: addUser
            };



            var dataList = ({
                "dataList": [
                  {
                    "aa": "方青",
                    "sendName": "admin",
                    "sendTime": "105046",
                    "sendMobile": "admin",
                    "TRANS_MONEY": 1,
                    "dddd": '蕾特恩昆明朗悦湾店',
                    "APPLY_REVIEW_TIME": 123456,
                    'type': '普通用户'
                  },
                  {
                    "aa": "尔康",
                    "sendName": "user",
                    "sendTime": "105041",
                    "sendMobile": "admin",
                    "TRANS_MONEY": 0,
                    "dddd": '苗方清颜郴州名汇城店',
                    "APPLY_REVIEW_TIME": 123123,
                    'type': '商户用户'
                  }
                ]
            });


            function initSearchParams() {
                vm.searchBy = {
                    COMPANY_NAME: '',
                    STATE: '',
                    nameOrPhone: '',
                    searchKeys: '',
                    sendType: '',
                    page: 1,
                    size: 10
                };
            }

            // 初次查询
            firstSearch();

            function firstSearch() {
                var searchParams = sessionStorage.getItem('applySearchParams');
                if (!!searchParams) {
                    searchParams = JSON.parse(searchParams);
                    vm.searchBy = {
                        COMPANY_NAME: searchParams.COMPANY_NAME,
                        STATE: searchParams.STATE,
                        sendType: searchParams.sendType,
                        beginDate: searchParams.beginDate,
                        endDate: searchParams.endDate,
                        nameOrPhone: searchParams.searchKeys,
                        searchKeys: searchParams.searchKeys,
                        whichOs: searchParams.whichOs,
                        page: searchParams.page,
                        size: searchParams.size
                    };
                } else {
                    initSearchParams()
                }
            }


            function search() {
                vm.searchBy.nameOrPhone = vm.searchBy.searchKeys;
                sessionStorage.setItem('applySearchParams', JSON.stringify(vm.searchBy));
                this.drawTable(1, vm.searchBy.size);
            }

            draw(dataList);

            function draw(res) {
                var qqq = $('#test233').bootstrapTable('destroy').bootstrapTable({
                    data: res.dataList,
                    pageNumber: res.currentPage,
                    totalRows: res.totalcount,
                    cache: false,
                    striped: true,
                    pagination: true,
                    pageSize: res.pageSize,
                    pageList: [10, 25, 50, 100],
                    sidePagination: 'server',
                    search: false,
                    showColumns: false,
                    showRefresh: false,
                    paginationLoop: false,
                    clickToSelect: true,
                    showToggle: false,
                    cardView: $scope.isSmart,
                    maintainSelected: true,
                    columns: [
                        {
                            field: 'aa',
                            title: '用户姓名',
                        }
                        , {
                            field: 'APPLY_REVIEW_TIME',
                            title: '登录名',
                        }
                        , {
                            field: 'type',
                            title: '登录类型',
                        }
                        , {
                            field: '',
                            title: '商户号 - 商户名',
                            formatter:function (val,row) {
                                return '<span>'+row.sendTime+'</span> -  <span>'+row.dddd+'</span>'
                            }
                        }
                        , {
                            field: 'TRANS_MONEY',
                            title: '是否可用',
                            formatter: function (val) {
                              return '<label><input type="checkbox" class="js-switch" ui-switch ></label>';
                            }
                        }
                        , {
                            field: 'failure',
                            title: '操作',
                            formatter: function () {
                                return "<a class='btn btn-xs btn-outline btn-primary' ng-click='user.handle.addUser(\"template/addUser.html\", \"编辑用户\")'>" +
                                    "<i class='fa fa-pencil'></i> 编辑</a> " +
                                    " <a class='btn btn-xs btn-outline btn-danger' ng-click='user.handle.deleteItemFromTable(2)'><i class='fa fa-trash'></i> 删除</a>";
                            }
                        }
                    ],
                    onPageChange: function (pageNum, pageSize) {
                        vm.handle.drawTable(pageSize === vm.searchBy.size ? pageNum : 1, pageSize);
                        vm.searchBy.page = pageNum;
                        vm.searchBy.size = pageSize;
                        sessionStorage.setItem('applySearchParams', JSON.stringify(vm.searchBy));
                    },
                });

                $compile(qqq)($scope);
            }

            $('[data-toggle="tooltip"]').tooltip();

            function addUser(url, title) {
                swal({
                    title: '<div style="margin-bottom:15px;">' + title + '</div>',
                    html: '<div id="swalHtml"></div>',
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    target: '.detailPage',
                    width: '400px'
                }).then(function () {
                }, function () {
                });
                $compile('<div ng-include=\'"' + url + '"\'></div>')($scope).appendTo('#swalHtml');
            }
        }])
})();