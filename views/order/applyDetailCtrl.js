(function () {
    'use strict';

    app.controller('applyDetailCtrl', ['$scope', '$compile', 'REST', '$stateParams', 'dateFilter', '$sce', '$timeout', 'RS', '$window', 'numberFilter',
        function ($scope, $compile, REST, $stateParams, dateFilter, $sce, $timeout, RS, $window, numberFilter) {
            var vm = this;

            vm.handle = {
                deleteItemFromTable: deleteItemFromTable,
                cancelOrder: cancelOrder,
                guarantee:guarantee
            };
            // 担保通过
            function guarantee() {
                swal({
                    title: '确认您的操作',
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
            // 取消
           // 在yyyy-MM-dd前取消该订单，不需要收取任何手续费！已超过10天免息期，请上传手续费凭证，经后台审核后即可取消该订单！
            vm.status = 10;
            function cancelOrder() {
                var template =
                    '<div ng-if="'+vm.status+'">'+
                    '<p class="text-danger" style="font-size: 12px;">已超过10天免息期，请上传手续费凭证，经后台审核后即可取消该订单！</p>' +
                    '      <form enctype="multipart/form-data" method="POST">' +
                    '           <div style="padding:0 20px;">' +
                    '                <input name="file1" class="voucher" type="file" id="voucher" data-min-file-count="1" disabled>' +
                    '           </div>' +
                    '      </form>'+
                    '</div>';

                var title = vm.status === 10 ? '取消订单' : vm.status === 0 ? '上传打款凭证' : '';
                swal({
                    title: title,
                    html: template,
                    preConfirm: function () {
                        return new Promise(function (resolve, reject) {
                            if ($('#voucher')[0].value === '') {
                                reject('您还未选择文件！')
                            } else {
                                resolve()
                            }
                        })
                    },
                    showCancelButton: true,
                    allowOutsideClick: false,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    width: '400px'
                }).then(function (file) {
                }, function () {
                });

                $("input[type=file].voucher").fileinput({ //这里的id是input标签的id
                    allowedFileExtensions: ['jpeg', 'jpg', 'png', 'rar', 'zip', 'pdf'], // 允许的文件类型
                    overwriteInitial: false,
                    showPreview: false, //是否显示预览,不写默认为true
                    showCaption: true, //是否显示标题
                    language: 'zh', //设置语言
                    maxFileSize: 5000, //文件的最大大小 5000KB=5兆
                    maxFilesNum: 20, //最多文件数量
                    autoReplace: false,
                    showUpload: false, //是否显示上传按钮
                    enctype: 'multipart/form-data',
                    slugCallback: function (filename) {
                        return filename.replace('(', '_').replace(']', '_');
                    }
                })
            }

            function deleteItemFromTable() {
                var template =
                    '<p class="text-danger">只支持jpg、zip、png格式且单文件大小不能超过5.0M</p>' +
                    '      <form enctype="multipart/form-data" method="POST">' +
                    '           <div style="padding:0 20px;">' +
                    '                <input name="file1" class="voucher" type="file" id="voucher" data-min-file-count="1">' +
                    '           </div>' +
                    '      </form>';
                swal({
                    title: '上传担保函',
                    html: template,
                    preConfirm: function () {
                        return new Promise(function (resolve, reject) {
                            if ($('#voucher')[0].value === '') {
                                reject('您还未选择文件！')
                            } else {
                                resolve()
                            }
                        })
                    },
                    showCancelButton: true,
                    allowOutsideClick: false,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    width: '400px'
                }).then(function (file) {
                }, function () {
                });

                $("input[type=file].voucher").fileinput({ //这里的id是input标签的id
                    allowedFileExtensions: ['jpeg', 'jpg', 'png', 'rar', 'zip', 'pdf'], // 允许的文件类型
                    overwriteInitial: false,
                    showPreview: false, //是否显示预览,不写默认为true
                    showCaption: true, //是否显示标题
                    language: 'zh', //设置语言
                    maxFileSize: 5000, //文件的最大大小 5000KB=5兆
                    maxFilesNum: 20, //最多文件数量
                    autoReplace: false,
                    showUpload: false, //是否显示上传按钮
                    enctype: 'multipart/form-data',
                    slugCallback: function (filename) {
                        return filename.replace('(', '_').replace(']', '_');
                    }
                })
            }


            var dataList = ({
                "dataList": [{
                    "seq": 1,
                    "sendName": '2018-05-31 09:06:32',
                    "sendTime": "543.00",
                    "sendMobile": "已还",
                    "TRANS_MONEY": '支付宝',
                    "dddd": '无',
                },
                    {
                        "seq": 2,
                        "sendName": '2018-06-31 09:06:32',
                        "sendTime": "543.00",
                        "sendMobile": "未还",
                        "TRANS_MONEY": '',
                        "dddd": '无',
                    },
                    {
                        "seq": 3,
                        "sendName": '2018-07-31 09:06:32',
                        "sendTime": "543.00",
                        "sendMobile": "未还",
                        "TRANS_MONEY": '',
                        "dddd": '10 天',
                    }]
            });

            drawTable(1, 10);

            function drawTable() {
                $timeout(function () {
                    $('#repaymentPlan').bootstrapTable('showLoading');
                    repaymentPlanTable(dataList)
                })
            }

            repaymentPlanTable(false);

            function repaymentPlanTable(res) {
                var qqq = $('#repaymentPlan').bootstrapTable('destroy').bootstrapTable({
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
                            field: 'seq',
                            title: '还款期数'
                        },
                        {
                            field: 'sendName',
                            title: '应还日期'
                        },
                        {
                            field: 'sendTime',
                            title: '应还金额',
                            align: 'left',
                            formatter: function (val, row) {
                                var template;
                                return template = "<span>本&nbsp;&nbsp;&nbsp;&nbsp;金：" + row.sendTime + " 元</span><br /><span>利&nbsp;&nbsp;&nbsp;&nbsp;息：" + row.sendTime + " 元</span><br /><span>管理费：" + row.sendTime + " 元</span>";
                            }

                        },
                        {
                            field: 'sendMobile',
                            title: '还款状态'
                        },
                        {
                            field: 'TRANS_MONEY',
                            title: '还款渠道',
                        },
                        {
                            field: 'dddd',
                            title: '逾期情况',
                            cellStyle: function (value, row, index) {
                                if (value != '无') {
                                    return {css: {"color": "red"}}
                                }
                                return {css: {"color": ""}}

                            }
                        }
                    ],
                    onPageChange: function (pageNum, _pageSize) {
                        drawTable(pageSize === _pageSize ? pageNum : 1, _pageSize)
                        pageSize = _pageSize;
                    },

                    // rowStyle: function (row, index) {
                    //     var style = {};
                    //     if(row.dddd!='无'){
                    //         style={css:{'color':'#ed5565'}};
                    //     }
                    //     return style;
                    // }

                });

                $compile(qqq)($scope);
            }

        }]);

})();