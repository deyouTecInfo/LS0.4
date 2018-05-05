define(["./controllers"], function (controllers) {
    "use strict";
    controllers.controller("mainCtrl", ["$scope", "$state","mainService",'$rootScope','$tool', function ($scope, $state,mainService,$rootScope,$tool) {
    	var url = window.location.href; //获取url中"?"符后的字串
    	var inFlag = false;//KK端入口进入
    	var f = url.split("#/");
        $rootScope.currentIndex_map_1=-1,$rootScope.currentIndex_map_2=-1;  //物业地图第一次轮播索引
    	if(f[1] == 'hptmb'){
    		inFlag = true;
    	}
    	if(inFlag){
//    		$(".dialog").css('left','40%');
//			$(".dialog").css('display','block');
//			$('.dialogddd').css("width","100%");
			$(".dialogddd").css("height",$(window).height());
//			$(".dialogddd").css("background-color","white");
    	}else{
    		$(".dialogddd").css("display","none")
    	}
    	$(".hptmb").scrollTop(200)
    	$rootScope.theme = true;
    	$rootScope.homepage = "home";
    	
    	
    	//监听键盘事件
    	document.onkeyup=function(event){ 
			var e = event || window.event || arguments.callee.caller.arguments[0]; 
//			console.log(e.keyCode);
				if(e && e.keyCode==122){ // 按 F11
				//要做的事情 禁用F11 
					e.preventDefault();
				} 
				if(e && e.keyCode==27){ // 按 esc
				//监听esc退出全屏
				console.log(e.keyCode+"------------");
					$rootScope.qp = true;//全屏标识	
				} 
				if(e && e.keyCode==96){ // 按 esc
				//监听esc退出全屏
				console.log(e.keyCode+"------------");
					$rootScope.qp = true;//全屏标识	
				} 
		};
		/**
		 * 判断是否是pc端还是移动端
		 * @returns {boolean}
		 * @constructor
		 */
		function IsPC() {
			var userAgentInfo = navigator.userAgent;
			var Agents = ["Android", "iPhone",
				"SymbianOS", "Windows Phone",
				"iPad", "iPod"];
			var flag = true;
			for (var v = 0; v < Agents.length; v++) {
				if (userAgentInfo.indexOf(Agents[v]) > 0) {
					flag = false;
					break;
				}
			}
			return flag;
		}
		$rootScope.qp = true;//全屏标识
		var websocket = null;


		//全屏
		$scope.quanping = function(){
			var el = document.documentElement;
	        var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen;//定义不同浏览器的全屏API
	         //执行全屏
	        if(rfs){
	        	rfs.call(el);
	        	$rootScope.qp = false;//全屏标识
	        }else if(typeof(window.ActiveXObject)){
	            var wscript = new ActiveXObject("WScript.Shell");
	            if (wscript!=null) {
	            	$rootScope.qp = false;//全屏标识
	                wscript.SendKeys("{F11}");
	            }
	        }
			$(".menu_all").animate({top:"5%",height:"95%"},500);
		};
		//退出全屏
		$scope.tuichuquanping = function(){
			if (document.exitFullscreen) {
		        document.exitFullscreen();
		        $rootScope.qp = true;//全屏标识
		    }
		    else if (document.mozCancelFullScreen) {
		        document.mozCancelFullScreen();
		        $rootScope.qp = true;//全屏标识
		    }
		    else if (document.webkitCancelFullScreen) {
		        document.webkitCancelFullScreen();
		        $rootScope.qp = true;//全屏标识
		    }
		    else if (document.msExitFullscreen) {
		        document.msExitFullscreen();
		        $rootScope.qp = true;//全屏标识
		    }
			$(".menu_all").animate({top:"0%",height:"100%"},500);
		};
		
    	Number.prototype.toFixed = function(d){
		    var s=this+"";
		    if(!d)d=0;
		    if(s.indexOf(".")==-1)s+=".";
		    s+=new Array(d+1).join("0");
		    if (new RegExp("^(-|\\+)?(\\d+(\\.\\d{0,"+ (d+1) +"})?)\\d*$").test(s)){
			  	var s="0"+ RegExp.$2, pm=RegExp.$1, a=RegExp.$3.length, b=true;
				if (a==d+2){
					a=s.match(/\d/g); 
					if (parseInt(a[a.length-1])>4){
				        for(var i=a.length-2; i>=0; i--) {a[i] = parseInt(a[i])+1;
					        if(a[i]==10){
					        	a[i]=0; b=i!=1;
					        } else break;
				        }
			        }
		  			s=a.join("").replace(new RegExp("(\\d+)(\\d{"+d+"})\\d$"),"$1.$2");
		     	}
				if(b)s=s.substr(1);
				return (pm+s).replace(/\.$/, "");
	    	} 
	    	return this+"";
		}; 
    	$scope.openclose = true;
    	
    	//获取手机类型
		$scope.phoneStyle = $tool.getNative();
		//打印页面
    	$scope.myprint = function(){
    		window.print();
    	};
    	$scope.closeOpen =function(){
    		if ($scope.openclose) {
    			$scope.openclose = false;
    		} else{
    			$scope.openclose = true;
    		}
    	};
    	 //跳转主界面
        $scope.goHome = function(){
         	$state.go('tohome',{'isback':true});
        }
        //数据抓取时间
        $scope.year = new Date().getMonth()>0?new Date().getFullYear():new Date().getFullYear()-1;
        //昨天
		var GetDateStr = function(AddDayCount) {
			var dd = new Date(); 
			dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期 
			var y = dd.getFullYear(); 
			var m = dd.getMonth()+1;//获取当前月份的日期
			if((m+"").length<2){
				m = "0"+m;
			}
			var d = dd.getDate(); 
			if((d+"").length<2){
				d = "0"+d;
			}
			return y+"-"+m+"-"+d; 
		}; 
		var startTime = (new Date("2017/01/01 00:00:00")).getTime(); //开始时间 
		var endTime = (new Date("2017/01/16 00:00:00")).getTime(); //开始时间
		var thisTime = new Date().getTime(); //开始时间
		// console.log(startTime);
		// console.log(endTime);
		// console.log(thisTime);
//		if(startTime < thisTime && thisTime < endTime){
//			$scope.yesterday = "2016-12-31";
//		}else{
		$scope.yesterday = GetDateStr(-1);
//		}
// 		$scope.yesterday = "2016-12-31";
		//返回主页
		$rootScope.goMenu = function(){
			$state.go('tomenu',{'isback':true});
		};
		//登录
		// console.log(localStorage.getItem('login'));
		$rootScope.user = '';
		$rootScope.psw = '';
		$rootScope.show_qx =false;
		$rootScope.show_zh = false;

		$rootScope.login = function(){
			$rootScope.user = $('#user').val();
			$rootScope.psw = $('#psw').val();
			
			
			//测试环境临时使用
			//  console.log($rootScope.psw);
			 if ($rootScope.user!='') {
			 	localStorage.setItem('login',true);
			 	localStorage.setItem('user',$rootScope.user);
			 	localStorage.setItem('psw',$rootScope.psw);
                $rootScope.loginflag = localStorage.getItem('login');
                setTimeout(function () {
                    $state.go('pcm');
                },200);
			 } else{

                 //权限提示
                 // $rootScope.show_qx =true;
                 // $(".logins #show_qx").animate({ opacity:1},1000);

                 //账号密码错误提示
                 $rootScope.show_zh =true;
                 $(".logins .show_zh").animate({opacity:1},1000);

			 }
		};
//		localStorage.removeItem('login');
// 		setTimeout(function(){
// 			localStorage.removeItem('login');
// 		},2400000);
		

		$rootScope.loginflag = localStorage.getItem('login');

    }]);
});