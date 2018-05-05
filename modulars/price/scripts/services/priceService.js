define(["./services"], function(services) {
    "use strict";
    var urlqccpNewProProfit = "Syqcnewxmjlr/getSyqcnewxmjlr.action" //新开盘项目净利润情况
	var urlqccpYiChang = "Syqcycjj/getSyqcycjj.action";//异常降价监控
	var urlqccpNearAvePri = "Syqcjtyearjjzs/getSyqcjtyearjjzs.action"//集团近一年均价走势图
	var urlqccpNearClassAvePri = "Syqcjtyearjjzs/getSyqcjtwylxjj.action"//各物业类型一年均价走势
	var urlqccpLastMonthAvgPrice = "Syqcjtqyjj/getSyqcjtqyjj.action"//集团各区域近一个月成交均价情况
	var urlqccpXiaZuanChartOne = "Syqcjtyearjjzs/getSyqcjtwyxzlx.action"//第一个下钻图点击图例请求数据
	var urlqccpXiaZuanChartTwo = "Syqcjtyearjjzs/getSyqcjtwyxzyf.action"//第一个下钻图点击月份请求数据
	var urlqccpChartTHree = "Syqclslsjj/getSyqclslsjj.action"//劳斯莱斯产品近一年均价走势
	var urlqccpChartTHreeClass = "Syqclslsjj/getSyqclslslei.action"//劳斯莱斯产品类型
	var urlqccpChartThreeXiaZuan1 = "Syqclslsjj/getSyqclslslx.action"//劳斯莱斯产品点击图例下钻
	var urlqccpChartThreeXiaZuan2 = "Syqclslsjj/getSyqclslsyf.action"//劳斯莱斯产品点击月份下钻
	var urlqccpChartFive = "Syqcqyyjpd/getSyqcqyyjpd.action"//17年各区域溢价/破底情况
	var urlqccpTab = "Syqcqyyjpd/getSyqcqyyjpdxz.action"//17年各区域溢价/破底情况,具体区域

    services.factory("priceService", ["$q", "$http","requestService", function($q, $http,requestService) {
        return {



            //qccp修改-start
            //前策产品异常降价监控
            getqccpNewProProfit:function(pflag,paramArr){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlqccpNewProProfit
                }).success(function(response, status, headers, config) {
                    deferred.resolve(response);
                })
                return deferred.promise;
            },
            getqccpYiChang:function(pflag,paramArr){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlqccpYiChang
                }).success(function(response, status, headers, config) {
                    deferred.resolve(response);
                })
                return deferred.promise;
            },
            getqccpLastMonthAvgPrice:function(pflag,paramArr){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlqccpLastMonthAvgPrice
                }).success(function(response, status, headers, config) {
                    deferred.resolve(response);
                })
                return deferred.promise;
            },
            getqccpNearAvePri:function(pflag,paramArr){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlqccpNearAvePri
                }).success(function(response, status, headers, config) {
                    deferred.resolve(response);
                })
                return deferred.promise;
            },
            getqccpNearClassAvePri:function(pflag,paramArr){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlqccpNearClassAvePri
                }).success(function(response, status, headers, config) {
                    deferred.resolve(response);
                })
                return deferred.promise;
            },
            getqccpXiaZuanChartOne:function(pflag,paramArr){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlqccpXiaZuanChartOne
                }).success(function(response, status, headers, config) {
                    deferred.resolve(response);
                })
                return deferred.promise;
            },
            getqccpXiaZuanChartTwo:function(pflag,paramArr){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlqccpXiaZuanChartTwo
                }).success(function(response, status, headers, config) {
                    deferred.resolve(response);
                })
                return deferred.promise;
            },
            getqccpChartTHree:function(pflag,paramArr){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlqccpChartTHree
                }).success(function(response, status, headers, config) {
                    deferred.resolve(response);
                })
                return deferred.promise;
            },
            getqccpChartTHreeClass:function(pflag,paramArr){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlqccpChartTHreeClass
                }).success(function(response, status, headers, config) {
                    deferred.resolve(response);
                })
                return deferred.promise;
            },
            getqccpChartTHreeXiaZuan1:function(pflag,paramArr){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlqccpChartThreeXiaZuan1
                }).success(function(response, status, headers, config) {
                    deferred.resolve(response);
                })
                return deferred.promise;
            },
            getqccpChartTHreeXiaZuan2:function(pflag,paramArr){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlqccpChartThreeXiaZuan2
                }).success(function(response, status, headers, config) {
                    deferred.resolve(response);
                })
                return deferred.promise;
            },
            getqccpChartFive:function(pflag,paramArr){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlqccpChartFive
                }).success(function(response, status, headers, config) {
                    deferred.resolve(response);
                })
                return deferred.promise;
            },
            getqccpTab:function(pflag,paramArr){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlqccpTab
                }).success(function(response, status, headers, config) {
                    deferred.resolve(response);
                })
                return deferred.promise;
            },

            //qccp修改-end

        };
    }]);
     
});