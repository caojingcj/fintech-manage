(function () {
    'use strict';

    app.controller('managerCtrl', ['$scope', 'REST', 'dateFilter', '$timeout', '$compile', 'RS', '$state', function ($scope, REST, dateFilter, $timeout, $compile, RS, $state) {
        var vm = this;

        vm.handle = {
            search: search,
            search2: search2,
            export: exportTable,
            drawTable: drawTable,
            draw: draw,
            addMerchant:addMerchant
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
            // REST.get('order/refund/queryYdcOrderRefundByPage.do?pageSize=' + pageSize + '&pageIndex=' + pageNum, vm.handle.searchBy).then(function (res) {
            //     vm.handle.draw(res.data);
            // });
        }

        function addMerchant (whichModal) {
            swal({
                title: '<div style="margin-bottom:15px;"> 新增商户 </div>',
                html: '<div id="swalHtml"></div>',
                showConfirmButton: false,
                allowOutsideClick: false,
                target: '.detailPage',
                width: '600px'
            }).then(function () {
            }, function () {
            });
            $compile('<div ng-include=\'"' + whichModal + '"\'></div>')($scope).appendTo('#swalHtml');
        }



        var dataList = ({
            "dataList": [
              {
                "ID": 999999,
                "BEAUTY_NAME": "祛痘",
                "COMPANY_NAME": "痘院长呼和浩特旗舰店",
                "ID_CARD": "内蒙古自治区呼和浩特市",
                "time": "2018-05-28 12:30:52",
                "USER_NAME": "韦建富",
                "PHONE": 13958875469,
                "haierStatusMemo": 0
              },
              {
                "ID": 105045,
                "BEAUTY_NAME": "祛痘",
                "COMPANY_NAME": "株洲痘院长",
                "ID_CARD": "湖南省株洲市",
                "time": "2018-05-28 11:53:15",
                "USER_NAME": "卓晓斌",
                "PHONE": 13987446357,
                "haierStatusMemo": 1
              },
              {
                "ID": 105044,
                "BEAUTY_NAME": "整形",
                "COMPANY_NAME": "上饶德尔美客整形",
                "ID_CARD": "江西省上饶市",
                "time": "2018-05-28 11:44:23",
                "USER_NAME": "刘妮",
                "PHONE": 13946851357,
                "haierStatusMemo": 1
              },
              {
                "ID": 105043,
                "BEAUTY_NAME": "祛痘",
                "COMPANY_NAME": "蕾特恩昆明朗悦湾店",
                "ID_CARD": "云南省昆明市",
                "time": "2018-05-28 09:26:35",
                "USER_NAME": "何杨孟琦",
                "PHONE": 13979846851,
                "haierStatusMemo": 0
              },
              {
                "ID": 105041,
                "BEAUTY_NAME": "祛痘",
                "COMPANY_NAME": "苗医生宁波市江东店",
                "ID_CARD": "浙江省宁波市",
                "time": "2018-05-27 14:34:00",
                "USER_NAME": "吴珂钰",
                "PHONE": 13913254876,
                "haierStatusMemo": 1
              },
              {
                "ID": 105040,
                "BEAUTY_NAME": "祛痘",
                "COMPANY_NAME": "苗方清颜郴州名汇城店",
                "ID_CARD": "湖南省郴州市",
                "time": "2018-05-26 20:49:18",
                "USER_NAME": "顾隆",
                "PHONE": 13985421638,
                "haierStatusMemo": 0
              },
              {
                "ID": 105039,
                "BEAUTY_NAME": "祛痘",
                "COMPANY_NAME": "萃颜堂成都总部",
                "ID_CARD": "四川省成都市",
                "time": "2018-05-26 15:12:44",
                "USER_NAME": "黄茹香",
                "PHONE": 13987453645,
                "haierStatusMemo": 0
              },
              {
                "ID": 105025,
                "BEAUTY_NAME": "祛痘",
                "COMPANY_NAME": "韩方科颜泉州丰泽店",
                "ID_CARD": "福建省泉州市",
                "time": "2018-05-25 16:43:53",
                "USER_NAME": "李娟",
                "PHONE": 13965487120,
                "haierStatusMemo": 1
              },
              {
                "ID": 105026,
                "BEAUTY_NAME": "专科",
                "COMPANY_NAME": "广州市花都区港龙医疗VIP",
                "ID_CARD": "广东省广州市",
                "time": "2018-05-25 15:13:25",
                "USER_NAME": "高攀飞",
                "PHONE": 13932014587,
                "haierStatusMemo": 1
              },
              {
                "ID": 105022,
                "BEAUTY_NAME": "祛痘",
                "COMPANY_NAME": "蕾特恩广州云城店",
                "ID_CARD": "广东省广州市",
                "time": "2018-05-24 11:53:52",
                "USER_NAME": "唐勤",
                "PHONE": 13952456327,
                "haierStatusMemo": 1
              },
              {
                "ID": 105018,
                "BEAUTY_NAME": "祛痘",
                "COMPANY_NAME": "蕾特恩深圳黄贝岭店VIP",
                "ID_CARD": "广东省深圳市",
                "time": "2018-05-23 17:02:58",
                "USER_NAME": "刘菊",
                "PHONE": 13996325748,
                "haierStatusMemo": 0
              }
            ]
        });

        draw(dataList);

        function draw(res) {
            var qqq = $('#businessTable').bootstrapTable('destroy').bootstrapTable({
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
                        field: 'ID',
                        title: '商户编号',
                        align:'left',
                        formatter: function (val,row) {
                            var template ='<a ui-sref=\'app.company.companyDetail({applyDetail:' + JSON.stringify(row) + '})\'>' + val + '</a>';
                            return template;
                        }
                    }
                    , {
                        field: 'COMPANY_NAME',
                        title: '商户名称',
                        align:'left',
                    }
                    , {
                        field: 'ID_CARD',
                        title: '省区城市',
                        align:'left',
                    }
                    ,
                    {
                        field: 'PHONE',
                        title: '手机号'
                    }
                   ,
                    {
                        field: 'time',
                        title: '创建时间',
                    }
                    , {
                        field: 'BEAUTY_NAME',
                        title: '商户类型',

                    }
                    , {
                        field: 'haierStatusMemo',
                        title: '商户状态',
                        formatter:function (val) {
                            var valname;
                            if(val){
                                valname = "<span class=\"label label-info\">启用</span>";
                            }else{
                                valname = "<span class=\"label\">禁用</span>";
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