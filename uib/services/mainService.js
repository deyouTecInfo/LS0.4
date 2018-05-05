define(["./services"], function(services) {
    "use strict";
    var urlLSRoom="LSGuanJZB/getLSRoom.action";//主界面路径-房型存货
    var urlStrLSPayment="LSPayment/getLSPayment.action";//回款金额
    var urlStrLSLand="LSLand/getLSLand.action";//土地投资数量
    var urlStrLSCapital="LSCapital/getLSCapital.action";//资金余额
    var urlStrLSlr="lslr/getLslr.action";//利润
    var urlStrLScdzj="cdzj/getCdzj.action";//沉淀资金
    var urlGuPiao ="share/getShare.action";//股票接口
    var urlWeather = "weather/getWeather.action";//天气接口
    var urlLog ="log/insertLog.action";
    var urlAuth ="LocalMac/getMacAuth.action";
    var urlMac ="LocalMac/getLocalMac.action";
    var urlda_ts ="LSds_ts/getLSds_ts.action";//数据抓取时间
    var urlsVedio ="lsVedio/getLsVedio.action";//视频列表
    var urlBIPAuth ="dplogin/login.action";//大屏bip权限登录
    var urlBIPAuthKK ="dplogin/kklogin.action";//大屏bip权限登录-kk端入口
    var urlMap ="Map/getMappro.action";//地图
    var urlMap1 ="Map/getMapcity.action";//地图
    var urlgetPrompt ="Map/getPrompt.action";//弹框内容数据
    var urlLSJtzm ="LSJtzm/gelSJtzm.action";//集团管理桌面第2版
    var urlLSJtzm1 ="LSJtzm/getLSJtzmqymx.action";//集团管理桌面第2版-区域明细
    var urlLSJtzmhw ="LSJtzmhw/getLSJtzmhw.action";//集团管理桌面第2版海外
    var urlJYSSO = "ssoTest/getdata.action";//教育集体单点测试
    var urlEduGro = "Education/getEducation.action";//教育集团管理桌面
    var urlGetshares = "Education/getshares.action";//教育集团股票信息
    var urlTuiPro = "Study/getStudySetion.action";//各学段学费及占比
    var urlGrowthRate = "Study/getGrowthRate.action";//学生人数及学费增长率
    var urlSumPer = "Study/getManagement.action";//最近学期经营概况

    //excel导出接口
    var exportHTXSExcel = "excel/exportHTXSExcel.action";//合同销售额
    var exportQRSRExcel = "excel/exportQRSRExcel.action";//确认收入
    var exportTDTZExcel = "excel/exportTDTZExcel.action";//土地投资数量
    var exportJSJLExcel = "excel/exportJSJLExcel.action";//季度结算净利润
    var exportJTRSExcel = "excel/exportJTRSExcel.action";//集团人数
    var exportCDZJExcel = "excel/exportCDZJExcel.action";//沉淀资金
    var exportDQCHExcel = "excel/exportDQCHExcel.action";//当前存货
    var exportHKJEExcel = "excel/exportHKJEExcel.action";//回款金额
    var exportYZRGExcel = "excel/exportYZRGExcel.action";//近一周认购
    var exportZJYEExcel = "excel/exportZJYEExcel.action";//资金余额
    var urlStr10 = "excel/exportWYTableExcel.action";//物业表格--导出

  //凤凰通接口
    var fftzc = "registration";		//注册人数
    var fftzcrc = "tJ";				//推荐人次
    var fftcjje = "cjScreen";			//成交金额
    var fftdt1 = "fhtRgProList";		//地图1
    var fftdt2 = "fhtCjProList";		//地图2
    var fftcjjepm = "fhtCjAreaName/ysTotaltopTen";	//集团当日成交金额排名前十项目
    var fftcjjezbpm = "fhtCjAreaName/proportiontopTen";	//凤凰通当日成交占比排名前十项目
    var fftjbn = "jyqkJbn";		//近半年成交金额及占比
    var fftqycjqq = "jyqkYp";		//凤凰通当年区域成交情况
    var fftzb = "jyqLocation";		//坐标


    services.constant('requestService', {
    	//访问参数前端标识
			/**
			 * pflag 项目入口标志
			 * paramArr 参数数组
			 */
		setParam : function(pflag,paramArr){
			var params = {};
			params.projectFlag =pflag;
			if (paramArr!=undefined) {
				for(var i=0;i<paramArr.length;i++){
					//var param = "param"+i;
					switch (i){
						case 0:
						params.param0 = paramArr[i];
							break;
						case 1:
						params.param1 = paramArr[i];
							break;
						case 2:
						params.param2 = paramArr[i];
							break;
						case 3:
						params.param3 = paramArr[i];
							break;
						case 4:
						params.param4 = paramArr[i];
							break;
						case 5:
						params.param5 = paramArr[i];
							break;
						case 6:
						params.param6 = paramArr[i];
							break;
						case 7:
						params.param7 = paramArr[i];
							break;
						case 8:
						params.param8 = paramArr[i];
							break;
						case 9:
						params.param9 = paramArr[i];
							break;
						case 10:
						params.param10 = paramArr[i];
							break;
						case 11:
						params.param11 = paramArr[i];
							break;
						case 12:
						params.param12 = paramArr[i];
							break;
						case 13:
						params.param13 = paramArr[i];
							break;
						case 14:
						params.param14 = paramArr[i];
							break;
						case 15:
						params.param15 = paramArr[i];
							break;
						case 16:
						params.param16 = paramArr[i];
							break;
						case 17:
						params.param17 = paramArr[i];
							break;
							
						default:
							break;
					}
					//params.param = paramArr[i];
				};
			} else{
				
			}
			
			// console.log(params);
			return params;
		},	
        /**
         * bip接口地址
         */
//		LS_SERVICE: "http://bids.countrygarden.com.cn:8088/commonService2/",
//		LS_SERVICE: "http://bidstest.countrygarden.com.cn:8080/commonService2/",
// 		LS_SERVICE: "http://localhost.countrygarden.com.cn:8080/commonService2/",
        LS_SERVICE: "http://localhost:8080/commonService2/",
		// FFT_SERVICE: "http://bids.countrygarden.com.cn:8088/FHT/",
		// FFT_SERVICE: "http://bidstest.countrygarden.com.cn:8090/FHT/",
		FFT_SERVICE: "http://localhost.countrygarden.com.cn:8080/FHT/",
        httpMethod:{
            M_GET: "GET",
            M_POST: "POST",
            M_PUT: "PUT",
            M_DELETE: "DELETE"
            
        }
    });
    services.factory("mainService", ["$q", "$http",'requestService' ,function($q, $http,requestService) {
        return {
         	//大屏幕主界面
         	getLSGuanJZB:function(pflag,paramArr,urlLS){
            	var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlLS
                }).success(function(response, status, headers, config) {
                	deferred.resolve(response);
                })
                return deferred.promise;
            },
         	//大屏幕主界面-房型存货
         	getLSRoom:function(pflag,paramArr){
            	var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlLSRoom
                }).success(function(response, status, headers, config) {
                	deferred.resolve(response);
                })
                return deferred.promise;
            },
         	//大屏幕合同销售额
         	getContractSales:function(pflag,paramArr,url){
            	var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+url
                }).success(function(response, status, headers, config) {
                	deferred.resolve(response);
                })
                return deferred.promise;
            },
         	//大屏幕近一周认购
         	getLSSub:function(pflag,paramArr,url){
            	var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+url
                }).success(function(response, status, headers, config) {
                	deferred.resolve(response);
                })
                return deferred.promise;
            },
         	//大屏幕回款金额
         	getLSPayment:function(pflag,paramArr){
            	var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlStrLSPayment
                }).success(function(response, status, headers, config) {
                	deferred.resolve(response);
                })
                return deferred.promise;
            },
         	//大屏幕当前存货
         	getLSStock:function(pflag,paramArr,url){
            	var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+url
                }).success(function(response, status, headers, config) {
                	deferred.resolve(response);
                })
                return deferred.promise;
            },
         	//大屏幕土地投资数量
         	getLSLand:function(pflag,paramArr){
            	var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlStrLSLand
                }).success(function(response, status, headers, config) {
                	deferred.resolve(response);
                })
                return deferred.promise;
            },
         	//大屏幕资金余额
         	getLSCapital:function(pflag,paramArr){
            	var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlStrLSCapital
                }).success(function(response, status, headers, config) {
                	deferred.resolve(response);
                })
                return deferred.promise;
            },
         	//大屏幕利润
         	getLSlr:function(pflag,paramArr){
            	var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlStrLSlr
                }).success(function(response, status, headers, config) {
                	deferred.resolve(response);
                })
                return deferred.promise;
            },
         	//大屏幕沉淀资金
         	getLScdzj:function(pflag,paramArr){
            	var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlStrLScdzj
                }).success(function(response, status, headers, config) {
                	deferred.resolve(response);
                })
                return deferred.promise;
            },
         	//大屏幕确认收入
         	getLSqrsr:function(pflag,paramArr,url){
            	var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+url
                }).success(function(response, status, headers, config) {
                	deferred.resolve(response);
                })
                return deferred.promise;
            },
         	//大屏视频列表
         	getLSVedio:function(pflag,paramArr){
            	var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlsVedio
                }).success(function(response, status, headers, config) {
                	deferred.resolve(response);
                })
                return deferred.promise;
            },
         	//excel导出
         	getExportExcel:function(pflag,paramArr,num){
         		var item = "";
         		switch (num){
         			case 1:
         			item = exportHTXSExcel;
         				break;
         			case 2:
         			item = exportQRSRExcel;
         				break;
         			case 3:
         			item = exportTDTZExcel;
         				break;
         			case 4:
         			item = exportJSJLExcel;
         				break;
         			case 5:
         			item = exportJTRSExcel;
         				break;
         			case 6:
         			item = exportCDZJExcel;
         				break;
         			case 7:
         			item = exportDQCHExcel;
         				break;
         			case 8:
         			item = exportHKJEExcel;
         				break;
         			case 9:
         			item = exportYZRGExcel;
         				break;
         			case 10:
         			item = exportZJYEExcel;
         				break;
         			case 11:
         			item = urlStr10;
         				break;
         			default:
         				break;
         		}
         		location.href= requestService.LS_SERVICE+item+"?param0=" + paramArr[0] +"&projectFlag="+pflag
            },
         	
         	//权限判断
         	getAuth:function(pflag,paramArr){
            	var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlAuth
                }).success(function(response, status, headers, config) {
                	deferred.resolve(response);
                })
                return deferred.promise;
            },
            //getBIP登录权限
            getBIPLogin:function(pflag,paramArr){
            	var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlBIPAuth
                }).success(function(response, status, headers, config) {
                	deferred.resolve(response);
                });
                return deferred.promise;
            },
            //getBIP登录权限-KK端入口
            getBIPLoginKK:function(pflag,paramArr){
            	var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlBIPAuthKK
                }).success(function(response, status, headers, config) {
                	deferred.resolve(response);
                });
                return deferred.promise;
            },
         	//mac地址获取
         	getMac:function(pflag,paramArr){
            	var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlMac
                }).success(function(response, status, headers, config) {
                	deferred.resolve(response);
                })
                return deferred.promise;
            },
         	//数据抓取时间
         	getDsts:function(pflag,paramArr){
            	var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlda_ts
                }).success(function(response, status, headers, config) {
                	deferred.resolve(response);
                })
                return deferred.promise;
            },
         	//碧桂园股票数据
         	getgupiao:function(pflag,paramArr){
            	var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlGuPiao
                }).success(function(response, status, headers, config) {
                	deferred.resolve(response);
                })
                return deferred.promise;
            },
         	//顺德天气数据
         	getWeather:function(pflag,paramArr){
            	var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlWeather
                }).success(function(response, status, headers, config) {
                	deferred.resolve(response);
                })
                return deferred.promise;
            },
          
           //插入logr日志
         	insertLog:function(pflag,paramArr){
         		var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlLog
                }).success(function(response, status, headers, config) {
                	deferred.resolve(response);
                })
                return deferred.promise;
         	},
         	
         	  //获取当前时间精确到秒
            getTime : function(){
            	var date=new Date();
				var year=date.getFullYear(); //获取当前年份
				var mon=date.getMonth()+1; //获取当前月份
				if ((mon+"").length<2) {
					mon ="0"+mon;
				} 
				var da=date.getDate(); //获取当前日
				if ((da+"").length<2) {
					da ="0"+da;
				} 
				var day=date.getDay(); //获取当前星期几
				var h=date.getHours(); //获取小时
				if ((h+"").length<2) {
					h ="0"+h;
				} 
				var m=date.getMinutes(); //获取分钟
				if ((m+"").length<2) {
					m ="0"+m;
				} 
				var s=date.getSeconds(); //获取秒
				if ((s+"").length<2) {
					s ="0"+s;
				} 
				return year+'-'+mon+'-'+da+' '+h+':'+m+':'+s;
            },
            
            //获取投策地图数据
         	getMappro:function(pflag,paramArr){
            	var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlMap
                }).success(function(response, status, headers, config) {
                	deferred.resolve(response);
                })
                return deferred.promise;
            },
          //获取投策地图数据
            getMapcity:function(pflag,paramArr){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlMap1
                }).success(function(response, status, headers, config) {
                    deferred.resolve(response);
                });
                return deferred.promise;
            },
            //弹框上面显示的信息内容
            getDialogContentData:function(pflag,paramArr){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlgetPrompt
                }).success(function(response, status, headers, config) {
                    deferred.resolve(response);
                });
                return deferred.promise;
            },
            //货量
            getGXCDevelop:function(pflag,paramArr,url){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+url
                }).success(function(response, status, headers, config) {
                    console.log(response);
                    deferred.resolve(response);
                });
                return deferred.promise;
            },
            //集团管理桌面第2版
            getLSJtzm:function(pflag,paramArr,url){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlLSJtzm
                }).success(function(response, status, headers, config) {
                    console.log(response);
                    deferred.resolve(response);
                });
                return deferred.promise;
            },
          //集团管理桌面第2版
            getLSJtzmqymx:function(pflag,paramArr,url){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlLSJtzm1
                }).success(function(response, status, headers, config) {
                    console.log(response);
                    deferred.resolve(response);
                });
                return deferred.promise;
            },
            //集团管理桌面第2版海外
            getLSJtzmhw:function(pflag,paramArr,url){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlLSJtzmhw
                }).success(function(response, status, headers, config) {
                    console.log(response);
                    deferred.resolve(response);
                });
                return deferred.promise;
            },


          //教育集团单点登录测试
            getSSOTest:function(pflag,paramArr,url){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlJYSSO
                }).success(function(response, status, headers, config) {
                    console.log(response);
                    deferred.resolve(response);
                });
                return deferred.promise;
            },
            
            //注册人数
            getFFTzc:function(pflag,paramArr,url){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    dataType: 'JSONP',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.FFT_SERVICE+fftzc
                }).success(function(response, status, headers, config) {
                    console.log(response);
                    deferred.resolve(response);
                });
                return deferred.promise;
            },
          //推荐人次
            getFFTzcrc:function(pflag,paramArr,url){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    dataType: 'JSONP',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.FFT_SERVICE+fftzcrc
                }).success(function(response, status, headers, config) {
                    console.log(response);
                    deferred.resolve(response);
                });
                return deferred.promise;
            },
          //成交金额
            getFFTcjje:function(pflag,paramArr,url){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    dataType: 'JSONP',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.FFT_SERVICE+fftcjje
                }).success(function(response, status, headers, config) {
                    console.log(response);
                    deferred.resolve(response);
                });
                return deferred.promise;
            },
          //地图1
            getFFTdt1:function(pflag,paramArr,url){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    dataType: 'JSONP',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.FFT_SERVICE+fftdt1
                }).success(function(response, status, headers, config) {
                    console.log(response);
                    deferred.resolve(response);
                });
                return deferred.promise;
            },
          //地图2
            getFFTdt2:function(pflag,paramArr,url){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    dataType: 'JSONP',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.FFT_SERVICE+fftdt2
                }).success(function(response, status, headers, config) {
                    console.log(response);
                    deferred.resolve(response);
                });
                return deferred.promise;
            },
          //集团当日成交金额排名前十项目
            getFFTcjjepm:function(pflag,paramArr,url){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    dataType: 'JSONP',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.FFT_SERVICE+fftcjjepm
                }).success(function(response, status, headers, config) {
                    console.log(response);
                    deferred.resolve(response);
                });
                return deferred.promise;
            },
          //凤凰通当日成交占比排名前十项目
            getFFTcjjezbpm:function(pflag,paramArr,url){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    dataType: 'JSONP',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.FFT_SERVICE+fftcjjezbpm
                }).success(function(response, status, headers, config) {
                    console.log(response);
                    deferred.resolve(response);
                });
                return deferred.promise;
            },
          //近半年成交金额及占比
            getFFTjbn:function(pflag,paramArr,url){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    dataType: 'JSONP',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.FFT_SERVICE+fftjbn
                }).success(function(response, status, headers, config) {
                    console.log(response);
                    deferred.resolve(response);
                });
                return deferred.promise;
            },
          //凤凰通当年区域成交情况
            getFFTqycjqq:function(pflag,paramArr,url){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    dataType: 'JSONP',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.FFT_SERVICE+fftqycjqq
                }).success(function(response, status, headers, config) {
                    console.log(response);
                    deferred.resolve(response);
                });
                return deferred.promise;
            },
          //坐标
            getFFTzb:function(pflag,paramArr,url){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    dataType: 'JSONP',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.FFT_SERVICE+fftzb
                }).success(function(response, status, headers, config) {
                    console.log(response);
                    deferred.resolve(response);
                });
                return deferred.promise;
            },
            //教育集团股票信息
            getShares:function(pflag,paramArr,url){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    dataType: 'JSONP',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlGetshares
                }).success(function(response, status, headers, config) {
                    console.log(response);
                    deferred.resolve(response);
                });
                return deferred.promise;
            },
             //最近学期经营概况
             getManagement:function(pflag,paramArr,url){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    dataType: 'JSONP',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlSumPer
                }).success(function(response, status, headers, config) {
                    console.log(response);
                    deferred.resolve(response);
                });
                return deferred.promise;
            },

            //各学段学费及占比
            getStudySetion:function(pflag,paramArr,url){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    dataType: 'JSONP',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlTuiPro
                }).success(function(response, status, headers, config) {
                    console.log(response);
                    deferred.resolve(response);
                });
                return deferred.promise;
            },
            //学生人数及学费增长率
            getGrowthRate:function(pflag,paramArr,url){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    dataType: 'JSONP',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlGrowthRate
                }).success(function(response, status, headers, config) {
                    console.log(response);
                    deferred.resolve(response);
                });
                return deferred.promise;
            },
            //最近学期经营概况
            getEducation:function(pflag,paramArr,url){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    dataType: 'JSONP',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlEduGro
                }).success(function(response, status, headers, config) {
                    console.log(response);
                    deferred.resolve(response);
                });
                return deferred.promise;
            },

        };
    }]);
});