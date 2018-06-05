(function () {
    'use strict';

    app.controller('applyCtrl', ['$scope', 'REST', 'dateFilter', '$timeout', '$compile', 'RS', '$state', function ($scope, REST, dateFilter, $timeout, $compile, RS, $state) {
        var vm = this;

        vm.handle = {
            search: search,
            search2: search2,
            export: exportTable,
            drawTable: drawTable,
            draw: draw,
        };

        function initSearchParams() {
            vm.searchBy = {
                operationState: 16,
                searchNameOrCompanyId: '',
                searchRealNameOrMobile: '',
                page: 1,
                size: 10
            };
        }

        function resetTime() {
            vm.searchBy = {
                operationState: 16,
                searchNameOrCompanyId: '',
                searchRealNameOrMobile: '',
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
                    operationState: searchParams.operationState,
                    searchNameOrCompanyId: searchParams.searchNameOrCompanyId,
                    searchRealNameOrMobile: searchParams.searchRealNameOrMobile,
                    page: searchParams.page,
                    size: searchParams.size
                };
            } else {
                initSearchParams()
            }
            vm.handle.drawTable(vm.searchBy.page, vm.searchBy.size || 10);
        }

        function search() {
            if (vm.searchBy.whichOs === 2) {
                vm.searchBy.STATE = '';
                vm.searchBy.sendType = '';
            }
            vm.searchBy.nameOrPhone = vm.searchBy.searchKeys;
            sessionStorage.setItem('applySearchParams', JSON.stringify(vm.searchBy));
            this.drawTable(1, vm.searchBy.size);
        }

        function search2() {
            resetTime();
            sessionStorage.removeItem('applySearchParams');
        }

        function exportTable() {

        }

        function drawTable(pageNum, pageSize) {
            $('#businessTable').bootstrapTable('showLoading');

        }


        var dataList = ({
            "dataList": [
              {
                "BEAUTY_NAME": "方青",
                "haierStatusMemo": "上海美莱",
                "STATE": "45,800.00",
                "applyBeginTime": "2018-11-11 15:30:55",
                "MEDICAL_BEAUTY": "6",
                "TRANS_MONEY": '0',
                "COMPANY_ID": "108172",
                "SEND_TYPE": "00",
                "EXT_HEALTH_ID": "4f3bb990a453414c8938be625e31e42e",
                "hosId": "108172",
              },
              {
                "BEAUTY_NAME": "孟伟",
                "haierStatusMemo": "重庆华美整形美容医院",
                "STATE": "7,800.00",
                "applyBeginTime": "2018-05-31 10:02:55",
                "MEDICAL_BEAUTY": "3",
                "TRANS_MONEY": '0',
                "COMPANY_ID": "108172",
                "SEND_TYPE": "01",
                "EXT_HEALTH_ID": "4f3bb990a453414c8938be625e31e42e",
                "hosId": "108172",
              },
              {
                "BEAUTY_NAME": "刘明翠",
                "haierStatusMemo": "东莞美立方美容医院3",
                "STATE": "13,140.00",
                "applyBeginTime": "2018-05-31 09:50:13",
                "MEDICAL_BEAUTY": "12",
                "TRANS_MONEY": '1',
                "COMPANY_ID": "108172",
                "SEND_TYPE": "02",
                "EXT_HEALTH_ID": "4f3bb990a453414c8938be625e31e42e",
                "hosId": "108172",
              },
              {
                "BEAUTY_NAME": "左亚萍",
                "haierStatusMemo": "欣奕除疤郑州文化路店",
                "STATE": "2,100.00",
                "applyBeginTime": "2018-05-31 09:53:03",
                "MEDICAL_BEAUTY": "12",
                "TRANS_MONEY": '0',
                "COMPANY_ID": "108172",
                "SEND_TYPE": "03",
                "EXT_HEALTH_ID": "4f3bb990a453414c8938be625e31e42e",
                "hosId": "108172",
              },
              {
                "BEAUTY_NAME": "贾光斌",
                "haierStatusMemo": "南京新生植发",
                "STATE": "13,200.00",
                "applyBeginTime": "2018-05-31 09:36:54",
                "MEDICAL_BEAUTY": "6",
                "TRANS_MONEY": '1',
                "COMPANY_ID": "108172",
                "SEND_TYPE": "04",
                "EXT_HEALTH_ID": "4f3bb990a453414c8938be625e31e42e",
                "hosId": "108172",
              },
              {
                "BEAUTY_NAME": "李婉莹",
                "haierStatusMemo": "三门峡华美整形",
                "STATE": "3,480.00",
                "applyBeginTime": "2018-05-31 09:27:13",
                "MEDICAL_BEAUTY": "12",
                "TRANS_MONEY": '0',
                "COMPANY_ID": "108172",
                "SEND_TYPE": "05",
                "EXT_HEALTH_ID": "4f3bb990a453414c8938be625e31e42e",
                "hosId": "108172",
              },
              {
                "BEAUTY_NAME": "覃善表",
                "haierStatusMemo": "东莞樟木头万豪门诊部\t",
                "STATE": "2,800.00",
                "applyBeginTime": "2018-05-31 09:26:02",
                "MEDICAL_BEAUTY": "24",
                "TRANS_MONEY": '0',
                "COMPANY_ID": "108172",
                "SEND_TYPE": "11",
                "EXT_HEALTH_ID": "4f3bb990a453414c8938be625e31e42e",
                "hosId": "108172",
              },{
                "BEAUTY_NAME": "林兴泛",
                "haierStatusMemo": "蕾特恩抚州临川店\t",
                "STATE": "18,888.00",
                "applyBeginTime": "2018-05-31 10:02:13",
                "MEDICAL_BEAUTY": "9",
                "TRANS_MONEY": '1',
                "COMPANY_ID": "108172",
                "SEND_TYPE": "12",
                "EXT_HEALTH_ID": "4f3bb990a453414c8938be625e31e42e",
                "hosId": "108172",
              },{
                "BEAUTY_NAME": "伍家贤",
                "haierStatusMemo": "蕾特恩东莞南城鸿福店",
                "STATE": "49,800.00",
                "applyBeginTime": "2018-05-31 00:12:12",
                "MEDICAL_BEAUTY": "24",
                "TRANS_MONEY": '0',
                "COMPANY_ID": "108172",
                "SEND_TYPE": "13",
                "EXT_HEALTH_ID": "4f3bb990a453414c8938be625e31e42e",
                "hosId": "108172",
              },{
                "BEAUTY_NAME": "陈批欧",
                "haierStatusMemo": "南京龙蟠结石医院",
                "STATE": "30,000.00",
                "applyBeginTime": "2018-05-31 09:06:32",
                "MEDICAL_BEAUTY": "6",
                "TRANS_MONEY": '0',
                "COMPANY_ID": "108172",
                "SEND_TYPE": "99",
                "EXT_HEALTH_ID": "4f3bb990a453414c8938be625e31e42e",
                "hosId": "108172",
              }



            ]
        });

        draw(dataList);

        function draw(res) {
            var qqq = $('#displayFinance').bootstrapTable('destroy').bootstrapTable({
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
                        field: 'BEAUTY_NAME',
                        title: '客户姓名',
                        formatter: function (val,row) {
                            var template ='<a ui-sref=\'app.order.applyDetail({applyDetail:' + JSON.stringify(row) + '})\'>' + val + '</a>';
                            return template;
                        }
                    }
                    , {
                        field: 'haierStatusMemo',
                        title: '商户名称'
                    }
                    , {
                        field: 'STATE',
                        title: '申请金额',
                    }
                    , {
                        field: 'MEDICAL_BEAUTY',
                        title: '期数',
                    }
                    , {
                        field: 'applyBeginTime',
                        title: '申请时间',
                    }

                    , {
                        field: 'BEAUTY_NAME',
                        title: '咨询师姓名',
                    }
                    , {
                        field: 'TRANS_MONEY',
                        title: '是否担保客户',
                        formatter:function (val) {
                            return val === '0' ? '是' : '否'
                        }
                    }
                    , {
                        field: 'SEND_TYPE',
                        title: '审批状态',
                        formatter:function (val) {
                            var valname;
                            if(val === '00'){
                                valname = "<span class=\"label label-info\">录入中</span>";
                            }else if(val === '01'){
                                valname = "<span class=\"label label-warning\">待审批</span>";
                            }else if(val === '02'){
                                valname = "<span class=\"label label-success\">审批中</span>";
                            }else if(val === '03'){
                                valname = "<span class=\"label label-danger\">审批拒绝</span>";
                            }else if(val === '04'){
                                valname = "<span class=\"label label-warning-light\">待用户签署</span>";
                            }else if(val === '05'){
                                valname = "<span class=\"label label-info\">分期还款中</span>";
                            }else if(val === '11'){
                                valname = "<span class=\"label \">已取消</span>";
                            }else if(val === '12'){
                                valname = "<span class=\"label label-success\">已退款</span>";
                            }else if(val === '13'){
                                valname = "<span class=\"label label-primary\">已提前结清</span>";
                            }else if(val === '99'){
                                valname = "<span class=\"label label-primary\">已结清</span>";
                            }else {
                                valname = "-";
                            }
                            return valname;
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

        function formatMoney(val) {
            return val ? currencyFilter(val, '￥') : '-'
        }

    }]);

})();