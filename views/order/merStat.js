(function () {
    'use strict';
    app.controller('statCtrl', ['$scope', 'REST', 'dateFilter', '$timeout', '$compile', 'RS', 'currencyFilter', 'numberFilter', '$window', function ($scope, REST, dateFilter, $timeout, $compile, RS, currencyFilter, numberFilter, $window) {
        var vm = this;
        vm.handle = {
            draw: draw,
            financial:financial
        };

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

        var dataLiat = ({
            "dataList": [
              {
                "number": "225720279959191675",
                "applName": "伊艳萍",
                "signTime": "2017-10-23 13:27:17",
                "interestAmount": "蕾特恩广汉旗舰店",
                "seq": '1 / 12',
                "caozuo": 0,
                "debitEndDate": "2017-10-22",
                "channelCode": "offline",
                "totalAmount": "410.21",
                "Principal": '10000.00',
                "Interest": '56000.00',
                "Management": '1200.00',
                "status": '0',
                "day": '100天'
              },
              {
                "number": "301903544129592144",
                "applName": "樊作敬",
                "signTime": "2018-03-28 08:45:49",
                "interestAmount": "广西爱思特医疗美容",
                "seq": '2 / 12',
                "caozuo": 1,
                "debitEndDate": "2018-03-28",
                "channelCode": "wechat",
                "totalAmount": "1,187.87",
                "Principal": '12000.00',
                "Interest": '56000.00',
                "Management": '4200.00',
                "status": '1',
                  "day": '无'
              },
              {
                "number": "242905313698624794",
                "applName": "赵洪梅",
                "signTime": "2018-04-02 19:01:37",
                "interestAmount": "长沙美莱医疗美容",
                "seq": '3 / 12',
                "caozuo": 1,
                "debitEndDate": "2018-04-24",
                "channelCode": "alipay",
                "totalAmount": "833.33",
                "Principal": '2044000.00',
                "Interest": '5604400.00',
                "Management": '2200.00',
                "status": '9',
                  "day": '无'

              },
              {
                "number": "174712759667442684",
                "applName": "李艳",
                "signTime": "2018-02-17 08:45:58",
                "interestAmount": "广州美莱医疗美容",
                "seq": '4 / 12',
                "caozuo": 1,
                "debitEndDate": "2018-02-17",
                "channelCode": "chinapay",
                "totalAmount": "9,466.67",
                "Principal": '123003.00',
                "Interest": '560020.00',
                "Management": 0,
                "status": '8',
                  "day": '无'

              }
            ]
        });

        draw(dataLiat);

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
                        field: 'number',
                        title: '合同号/客户姓名',
                        formatter:function (val,row) {
                            var template;
                            return  "<span>"+ row.number +" </span><br /><span>" + row.applName || ''
                        }
                    }
                    , {
                        field: 'interestAmount',
                        title: '商户名称',
                    }
                    , {
                        field: 'seq',
                        title: '期数',
                    }
                    , {
                        field: 'debitEndDate',
                        title: '还款时间',
                        formatter:function (val,row) {
                            var template;
                            return  "<span>应还："+ row.debitEndDate +" </span><br /><span>实还：" + row.signTime || ''
                        }
                    }
                    ,
                    {
                        field: 'channelCode',
                        title: '还款渠道',
                        formatter: function (val) {
                            return  '<span class="label label-warning">线下</span>' ||  '-'
                        }
                    }
                    , {
                        field: 'status',
                        title: '还款状态',
                        formatter: function (val) {
                            return val === '0' ? '<span class="label label-danger">未还款</span>' : val === '1' ? '<span class="label label-success">已还款</span>' : val === '9' ? '<span class="label label-info">已提前结清</span>' : val === '8' ? '<span class="label ">已退款</span>' : '-'
                        }
                    }
                    , {
                        field: 'totalAmount',
                        title: '还款金额',
                        align:'left',
                        formatter: function (a, row) {
                          var money;
                          if(row.Management){
                           money = "<span>本&nbsp;&nbsp;&nbsp;&nbsp;金："+ row.Principal +" 元</span><br /><span>利&nbsp;&nbsp;&nbsp;&nbsp;息："+ row.Interest +" 元<span><br />罚&nbsp;&nbsp;&nbsp;&nbsp;息："+ row.Principal +" 元</span><br /><span>管理费："+ row.Management +" 元</span>";
                          }else{
                            money = "-";
                          }
                          return money;
                        }
                    }, {
                        field: 'day',
                        title: '逾期情况',
                        cellStyle:function(value,row,index){
                            if(value!='无'){
                                return {css:{"color":"red"}}
                            } return {css:{"color":""}}

                        }
                    }
                    , {
                        field: 'caozuo',
                        title: '操作',
                        formatter: function (a, row) {
                                var name;
                                if(row.caozuo == 1){
                                    name = '<a class="btn btn-xs btn-outline btn-danger" ng-click="ren.handle.financial()">线下还款</a>';
                                }else {
                                    name = "-";
                                }
                                return name;
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

        function formatDate (val) {
            return dateFilter(val, 'yyyy-MM-dd HH:mm:ss');
        }

        function financial(){
            swal({
                title: '确认此操作',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonText: '取消',
                confirmButtonText: '确认',
                width: '300px'
            }).then(function (res) {
                close()
            }, function (err) {
            });
        }

        $('[data-toggle="tooltip"]').tooltip();
    }]);
})();