define(["./controllers"], function (controllers) {
    "use strict";
    controllers.controller("summaryOfOperationsCtrl", ["$scope", "$state","mainService","eduService",'$rootScope','$tool',"$compile",function ($scope, $state,mainService,eduService,$rootScope,$tool,$compile) {
    	var pflag = "ls";
    	var paramArr = [];
		var winH = $(window).height();
		var winW = $(window).width();
		$scope.px1=true,$scope.px2=false,$scope.px3=false,$scope.px4=false,$scope.px5=false,$scope.px6=false,$scope.px7=false,$scope.px8=false,$scope.px9=false,$scope.px10=false,$scope.px11=false;
        $scope.show1=true,$scope.show2=false,$scope.show3=false,$scope.show4=false,$scope.show5=false,$scope.show6=false,$scope.show7=false,$scope.show8=false,$scope.show9=false,$scope.show10=false,$scope.show11=false;
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

        $(document).ready(function(){
            $('.checkboxinput').iCheck({
              checkboxClass: 'icheckbox_square-green',
              increaseArea: '20%' // optional
            });
        });

        var international = "国际学校";
        var Bilingual = "双语学校";
        var Kindergarten = "幼儿园";
        $scope.area =null;
        $scope.parea = "全部区域";
        var checkbox_checked = ["国际学校","双语学校","幼儿园"];
        var paramarr1 = [$scope.area,checkbox_checked]
        $('#international').on('ifChecked',function(event){   //checked 才会调
            checkbox_checked.push("国际学校");
            $scope.sumPer();
        })
        $('#international').on('ifUnchecked	',function(event){   //unchecked 才会调
            for (var i = 0; i < checkbox_checked.length; i++) {
                if (checkbox_checked[i] == international){
                    checkbox_checked.splice(i,1);
                }
            }
            $scope.sumPer();
        })

        $('#Bilingual').on('ifChecked',function(event){   //checked 才会调
            checkbox_checked.push("双语学校");
            $scope.sumPer();
        })
        $('#Bilingual').on('ifUnchecked',function(event){   //unchecked 才会调
            for (var i = 0; i < checkbox_checked.length; i++) {
                if (checkbox_checked[i] == Bilingual){
                    // console.log(i);
                    checkbox_checked.splice(i,1);

                }
            }
            $scope.sumPer();
        })

        $('#Kindergarten').on('ifChecked',function(event){   //checked 才会调
            checkbox_checked.push("幼儿园");
            $scope.sumPer();
        })
        $('#Kindergarten').on('ifUnchecked',function(event){   //unchecked 才会调
            for (var i = 0; i < checkbox_checked.length; i++) {
                if (checkbox_checked[i] == Kindergarten){
                    // console.log(i);
                    checkbox_checked.splice(i,1);
                }
            }
            $scope.sumPer();
        })

        $('#area').change(function(event){
            // console.log($(this).val())
            $scope.parea = [$(this).val()];
            $scope.getschoolD()
            if($(this).val() != "全部区域"){
                $scope.area = $(this).val()

            }else{
                $scope.area = null
            }
            console.log($scope.area)
            paramarr1[0] = $scope.area
            $scope.sumPer()
        })
       

        //打印
        // $scope.print=function () {
        //     window.print();
        // };
        //导出
        // $scope.exportWYTable= function(){
        //     mainService.getExportExcel('ls',[ ],11);
        // }


        var setH = function(){
            var winH = $(window).height();
            var winW = $(window).width();
            $('.hpt').css('height',winH);
            $('.tqimgdiv').css('width',$('.tqimgdiv').height());	//天气、日期



        };

        setH();
        

        //学生人数及学费增长率表格
        $scope.sumPer = function(){
            var cc = paramarr1[0]
            var aa =JSON.stringify(paramarr1[1])
            var paramsarray = [cc,aa]
            eduService.getManagement(pflag,paramsarray).then(function(res){
                if(res){
                    var arr_school = {xfzjf:0,xsjf:0,sdjf:0,xsyjfrs:0,sdyjfrs:0,yjfzrs:0,xsjfrs:0,sdjfrs:0,jfzrs:0,jhzsrs:0};
                    for(var i=0;i<res.data.length;i++){
                        arr_school.school_name = "合计"
                        arr_school.xxjc = ""
                        arr_school.qu_name = ""
                        arr_school.xxlx = ""
                        arr_school.xfzjf +=parseFloat(res.data[i].xfzjf)
                        arr_school.xsjf +=parseFloat(res.data[i].xsjf)
                        arr_school.sdjf +=parseFloat(res.data[i].sdjf)
                        arr_school.xsyjfrs +=parseFloat(res.data[i].xsyjfrs)
                        arr_school.sdyjfrs +=parseFloat(res.data[i].sdyjfrs)
                        arr_school.yjfzrs +=parseFloat(res.data[i].yjfzrs)
                        arr_school.xsjfrs +=parseFloat(res.data[i].xsjfrs)
                        arr_school.sdjfrs +=parseFloat(res.data[i].sdjfrs)
                        arr_school.jfzrs +=parseFloat(res.data[i].jfzrs)
                        arr_school.jhzsrs +=parseFloat(res.data[i].jhzsrs)
                        arr_school.zswcl =0
                    }
                    arr_school.xfzjf =arr_school.xfzjf.toFixed(2)
                    arr_school.xsjf =arr_school.xsjf.toFixed(2)
                    arr_school.sdjf =arr_school.sdjf.toFixed(2)
                    arr_school.xsyjfrs =arr_school.xsyjfrs.toFixed(0)
                    arr_school.sdyjfrs =arr_school.sdyjfrs.toFixed(0)
                    arr_school.yjfzrs =arr_school.yjfzrs.toFixed(0)
                    arr_school.xsjfrs =arr_school.xsjfrs.toFixed(0)
                    arr_school.sdjfrs =arr_school.sdjfrs.toFixed(0)
                    arr_school.jfzrs =arr_school.jfzrs.toFixed(0)
                    arr_school.jhzsrs =arr_school.jhzsrs.toFixed(0)
                    if(arr_school.jhzsrs == 0){
                        arr_school.zswcl = 0
                    }else {
                        arr_school.zswcl =arr_school.jfzrs/arr_school.jhzsrs
                    }

                    // res.data.push(arr_school);
                    $scope.heji = arr_school
                    $scope.tbdata = res.data;
                    console.log($scope.tbdata)
                    $scope.descx(1,!$scope.px1, $scope.tbdata);
                }else{ }
                
            });
        }

        //获取学校数量
        $scope.getschoolD = function(){
            eduService.getSchool(pflag,[$scope.parea]).then(function(res){
                // console.log(parea)
                if(res){
                    $scope.tbschool0 = res.Jyjtxxlxslyoudata[0].xxsl
                    $scope.tbschool1 = res.Jyjtxxlxslyoudata[1].xxsl
                    $scope.tbschool2 = res.Jyjtxxlxslyoudata[2].xxsl
                }
            })
        }

        //获取区域数量
        $scope.getareaD = function(){
            eduService.getArea(pflag).then(function(res){
                if(res){
                    $scope.tbarea = res.getqudata;
                }
            })
        }


        $scope.getschoolD();
        $scope.getareaD();

        $scope.sumPer();



        /**
         * @param {Object} a 第几个排序
         * @param {Object} b 1升序 、  0降序
         * @param {Object}c 要排序的数组
         */
        $scope.descx = function(a,b,c){
            switch (a){
                case 1:
                    $scope.show1=true,$scope.show2=false,$scope.show3=false,$scope.show4=false,$scope.show5=false,$scope.show6=false,$scope.show7=false,$scope.show8=false;$scope.show9=false;$scope.show10=false;$scope.show11=false;
                    if(b){
                        console.log(c);
                        c.sort(function(a, b) {
                            return a.xfzjf - b.xfzjf;
                        });
                        $scope.px1 = false;
                    }else if(!b){
                        c.sort(function(a, b) {
                            return b.xfzjf - a.xfzjf;
                        });
                        $scope.px1 = true;
                    }
                    break;
                case 2:
                    $scope.show1=false,$scope.show2=true,$scope.show3=false,$scope.show4=false,$scope.show5=false,$scope.show6=false,$scope.show7=false,$scope.show8=false;$scope.show9=false;$scope.show10=false;$scope.show11=false;
                    if(b){
                        c.sort(function(a, b) {
                            return a.xsjf - b.xsjf;
                        });
                        $scope.px2 = false;
                    }else if(!b){
                        c.sort(function(a, b) {
                            return b.xsjf - a.xsjf;
                        });
                        $scope.px2 = true;
                    }
                    break;
                case 3:
                    $scope.show1=false,$scope.show2=false,$scope.show3=true,$scope.show4=false,$scope.show5=false,$scope.show6=false,$scope.show7=false,$scope.show8=false;$scope.show9=false;$scope.show10=false;$scope.show11=false;
                    if(b){
                        c.sort(function(a, b) {
                            return a.sdjf - b.sdjf;
                        });
                        $scope.px3 = false;
                    }else if(!b){
                        c.sort(function(a, b) {
                            return b.sdjf - a.sdjf;
                        });
                        $scope.px3 = true;
                    }
                    break;
                case 4:
                    $scope.show1=false,$scope.show2=false,$scope.show3=false,$scope.show4=true,$scope.show5=false,$scope.show6=false,$scope.show7=false,$scope.show8=false;$scope.show9=false;$scope.show10=false;$scope.show11=false;
                    if(b){
                        c.sort(function(a, b) {
                            return a.jfzrs - b.jfzrs;
                        });
                        $scope.px4 = false;
                    }else if(!b){
                        c.sort(function(a, b) {
                            return b.jfzrs - a.jfzrs;
                        });
                        $scope.px4 = true;
                    }
                    break;
                case 5:
                    $scope.show1=false,$scope.show2=false,$scope.show3=false,$scope.show4=false,$scope.show5=true,$scope.show6=false,$scope.show7=false,$scope.show8=false;$scope.show9=false;$scope.show10=false;$scope.show11=false;
                    if(b){
                        c.sort(function(a, b) {
                            return a.xsjfrs - b.xsjfrs;
                        });
                        $scope.px5 = false;
                    }else if(!b){
                        c.sort(function(a, b) {
                            return b.xsjfrs - a.xsjfrs;
                        });
                        $scope.px5 = true;
                    }
                    break;
                case 6:
                    $scope.show1=false,$scope.show2=false,$scope.show3=false,$scope.show4=false,$scope.show5=false,$scope.show6=true,$scope.show7=false,$scope.show8=false;$scope.show9=false;$scope.show10=false;$scope.show11=false;
                    if(b){
                        c.sort(function(a, b) {
                            return a.sdjfrs - b.sdjfrs;
                        });
                        $scope.px6 = false;
                    }else if(!b){
                        c.sort(function(a, b) {
                            return b.sdjfrs - a.sdjfrs;
                        });
                        $scope.px6 = true;
                    }
                    break;
                case 7:
                    $scope.show1=false,$scope.show2=false,$scope.show3=false,$scope.show4=false,$scope.show5=false,$scope.show6=false,$scope.show7=true,$scope.show8=false;$scope.show9=false;$scope.show10=false;$scope.show11=false;
                    if(b){
                        c.sort(function(a, b) {
                            return a.jhzsrs - b.jhzsrs;
                        });
                        $scope.px7 = false;
                    }else if(!b){
                        c.sort(function(a, b) {
                            return b.jhzsrs - a.jhzsrs;
                        });
                        $scope.px7 = true;
                    }
                    break;
                case 8:
                    $scope.show1=false,$scope.show2=false,$scope.show3=false,$scope.show4=false,$scope.show5=false,$scope.show6=false,$scope.show7=false,$scope.show8=true;$scope.show9=false;$scope.show10=false;$scope.show11=false;
                    if(b){
                        c.sort(function(a, b) {
                            return a.zswcl - b.zswcl;
                        });
                        $scope.px8 = false;
                    }else if(!b){
                        c.sort(function(a, b) {
                            return b.zswcl - a.zswcl;
                        });
                        $scope.px8 = true;
                    }
                    break;
                case 9:
                    $scope.show1=false,$scope.show2=false,$scope.show3=false,$scope.show4=false,$scope.show5=false,$scope.show6=false,$scope.show7=false,$scope.show8=false;$scope.show9=true;$scope.show10=false;$scope.show11=false;
                    if(b){
                        c.sort(function(a, b) {
                            return a.xsyjfrs - b.xsyjfrs;
                        });
                        $scope.px9 = false;
                    }else if(!b){
                        c.sort(function(a, b) {
                            return b.xsyjfrs - a.xsyjfrs;
                        });
                        $scope.px9 = true;
                    }
                    break;
                case 10:
                    $scope.show1=false,$scope.show2=false,$scope.show3=false,$scope.show4=false,$scope.show5=false,$scope.show6=false,$scope.show7=false,$scope.show8=false;$scope.show9=false;$scope.show10=true;$scope.show11=false;
                    if(b){
                        c.sort(function(a, b) {
                            return a.sdyjfrs - b.sdyjfrs;
                        });
                        $scope.px10 = false;
                    }else if(!b){
                        c.sort(function(a, b) {
                            return b.sdyjfrs - a.sdyjfrs;
                        });
                        $scope.px10 = true;
                    }
                    break;
                case 11:
                    $scope.show1=false,$scope.show2=false,$scope.show3=false,$scope.show4=false,$scope.show5=false,$scope.show6=false,$scope.show7=false,$scope.show8=false;$scope.show9=false;$scope.show10=false;$scope.show11=true;
                    if(b){
                        c.sort(function(a, b) {
                            return a.yjfzrs - b.yjfzrs;
                        });
                        $scope.px11 = false;
                    }else if(!b){
                        c.sort(function(a, b) {
                            return b.yjfzrs - a.yjfzrs;
                        });
                        $scope.px11 = true;
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
        		console.log(res);
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
                                $('.tqimgdiv_sum').css({'background':"url('./modulars/edu/assets/images/tq_cloud.png') no-repeat",'background-size':"100% 100%"});
                            }else if($scope.tqzk == "晴"){
                                $('.tqimgdiv_sum').css({'background':"url('./modulars/edu/assets/images/tq_sun.png') no-repeat",'background-size':"100% 100%"});
                            }else {
                                $('.tqimgdiv_sum').css({'background':"url('./modulars/edu/assets/images/tq_rain.png') no-repeat",'background-size':"100% 100%"});
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