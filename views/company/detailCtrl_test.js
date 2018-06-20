(function () {
    'use strict';

    app.controller('detailCtrl', ['$scope', '$compile', 'REST', '$stateParams', '$timeout',function ($scope, $compile, REST, $stateParams,$timeout) {
        var pageSize = 10;
        var vm = this;
        vm.handle = {
            openModal:openModal,
            toggleItemStateFromTable:toggleItemStateFromTable,
            deleteItemFromTable:deleteItemFromTable,
            contrlEnable:contrlEnable
        };

        vm.newUrl = 'http://data.16fenqi.com/data/wx/v1/requestQRCode?value=999999';

        function openModal (whichModal, title) {
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
            $compile('<div ng-include=\'"' + whichModal + '"\'></div>')($scope).appendTo('#swalHtml');
        }


        var dataList = ({
            "dataList": [{
                "aa": "赊销",
                "sendName": "admin",
                "sendTime": "1395487564",
                "sendMobile": "admin",
                "TRANS_MONEY": 0.00,
                "dddd": 11000001114664,
                "APPLY_REVIEW_TIME": 1527491125000,
                "COMPANY_ID": "108172",
                "SEND_TYPE": "4",
                "EXT_HEALTH_ID": "4f3bb990a453414c8938be625e31e42e",
                "hosId": "108172",
                "LOANS_MONEY": 0.00,
                "CONTRACT_ID": "",
                "REAL_NAME": "中国建设银行",
                "userId": "30c375ec8c174a79a50316021c52dc6d",
                "targetMoney": 3000.00,
                "COMPANY_NAME": "佛山壹加壹融达美容医院3",
                "APPLY_DESCRIBE": "",
                "CONTRACT_NUMBER": "",
                "PERIOD": "3",
                "sendType": "4",
                "VOUCHER": "",
                "WARNING_STATE": 4,
                "ID_CARD": "310104199007190818",
                "MOBILE": "138****9774",
                "resultState":'对公'
            }]
        });

        drawTable(1, pageSize);
        function drawTable () {
            $timeout(function () {
                $('#clearingAccountTable').bootstrapTable('showLoading');
                clearingAccountTable(dataList)
            })
        }

        clearingAccountTable (false);
        function clearingAccountTable (res) {
            var qqq = $('#clearingAccountTable').bootstrapTable('destroy').bootstrapTable({
                data: res.dataList,
                pageNumber: res.currentPage,
                totalRows: res.totalcount,
                cache: false,
                striped: true,
                pagination: false,
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
                        field: 'sendMobile',
                        title: '清算账号名'
                    },
                    {
                        field: 'dddd',
                        title: '账号'
                    },
                    {
                        field: 'REAL_NAME',
                        title: '银行',

                    },
                    {
                        field: 'REAL_NAME',
                        title: '开户行'
                    },
                    {
                        field: 'resultState',
                        title: '账户类型',
                    },
                     {
                        field: 'failure',
                         title: '是否启用',
                         formatter:function () {
                            return '<label><input type="checkbox" class="js-switch" ui-switch ' +
                                 'ng-click="dtl.handle.toggleItemStateFromTable($event)"></label>';
                       }
                     },
                    {
                        field: 'failure',
                        title: '操作',
                        formatter:function () {
                            return "<a class='btn btn-xs btn-outline btn-primary' ng-click='dtl.handle.openModal(\"template/edit-playMoney.html\", \"新增打款账户信息\", 2)'>" +
                                "<i class='fa fa-pencil'></i> 编辑</a>&nbsp;" +
                                " <a class='btn btn-xs btn-outline btn-danger' ng-click='dtl.handle.deleteItemFromTable(2)'><i class='fa fa-trash'></i> 删除</a>";
                        }
                    }
                ],
                onPageChange: function (pageNum, _pageSize) {
                    drawTable(pageSize === _pageSize ? pageNum: 1, _pageSize)
                    pageSize = _pageSize;
                }

            });

            $compile(qqq)($scope);
        }

        raTable(1, pageSize);
        function raTable () {
            $timeout(function () {
                $('#rateBsTable').bootstrapTable('showLoading');
                rateTable(dataList)
            })
        }

        rateTable (false);
        function rateTable (res) {
            var qqq = $('#rateBsTable').bootstrapTable('destroy').bootstrapTable({
                data: res.dataList,
                pageNumber: res.currentPage,
                totalRows: res.totalcount,
                cache: false,
                striped: true,
                pagination: false,
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
                        field: 'sendMobile',
                        title: '期数'
                    },
                    {
                        field: 'sendName',
                        title: '费率  '
                    },
                    {
                        field: 'sendType',
                        title: '管理费',

                    },
                    {
                        field: 'failure',
                        title: '操作',
                        formatter:function () {
                            return "<a class='btn btn-xs btn-outline btn-primary' ng-click='dtl.handle.openModal(\"template/edit-rate.html\", \"新增费率信息\", 2)'>" +
                                "<i class='fa fa-pencil'></i> 编辑</a> " +
                                " <a class='btn btn-xs btn-outline btn-danger' ng-click='dtl.handle.deleteItemFromTable(2)'><i class='fa fa-trash'></i> 删除</a>";
                        }
                    }
                ],
                onPageChange: function (pageNum, _pageSize) {
                    drawTable(pageSize === _pageSize ? pageNum: 1, _pageSize)
                    pageSize = _pageSize;
                }

            });

            $compile(qqq)($scope);
        }

        daTable(1, pageSize);
        function daTable () {
            $timeout(function () {
                $('#departmentBsTable').bootstrapTable('showLoading');
                departmentBsTableTable(dataList)

            })
        }

        departmentBsTableTable (false);
        function departmentBsTableTable (res) {
            var qqq = $('#departmentBsTable').bootstrapTable('destroy').bootstrapTable({
                data: res.dataList,
                pageNumber: res.currentPage,
                totalRows: res.totalcount,
                cache: false,
                striped: true,
                pagination: false,
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
                        field: 'sendMobile',
                        title: '项目名称'
                    },
                    {
                        field: 'failure',
                        title: '操作',
                        formatter:function () {
                            return " <a class='btn btn-xs btn-outline btn-danger' ng-click='dtl.handle.deleteItemFromTable(2)'><i class='fa fa-trash'></i> 删除</a>";
                        }
                    }
                ],
                onPageChange: function (pageNum, _pageSize) {
                    drawTable(pageSize === _pageSize ? pageNum: 1, _pageSize)
                    pageSize = _pageSize;
                }

            });

            $compile(qqq)($scope);
        }


        sendTable(1, pageSize);
        function sendTable () {
            $timeout(function () {
                $('#channelListTable').bootstrapTable('showLoading');
                channelListTableTable(dataList)
            })
        }

        channelListTableTable (false);
        function channelListTableTable (res) {
            var qqq = $('#channelListTable').bootstrapTable('destroy').bootstrapTable({
                data: res.dataList,
                pageNumber: res.currentPage,
                totalRows: res.totalcount,
                cache: false,
                striped: true,
                pagination: false,
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
                        title: '渠道姓名'
                    },
                    {
                        field: 'sendTime',
                        title: '联系方式'
                    },
                    {
                        field: 'failure',
                        title: '操作',
                        formatter:function () {
                            return "<a class='btn btn-xs btn-outline btn-primary' ng-click='dtl.handle.openModal(\"template/edit-base.html\", \"新增支持渠道\", 2)'>" +
                                "<i class='fa fa-pencil'></i> 编辑</a> " +
                                " <a class='btn btn-xs btn-outline btn-danger' ng-click='dtl.handle.deleteItemFromTable(2)'><i class='fa fa-trash'></i> 删除</a>";
                        }
                    }
                ],
                onPageChange: function (pageNum, _pageSize) {
                    drawTable(pageSize === _pageSize ? pageNum: 1, _pageSize)
                    pageSize = _pageSize;
                }

            });

            $compile(qqq)($scope);
        }
        //是否启用
          function toggleItemStateFromTable() {
            swal({
              title: '是否启用？',
              showCancelButton: true,
              confirmButtonColor: '#d33',
              cancelButtonText: '取消',
              confirmButtonText: '是',
              width: '300px'
            }).then(function (res) {
              close()
            }, function (err) {
            });
          }

        //删除
        function deleteItemFromTable() {
            swal({
                title: '确认删除吗？',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonText: '取消',
                confirmButtonText: '删除',
                width: '300px'
            }).then(function (res) {
                close()
            }, function (err) {
            });
        }

        function contrlEnable() {
            swal({
                title: '确认此操作',
                showCancelButton: true,
                confirmButtonColor: '#23c6c8',
                cancelButtonText: '取消',
                confirmButtonText: '确认',
                width: '300px'
            }).then(function (res) {
                close()
            }, function (err) {
            });
        }


    }]);
})();

