define(['angular'], function (angular) {
    'use strict';
    var mod= angular.module('tl.tool', []);


    mod.factory("$tool", ["$q", "$http","$state",'$rootScope','mainService', function($q, $http,$state,$rootScope,mainService) {

        var serviceModel=function($q, $http,$cookieStore){
        	//获取年月日 例如：2016年5月17日
        	var _this = this;
			this.getDate = function(datestr){
				var dt,y,m,d,h,mm,s,xx,res;
				if(datestr!=""&&datestr!=undefined){
					dt = datestr.split("-");
					y = dt[0];
					m = dt[1];
					d = dt[2].substr(0,2);
					xx = dt[2].substr(3,8).split(":");
					h = xx[0];
					mm = xx[1];
					s = xx[2];
				};
				res = y+"-"+m+"-"+d+" "+h+":"+mm;
				return res;
			};
			//获取年  例如：2016
			this.getYear = function(datestr){
				var dt,y,m,d,res;
				if(datestr!=""&&datestr!=undefined){
					dt = datestr.split("-");
					y = dt[0];
					m = dt[1];
					d = dt[2].substr(0,2);
				};
				res = y;
				return res;
			};
			//获取月  例如：11
			this.getMonth = function(datestr){
				var dt,y,m,d,res;
				if(datestr!=""&&datestr!=undefined){
					dt = datestr.split("-");
					y = dt[0];
					m = dt[1];
					d = dt[2].substr(0,2);
				};
				res = m;
				return res;
			};
			//获取日  例如：02
			this.getDay = function(datestr){
				var dt,y,m,d,res;
				if(datestr!=""&&datestr!=undefined){
					dt = datestr.split("-");
					y = dt[0];
					m = dt[1];
					d = dt[2].substr(0,2);
				};
				res = d;
				return res;
			};
			
			//获取当前时间精确到秒
            this.getTime = function(){
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
            };
            
                 //获取用户的本地信息
            this.getNative = function(){
            	var phone="";
				var u = navigator.userAgent;
				$rootScope.info = u;//详细信息
				$rootScope.system = '';//操作系统
				$rootScope.systemVersion = '';//操作系统版本
				$rootScope.phoneModel = '';//手机型号
				$rootScope.address = '';//访问者地址 城市
				
				if (u.indexOf('Android') > -1 && u.indexOf('Linux') > -1) {//安卓手机
					console.log("安卓手机");
					$rootScope.system = "Android";//操作系统
					var itemArr = u.split(';');
					for(var i=0;i<itemArr.length;i++){
						if (itemArr[i].indexOf('Android')!=-1) {
							$rootScope.systemVersion = itemArr[i];//操作系统版本
						}
						if (itemArr[i].indexOf('Build')!=-1) {
							$rootScope.phoneModel = itemArr[i].split(')')[0];//操作系统版本
						}
					}
				} else if (u.indexOf('iPhone') > -1) {//苹果手机
					console.log("苹果手机");
					$rootScope.system = "iPhone";//操作系统
					$rootScope.systemVersion = u.split('CPU')[1].split('like')[0];//操作系统版本
					$rootScope.phoneModel = '';//手机型号(iphone无法获取手机型号)
				} else if (u.indexOf('Windows Phone') > -1) {//winphone手机
					console.log("winphone手机");
					$rootScope.system = "Windows Phone";//操作系统
					$rootScope.systemVersion = u.split('(')[1].split(';')[0];//操作系统版本
					$rootScope.phoneModel = u.split('(')[1].split(';')[3].split(')')[0];//手机型号
				}//浏览器暂不统计细分只统计详细信息
				
				//定位城市信息
				function myFun(result){
					var cityName = result.name;
					$rootScope.address = cityName;
					console.log($rootScope.address);
				}
				var myCity = new BMap.LocalCity();
				myCity.get(myFun);
			
				console.log($rootScope.info);
				console.log($rootScope.system);
				console.log($rootScope.systemVersion);
				console.log($rootScope.phoneModel);
			};
			
			this.getauth = function(callback){
				callback();
				//权限控制
//				mainService.getAuth('kk',[]).then(function(res){
//					console.log(res);
//					if (!res || res==null) {
//						console.log('无网络');
//					} else{
//						if (res.status=='1001') {
//							if(!res.auth){
//								console.log('无权限');
//								$state.go('error');
//							}else{
//								callback();
//								
//							}
//						} else{
//							console.log('网络异常');
//						}
//					}
//				});
			};
			
			
			/**
			 * //设置页面的宽高
			 * w 宽
			 * h 高
			 */
			this.setBody = function(w,h){
				$('body').css('width',w);
        		$('body').css('height',h);
			};
			
			

			
        };

        return new serviceModel($q, $http);
    }]);

    return mod;
 });