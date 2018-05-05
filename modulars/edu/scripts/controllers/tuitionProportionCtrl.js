define(["./controllers"], function (controllers) {
    "use strict";
    controllers.controller("tuitionProportionCtrl", ["$scope", "$state","mainService","eduService",'$rootScope','$tool',"$compile",function ($scope, $state,mainService,eduService,$rootScope,$tool,$compile) {
    	var pflag = "ls";
    	var paramArr = [];
		var winH = $(window).height();
		var winW = $(window).width();
		$scope.px1=true,$scope.px2=false,$scope.px3=false,$scope.px4=false;
        $scope.show1=true,$scope.show2=false,$scope.show3=false,$scope.show4=false;
        $scope.ispc = true;

		//设置全屏
		$scope.screen = function(){
            $scope.quanping();
//		　　　　　　监听不同浏览器的全屏事件，并件执行相应的代码
	        document.addEventListener("webkitfullscreenchange", function() {
	            if (document.webkitIsFullScreen) {
	                 setTimeout(function(){
	                 	setH();
	                 },1);
	            }else{
	                setTimeout(function(){
	                 	setH();
	                },1);
	           }
	        }, false);
	        document.addEventListener("fullscreenchange", function() {
	            if (document.fullscreen) {
	                 setTimeout(function(){
	                 	setH();
	                 },1);
	            }else{
	                setTimeout(function(){
	                 	setH();
	                },1);
	           }
	        }, false);
	        document.addEventListener("mozfullscreenchange", function() {
	            if (document.mozFullScreen) {
	                 setTimeout(function(){
	                 	setH();
	                 },1);
	            }else{
	                setTimeout(function(){
	                 	setH();
	                },1);
	            }
	        }, false);
	        document.addEventListener("msfullscreenchange", function() {
	            if (document.msFullscreenElement) {
	                 setTimeout(function(){
	                 	setH();
	                 },1);
	           	}else{
	                 setTimeout(function(){
	                 	setH();
	                 },1);
	            }
	        }, false);
            // if(!$rootScope.qp) {
            //     setTimeout(function () {
            //         //setH();
            //         //$('.hpt').css('height',winH);
            //     },400);
            // }
		};
		//退出全屏
		$scope.exitFullScreen = function(){
            $scope.tuichuquanping();
			setTimeout(function () {
				// setH();
			},100);
		};

        $scope.gobacks=function(){
            console.log(11);
            $state.go("eduGro");
        };

        //打印
        $scope.print=function () {
            window.print();
        };
        //导出
        $scope.exportWYTable= function(){
            eduService.getExportExcel('ls',[ ],11);
        }


            var setH = function(){
                var winH = $(window).height();
                var winW = $(window).width();
                $('.hpt').css('height',winH);
                $('.tqimgdiv').css('width',$('.tqimgdiv').height());	//天气、日期



            };

        setH();



        //各学校学费

        $scope.gets = function(){
            eduService.getStudySetion1(pflag,[$scope.xueduan]).then(function(res){
                console.log("--------------------------");
                console.log(res);
                if(res){
                    /*console.log(res.Jyjtxdxfdata)
                    console.log(arr_school)*/
                    $scope.xddata = res.Jyjtxdxfdata;
                    console.log($scope.tbdata)
                    $scope.descx1(1,!$scope.px1, $scope.xddata);
                }else{ }

            });
        }



        $scope.blue=0;
        var isschool = false;
        var num = 0;
        $scope.slide = 0;
        $scope.slidd = false;
        $scope.school = function(a){
            $scope.slide = a;
            if(isschool){
                num = a;
                $scope.blue = a;
                $scope.slidd =false;
                console.log(11111111);
                isschool = false;
                $scope.xueduan = this.items.xd1.toString();
                $scope.gets();
            }else {
                if(num == a){
                    console.log(2222222)
                    $scope.blue = $scope.tbdata.length;
                    isschool = true;
                    $scope.xueduan = this.items.xd1.toString();
                    $scope.gets();
                    $scope.slidd = true;
                }else {
                    console.log(3333333)
                    num = a;
                    $scope.blue = a;
                    isschool = false;
                    $scope.xueduan = this.items.xd1.toString();
                    $scope.gets();
                }

            }



        }

            //各学段学费及比例表格
            eduService.getStudySetion(pflag).then(function(res){
                console.log("--------------------------");
                console.log(res);
                $scope.tbdata = res.data;
                console.log($scope.tbdata)
                if(res){
                    var arr_school = {xf:0};
                    for(var i=0;i<res.data.length;i++){
                        arr_school.xd1 = "合计";
                        arr_school.xf +=parseFloat(res.data[i].xf);
                        arr_school.bfb =""
                    }
                    arr_school.xf=arr_school.xf.toFixed(2)
                    // res.data.push(arr_school);
                    $scope.heji = arr_school
                    console.log($scope.tbdata)
                }else{ }
                $scope.descx(1,!$scope.px1, $scope.tbdata);
                $scope.xueduan = [$scope.tbdata[0].xd1]
                console.log($scope.xueduan)
                $scope.gets();
            });


//固定数据

$scope.xddata = [{xx:'1',xf:'1',zb:'1'},
{xx:'1',xf:'1',zb:'1'},
{xx:'1',xf:'1',zb:'1'},
{xx:'1',xf:'1',zb:'1'},
{xx:'1',xf:'1',zb:'1'},
{xx:'1',xf:'1',zb:'1'},
{xx:'1',xf:'1',zb:'1'},
{xx:'1',xf:'1',zb:'1'},
{xx:'1',xf:'1',zb:'1'},
{xx:'1',xf:'1',zb:'1'}];
$scope.tbdata =  [{xd1:'1',xf:'1',bfb:'1'},
{xd1:'1',xf:'1',bfb:'1'},
{xd1:'1',xf:'1',bfb:'1'},
{xd1:'1',xf:'1',bfb:'1'},
{xd1:'1',xf:'1',bfb:'1'},
{xd1:'1',xf:'1',bfb:'1'},
{xd1:'1',xf:'1',bfb:'1'},];
        $scope.heji ={xd1:'1',xf:'1',bfb:'1'}
        /**
         * @param {Object} a 第几个排序
         * @param {Object} b 1升序 、  0降序
         * @param {Object}c 要排序的数组
         */
        $scope.descx = function(a,b,c){
            switch (a){
                case 1:
                    $scope.show1=true,$scope.show2=false,$scope.show3=false,$scope.show4=false;
                    if(b){
                        console.log(c);
                       c.sort(function(a, b) {
                            return a.xf - b.xf;
                        });
                        $scope.px1 = false;
                    }else if(!b){
                        c.sort(function(a, b) {
                            return b.xf - a.xf;
                        });
                        $scope.px1 = true;
                    }
                    break;
                case 2:
                    $scope.show1=false,$scope.show2=true,$scope.show3=false,$scope.show4=false;
                    if(b){
                        c.sort(function(a, b) {
                            return a.bfb - b.bfb;
                        });
                        $scope.px2 = false;
                    }else if(!b){
                        c.sort(function(a, b) {
                            return b.bfb - a.bfb;
                        });
                        $scope.px2 = true;
                    }
                    break;
                default:
                    break;
            }
            console.log(a,b,c)
        };

        $scope.descx1 = function(a,b,c){
            switch (a){
                case 1:
                    $scope.show1=true,$scope.show2=false;
                    if(b){
                        console.log(c);
                        c.sort(function(a, b) {
                            return a.xf - b.xf;
                        });
                        $scope.px1 = false;
                    }else if(!b){
                        c.sort(function(a, b) {
                            return b.xf - a.xf;
                        });
                        $scope.px1 = true;
                    }
                    break;
                case 2:
                    $scope.show1=false,$scope.show2=true;
                    if(b){
                        c.sort(function(a, b) {
                            return a.bfb - b.bfb;
                        });
                        $scope.px2 = false;
                    }else if(!b){
                        c.sort(function(a, b) {
                            return b.bfb - a.bfb;
                        });
                        $scope.px2 = true;
                    }
                    break;
                default:
                    break;
            }
            console.log(a,b,c)
        };


        // 单纯地加千位符和小数位
        function qwfformatter(value,type) {
            if(value!=undefined ){
                var numbers = new String(Math.round(value * 100) / 100).split(".", 2);
                var number = numbers[0].replace(/\d+?(?=(?:\d{3})+$)/img, "$&,");
                var dec = numbers[1] || "00";
                if(type=="1"){
                    if (dec.length > 2)  dec = dec.substring(0, 2);
                    if (dec.length == 1) dec += "0";
                    return number + "." + dec
                }else if (type=="2"){
                    return number ;
                }else if(type=="3"){
                    return  Number(value).toFixed(2);
                }
            }else{
                return 0;
            }
        };

    	//初始化股票数据
    	$scope.openprice = 0;		//开盘价
    	$scope.maxprice = 0;		//最高价
    	$scope.currentprice = 0;	//当前价
    	$scope.volume = 0;			//成交量
    	//获取股票数据
    	var getgupiao = function(){
    		eduService.getShares(pflag,paramArr).then(function(res){
        		// console.log(res);
        		if(!res ||res ==null){

        		}else if(res.data1.length<1){

    			}else{
    				$scope.openprice = (res.data1[0].openprice/1).toFixed(3);		//开盘价
    		    	$scope.maxprice = (res.data1[0].maxprice/1).toFixed(3);		//最高价
    		    	$scope.currentprice = (res.data1[0].currentprice/1).toFixed(3);	//当前价
    		    	$scope.volume = res.data1[0].volume;			//成交量
        		}
        	});
    	}
    	getgupiao();
    	//股票定时刷新(每5s刷新一次)
    	setInterval(function(){
    		getgupiao();
    	}, 30000);

        //设置地址和天气
        $scope.ssd = '';
        $scope.tqzk = '';
        function myFun(result){
            var cityName = result.name;
            $scope.address1 = cityName.split('市')[0];
            $('#address1').html($scope.address1);
            $('#address2').html($scope.address1);
            findWeather();
        }
        var myCity = new BMap.LocalCity();
        function findWeather() {
            var cityUrl = 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js';
            $.getScript(cityUrl, function (script, textStatus, jqXHR) {
                var citytq = remote_ip_info.city; // 获取城市
                if(citytq!=undefined&&citytq!=null&&citytq!=''){
                    $('#address1').html(citytq);
                    $('#address2').html(citytq);
                }
                var url = "http://php.weather.sina.com.cn/iframe/index/w_cl.php?code=js&city=" + citytq + "&day=0&dfc=3";
                $.ajax({
                    url: url,
                    dataType: "script",
                    scriptCharset: "gbk",
                    success: function (data) {
                        var _w = window.SWther.w[citytq][0];
                        if(_w.t1!=undefined&&_w.t1!=null&&_w.t1!=''&&_w.t2!=undefined&&_w.t2!=null&&_w.t2!=''){
                            $scope.ssd = _w.t2 + '~' + _w.t1 + "℃ ";
                            $('#ssd').html($scope.ssd);
                            $('#ssd2').html($scope.ssd);
                        }
                        if(_w.s1!=undefined&&_w.s1!=null&&_w.s1!=''){
                            $scope.tqzk = _w.s1;
                            $('#tqzk').html($scope.tqzk);
                            $('#tqzk2').html($scope.tqzk);
                            console.log($scope.tqzk)
                            if($scope.tqzk == "多云"){
                                $('.tqimgdiv_tui').css({'background':"url('./modulars/edu/assets/images/tq_cloud.png') no-repeat",'background-size':"100% 100%"});
                            }else if($scope.tqzk == "晴"){
                                $('.tqimgdiv_tui').css({'background':"url('./modulars/edu/assets/images/tq_sun.png') no-repeat",'background-size':"100% 100%"});
                            }else {
                                $('.tqimgdiv_tui').css({'background':"url('./modulars/edu/assets/images/tq_rain.png') no-repeat",'background-size':"100% 100%"});
                            }
                        }
                    }
                });
            });
        }
        myCity.get(myFun);

        var now= new Date();//现在时刻
        var year=now.getFullYear(); //年
        var month=now.getMonth()+1;//月;
        var day=now.getDate(); //日;
        var hours =now.getHours();//时
        var min = now.getMinutes();//分
        var second = now.getSeconds();//秒
        var show_day=new Array('星期日','星期一','星期二','星期三','星期四','星期五','星期六');
        var reloadTime = 0;
        $scope.rq=year+"年"+month+"月"+day+"日";
        $scope.day=show_day[now.getDay()];

        if(hours<7){
        	reloadTime = (7-hours)*60*60 - (60-min)*60 - (60-second);
        }else{
        	reloadTime = (24-hours)*60*60 - (60-min)*60 - (60-second) + 7*60*60;
        }
        setTimeout(function(){
        	window.location.reload();
        	setInterval(function () {
                window.location.reload();
            } ,24*60*60*1000);
        }, reloadTime*1000);
        console.log(reloadTime);


		//注销
		$scope.cancel = function(){
			var mymessage=confirm("确定注销？");  
		    if(mymessage==true){
		    	localStorage.setItem('login',false);
				localStorage.setItem('user',null);
				localStorage.setItem('psw',null);
				$rootScope.loginflag = false;
		    }else if(mymessage==false){
		    	return;
		    }  
		};


	}]);
});