
define(["./controllers"], function (controllers) {
    "use strict";
    controllers.filter('desfilter', function(){
        return function(value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                    value = value.substr(0, lastspace);
                }
            }
            return value + (tail || ' …');
        };
    });

    controllers.controller("eduGroupManagementCtrl", ["$scope", "$state","mainService","eduService",'$rootScope','$tool',"$compile","$filter", function ($scope, $state,mainService,eduService,$rootScope,$tool,$compile,$filter) {
        var pflag = "ls";
        var paramArr = [];
        var winH = $(window).height();
        var winW = $(window).width();
        $scope.des = "全球战略新起点——博实乐与费得斯公学合作签约仪式圆满成功'"
        $scope.edudata = 65000;
        // $scope.$apply();

        $('.hpt').css('height',winH);
        $('.tqimgdiv').css('width',$('.tqimgdiv').height());	//天气、日期
        $scope.ispc = true;
        $scope.url = "images";

        //设置全屏
        $rootScope.homepage = "hpt";
        $rootScope.isNative = true;
        $rootScope.theme = true;
        $scope.screen = function(){
            $scope.quanping();
//		　　　　　　监听不同浏览器的全屏事件，并件执行相应的代码
            document.addEventListener("webkitfullscreenchange", function() {
                if (document.webkitIsFullScreen) {
                    setTimeout(function(){
                        setH(1);
                    },1);
                }else{
                    setTimeout(function(){
                        setH(2);
                    },1);
                }
            }, false);
            document.addEventListener("fullscreenchange", function() {
                if (document.fullscreen) {
                    setTimeout(function(){
                        setH(3);
                    },1);
                }else{
                    setTimeout(function(){
                        setH(4);
                    },1);
                }
            }, false);
            document.addEventListener("mozfullscreenchange", function() {
                if (document.mozFullScreen) {
                    setTimeout(function(){
                        setH(5);
                    },1);
                }else{
                    setTimeout(function(){
                        setH(6);
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
            // if(!$rootScope.qp){
            //     setTimeout(function () {
            //         //setH(7);
            //         $('.hpt').css('height',winH);
            //     },400);
            // }
        };
        //退出全屏
        $scope.exitFullScreen = function(){

            $scope.tuichuquanping();
            setTimeout(function () {
                var winH = $(window).height();
                var winW = $(window).width();
                console.log("iiiiiiiiiiiiiiiiii")
                console.log(winH);
                //高度处理
                if(winH<=490){
                }else if(winH>490 && winH<660){
                    // bargrap="35%";
                }else if(winH>660 && winH<900){
                    $('.newstudent').css({"margin-top":"-2%"});
                }else{

                }
                //setH(101);

            },100);
        };

        var bargrap="30%";
        var setH = function(a){
            console.log("111111111111111111111111");
            console.log(a);
            var winH = $(window).height();
            var winW = $(window).width();
            $('.hpt').css('height',winH);
            $('.tqimgdiv').css('width',$('.tqimgdiv').height());	//天气、日期
            console.log(winH);

            //高度处理
            if(winH<=490){
                // bargrap="30%";
            }else if(winH>490 && winH<750){
                bargrap="35%";
                // $(".card1").css("padding-top","5%");
            }else if(winH>740 && winH<900){
                // $(".card1").css("padding-top","10%");
                $('.newstudent').css({"margin-top":"0%"});
            }else{

            }
            // $scope.$digest();
            $scope.piecharts();
            $scope.linecharts();
            $scope.barcharts();
            $scope.$apply();
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
        console.log($scope.data1)
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
                                $('.tqimgdiv_edu').css({'background':"url('./modulars/edu/assets/images/tq_cloud.png') no-repeat",'background-size':"100% 100%"});
                            }else if($scope.tqzk == "晴"){
                                $('.tqimgdiv_edu').css({'background':"url('./modulars/edu/assets/images/tq_sun.png') no-repeat",'background-size':"100% 100%"});
                            }else {
                                $('.tqimgdiv_edu').css({'background':"url('./modulars/edu/assets/images/tq_rain.png') no-repeat",'background-size':"100% 100%"});
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

        // if(hours<7){
        // 	reloadTime = (7-hours)*60*60 - (60-min)*60 - (60-second);
        // }else{
        // 	reloadTime = (24-hours)*60*60 - (60-min)*60 - (60-second) + 7*60*60;
        // }
        // setTimeout(function(){
        // 	window.location.reload();
        // 	setInterval(function () {
        //         window.location.reload();
        //     } ,24*60*60*1000);
        // }, reloadTime*1000);
        // console.log(reloadTime);


        //登陆
        // $rootScope.loginflag = false;
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

        $scope.bar_falg_sch = true;
        $scope.bar_falg_kin = false;
        $scope.school = function(){
            $('#school').css({"background-color":"#0B61D0"});
            $('#schoolLabel').css({"color":"#fff"});
            $('#kindergarten').css({"background-color":"transparent"});
            $('#kindergartenLabel').css({"color":"#0B61D0"});
            $scope.bar_falg_sch = true;
            $scope.bar_falg_kin = false;
            setTimeout(function() {
                $scope.barcharts();
            }, 100);
        };
        $scope.kindergarten = function(){
            $('#kindergarten').css({"background-color":"#0B61D0"});
            $('#kindergartenLabel').css({"color":"#fff"});
            $('#school').css({"background-color":"transparent"});
            $('#schoolLabel').css({"color":"#0B61D0"});
            $scope.bar_falg_sch = false;
            $scope.bar_falg_kin = true;
            setTimeout(function() {
                $scope.barcharts_kin();
            }, 100);

        };

        $scope.toSumPer =function(){
            $state.go("sumPer");
        }
        $scope.toTuiPro =function(){
            $state.go("tuiPro");
        }
        $scope.togrowthRate =function(){
            $state.go("growthRate");
        }
        $scope.toCaiwu =function(){
            $state.go("Caiwu");
        }
        $scope.toRenli =function(){
            $state.go("Renli");
        }

        $scope.butHoverIn1 = function(){
            $('.butHover1').css({"background-color":"#04A0FF"})
        }
        $scope.butHoverOut1 = function(){
            $('.butHover1').css({"background-color":"#04837A"})
        }
        $scope.butHoverIn2 = function(){
            $('.butHover2').css({"background-color":"#04A0FF"})
        }
        $scope.butHoverOut2 = function(){
            $('.butHover2').css({"background-color":"#04837A"})
        }
        $scope.butHoverIn3 = function(){
            $('.butHover3').css({"background-color":"#04A0FF"})
        }
        $scope.butHoverOut3 = function(){
            $('.butHover3').css({"background-color":"#04837A"})
        }
        $scope.butHoverIn4 = function(){
            $('.butHover4').css({"background-color":"#04A0FF","cursor":"pointer"})
        }
        $scope.butHoverOut4 = function(){
            $('.butHover4').css({"background-color":"#04837A"})
        }
        $scope.butHoverIn5 = function(){
            $('.butHover5').css({"background-color":"#04A0FF","cursor":"pointer"})
        }
        $scope.butHoverOut5 = function(){
            $('.butHover5').css({"background-color":"#04837A"})
        }



        $scope.piedata=[]; //饼图

        $scope.linedata1=[]; //进5年学费 折线图
        $scope.lineX=[];
        $scope.linedata2=[]; //进5年人数 折线图

        $scope.bar1_schoolX=[]; //学校人数增长率 柱状图_学校
        $scope.bar1_schoolOld=[];
        $scope.bar1_schoolNew=[];
        $scope.bar1_schoolR=[];

        $scope.bar2_schoolX=[]; //学费收入增长率 柱状图_学校
        $scope.bar2_schoolOld=[];
        $scope.bar2_schoolNew=[];
        $scope.bar2_schoolR=[];

        $scope.bar1_kin_schoolX=[]; //学校人数增长率 柱状图_幼儿园
        $scope.bar1_kin_schoolOld=[];
        $scope.bar1_kin_schoolNew=[];
        $scope.bar1_kin_schoolR=[];

        $scope.bar2_kin_schoolX=[]; //学费收入增长率 柱状图_幼儿园
        $scope.bar2_kin_schoolOld=[];
        $scope.bar2_kin_schoolNew=[];
        $scope.bar2_kin_schoolR=[];

        $scope.bar3_schoolX=[]; //学生人数 柱状图_学校
        $scope.bar3_schoolData=[];
        $scope.bar3_kin_schoolX=[]; //学生人数 柱状图_幼儿园
        $scope.bar3_kin_schoolData=[];

        eduService.getEducation(pflag).then(function(res){
            console.log("--------------------------");
            console.log(res);
            $scope.data1 = res.data1[0];
            $scope.data6 = res.data6[0];
            $scope.data6.xjll = qwfformatter($scope.data6.xjll, 2);
            $scope.data6.jzc = qwfformatter($scope.data6.jzc, 2);
            $scope.data6.zzc = qwfformatter($scope.data6.zzc, 2);
            $scope.data6.ebitda = qwfformatter($scope.data6.ebitda, 2);
            $scope.data6.ebitdabfb = qwfformatter($scope.data6.ebitdabfb, 2);
            $scope.data6.lrqk = qwfformatter($scope.data6.lrqk, 2);
            $scope.data6.zsr = qwfformatter($scope.data6.zsr, 2);

            $scope.data7 = res.data7[0];
            $scope.data7.jtzrs = qwfformatter($scope.data7.jtzrs, 2);
            $scope.data7.jssl = qwfformatter($scope.data7.jssl, 2);
            $scope.data7.jzgsl = qwfformatter($scope.data7.jzgsl, 2);
            $scope.data7.xscyjs = parseFloat($scope.data7.xscyjs).toFixed(2);
            $scope.data8 = res.data8[0];
            $scope.data8.xfzjf = qwfformatter($scope.data8.xfzjf, 1);
            $scope.data8.xsjf = qwfformatter($scope.data8.xsjf, 1);
            $scope.data8.sdjf = qwfformatter($scope.data8.sdjf, 1);
            $scope.data8.jfzrs = qwfformatter($scope.data8.jfzrs, 2);

            $scope.data8.xsjfrs = qwfformatter($scope.data8.xsjfrs, 2);
            $scope.data8.jhzsrs = qwfformatter($scope.data8.jhzsrs, 2);
            $scope.data8.sdjfrs = qwfformatter($scope.data8.sdjfrs, 2);
            //各学段收费_pie
            for(var i= 0; i < res.data3.length; i++){
                var obj={};
                obj.name=res.data3[i].xd;
                obj.value=res.data3[i].xf;
                $scope.piedata.push(obj);
            }
            //近5年学费及人数变化_line
            for(var i= 0; i < res.data2.length; i++){
                var year = res.data2[i].year;
                $scope.lineX.push(year);
            }
            for(var i= 0; i < res.data2.length; i++){
                var xfzjf = res.data2[i].xfzjf;
                $scope.linedata1.push((xfzjf /10000 ).toFixed(2));
            }
            for(var i= 0; i < res.data2.length; i++){
                var jfzrs = res.data2[i].jfzrs;
                $scope.linedata2.push(jfzrs);
            }

            console.log("-------------889899-------------")
            console.log($scope.falg)

            //学校人数增长率top5_学校bar1
            for(var i= 0; i < res.data10.length; i++){
                var obj ={};
                obj.name = res.data10[i].xxjc;
                obj.rszzl = (res.data10[i].rszzl*100).toFixed(2) + "%";
                $scope.bar1_schoolR.push(obj);
                var xxjc = res.data10[i].xxjc;
                $scope.bar1_schoolX.push(xxjc);
                var t_xszcrs = res.data10[i].t_xszcrs;
                $scope.bar1_schoolOld.push(t_xszcrs);
                var l_xszcrs = res.data10[i].l_xszcrs;
                $scope.bar1_schoolNew.push(l_xszcrs);
            }

            //学校人数增长率top5_幼儿园bar1
            for(var i= 0; i < res.data9.length; i++){
                var obj ={};
                obj.name = res.data9[i].xxjc;
                obj.rszzl = (res.data9[i].rszzl*100).toFixed(2) + "%";
                $scope.bar1_kin_schoolR.push(obj);
                var xxjc = res.data9[i].xxjc;
                $scope.bar1_kin_schoolX.push(xxjc);
                var t_xszcrs = res.data9[i].t_xszcrs;
                $scope.bar1_kin_schoolOld.push(t_xszcrs);
                var l_xszcrs = res.data9[i].l_xszcrs;
                $scope.bar1_kin_schoolNew.push(l_xszcrs);
            }

            //学费收入增长率top5_学校bar2
            for(var i= 0; i < res.data12.length; i++){
                var obj2 ={};
                obj2.name = res.data12[i].xxjc;
                obj2.jfzzl = (res.data12[i].jfzzl*100).toFixed(2) + "%";
                $scope.bar2_schoolR.push(obj2);
                var xxjc = res.data12[i].xxjc;
                $scope.bar2_schoolX.push(xxjc);
                var t_xfzjf = res.data12[i].t_xfzjf;
                $scope.bar2_schoolOld.push(t_xfzjf);
                var l_xfzjf = res.data12[i].l_xfzjf;
                $scope.bar2_schoolNew.push(l_xfzjf);
            }

            //学费收入增长率top5_幼儿园bar2
            for(var i= 0; i < res.data11.length; i++){
                var obj2 ={};
                obj2.name = res.data11[i].xxjc;
                obj2.jfzzl = (res.data11[i].jfzzl*100).toFixed(2) + "%";
                $scope.bar2_kin_schoolR.push(obj2);
                var xxjc = res.data11[i].xxjc;
                $scope.bar2_kin_schoolX.push(xxjc);
                var t_xfzjf = res.data11[i].t_xfzjf;
                $scope.bar2_kin_schoolOld.push(t_xfzjf);
                var l_xfzjf = res.data11[i].l_xfzjf;
                $scope.bar2_kin_schoolNew.push(l_xfzjf);
            }

            //学生人数top5_学校bar3
            for(var i= 0; i < res.data4.length; i++){
                var xxjc = res.data4[i].xxjc;
                var xszcrs = res.data4[i].xszcrs;
                $scope.bar3_schoolX.push(xxjc);
                $scope.bar3_schoolData.push(xszcrs);
            }

            //学生人数top5_幼儿园bar3
            for(var i= 0; i < res.data5.length; i++){
                var xxjc = res.data5[i].xxjc;
                var xszcrs = res.data5[i].xszcrs;
                $scope.bar3_kin_schoolX.push(xxjc);
                $scope.bar3_kin_schoolData.push(xszcrs);
            }

            console.log("-------------555---------------");
            console.log($scope.bar2_schoolR);

            $scope.piecharts();
            $scope.linecharts();
            $scope.barcharts();

        });




        //初始化大屏数据
        // $scope.rq = '';		//日期


        //近5年学费及人数变化 -- 折线图 line
        $scope.linecharts=function () {
            var winH = $(window).height();
            var winW = $(window).width();
            $('.edu').css('height',winH);
            var fontSize;
            var borderWidth;
            var y;
            console.log("8888888888888888");
            console.log(winH);
            //高度处理
            if(winH<666){
                fontSize =12;
                borderWidth = 4;
                y=18;
            }else if(winH>666 && winH<=680){
                fontSize =12;
                borderWidth = 8;
                y=24;
            }else if(winH>680 && winH<=770){
                fontSize =12;
                borderWidth = 4;
                y=24;
            }else if(winH>1500 && winH<=2000){
                fontSize = 30;
                borderWidth = 4;
                y=30;
            }else {
                fontSize =16;
                borderWidth = 8;
                y=28;
            }
            //学费变化-- 折线图
            var feelinechart = echarts.init(document.getElementById('feelinechart'));
            var feeoption = {
                tooltip : {
                    trigger: 'axis',
                    axisPointer:{    //坐标轴指示器
                        type:'line',
                        lineStyle:{
                            color:'rgba(0,0,0,0)',
                        },
                    },
                    textStyle :{
                        fontSize:fontSize
                    },
                    formatter:function (params) {
                        return params[0].name+"学费:" + params[0].value +"万";
                    }
                },
                //calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : true,
                        axisLine:{show:true,lineStyle:{color:'#fff',}},
                        axisTick:{show:true,inside:true},
                        axisLabel:{show:true,interval:0,textStyle:{color : '#fff',fontSize : fontSize}},
                        //data : $scope.lineX
                        data :['2013','2014','2015','2016','2017']
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        boundaryGap: [0.5, 0.5],
                        splitNumber: 4,
                        position:'left',
                        min:0,
                        // max:8000,
                        splitLine:{show:true,lineStyle:{color:'#7F7F7F',width:0.5,type:'dashed'}},
                        axisLine:{show:false,}, //{show:true,interval:0,textStyle:{color : '#fff',fontSize : 18}},
                        axisLabel:{show:true,interval:0,textStyle:{color : '#fff',fontSize : fontSize}},
                        axisTick:{show:true,inside:true},

                    }
                ],
                grid:{
                    x:"15%",
                    x2:"10%",
                    y:y,
                    y2:"15%",
                },
                series : [
                    {
                        name:'',
                        type:'line',
                        symbol:'circle',
                        //data : $scope.linedata1,
                       data:['11.1','15','22','13','26'],
                        /*symbolSize:function (value) {
                            if(value==htxse)
                            {
                                return 22;
                            }
                            else{
                                return 10;
                            }
                        },//大小
*/						itemStyle:{
                        normal:{
                            label:{
                                show:true,
                                position:"top",
                                interval:"0",
                                textStyle:{color:"#2FD3BB",fontSize : fontSize},
                            },
                            color:"#2FD3BB",
                            borderColor:'#2FD3BB',
                            borderWidth: borderWidth,
                            lineStyle:{
                                color:'#2FD3BB'
                            }
                        }
                    },
                        lineStyle:{
                            normal:{
                                color:'#2FD3BB',
                            }
                        },
                        areaStyle: {
                            type: 'default',
                            normal:{
                                color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0, color: '#09293d' // 0% 处的颜色
                                }, {
                                    offset: 1, color: '#034570' // 100% 处的颜色
                                }], false),
                                opacity:0.5
                            }
                        }
                    }
                ]
            };
            feelinechart.setOption(feeoption);


            //人数变化-- 折线图
            var peonumlinechart = echarts.init(document.getElementById('peonumlinechart'));
            var peonumoption = {
                tooltip : {
                    trigger: 'axis',
                    axisPointer:{    //坐标轴指示器
                        type:'line',
                        lineStyle:{
                            color:'rgba(0,0,0,0)',
                        },
                    },
                    textStyle :{
                        fontSize:fontSize,
                    },
                    formatter:function (params) {
                        return params[0].name+"人数:" + params[0].value+"人";
                    }
                },
                //calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : true,
                        axisLine:{show:true,lineStyle:{color:'#fff',}},
                        axisTick:{show:true,inside:true},
                        axisLabel:{show:true,interval:0,textStyle:{color : '#fff',fontSize : fontSize}},
                        //data : $scope.lineX
                        data :['2013','2014','2015','2016','2017']

                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        boundaryGap: [0.5, 0.5],
                        splitNumber: 3,
                        position:'left',
                        min:0,
                        splitLine:{show:true,lineStyle:{color:'#7F7F7F',width:0.5,type:'dashed'}},
                        axisLine:{show:false,}, //{show:true,interval:0,textStyle:{color : '#fff',fontSize : 18}},
                        axisLabel:{show:true,interval:1000,textStyle:{color : '#fff',fontSize : fontSize}},
                        axisTick:{show:true,inside:true},

                    }
                ],
                grid:{
                    x:"15%",
                    x2:"10%",
                    y:y,
                    y2:"15%",
                },
                series : [
                    {
                        name:'',
                        type:'line',
                        symbol:'circle',
                        //data : $scope.linedata2,
                         data:['1094','754','800','1270','1398'],
                        /*symbolSize:function (value) {
                            if(value==htxse)
                            {
                                return 22;
                            }
                            else{
                                return 10;
                            }
                        },//大小
*/						itemStyle:{
                        normal:{
                            label:{
                                show:true,
                                position:"top",
                                interval:"0",
                                textStyle:{color:"#2FD3BB",fontSize : fontSize},
                            },
                            color:"#2FD3BB",
                            borderColor:'#2FD3BB',
                            borderWidth: borderWidth,
                            lineStyle:{
                                color:'#2FD3BB'
                            }
                        }
                    },
                        lineStyle:{
                            normal:{
                                color:'#2FD3BB',
                            }
                        },
                        areaStyle: {
                            type: 'default',
                            normal:{
                                color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0, color: '#09293d' // 0% 处的颜色
                                }, {
                                    offset: 1, color: '#034570' // 100% 处的颜色
                                }], false),
                                opacity:0.5
                            }
                        }
                    }

                ]
            };
            peonumlinechart.setOption(peonumoption);
        }
        //各学段收费 饼图 pie
        $scope.piecharts=function () {
            var winH = $(window).height();
            var winW = $(window).width();
            $('.edu').css('height',winH);
            var itemGap=20;
            var itemWidth=28;
            var itemHeight=28;
            var fontSize = 20;
            var borderWidth;
            console.log(winH);
            console.log("77777777777777777777");
            //661 768
            //761 768
            //1080 973
            //高度处理
            if(winH<666){
                itemGap=10;
                itemWidth=16;
                itemHeight=16;
                borderWidth =2;
                fontSize = 15;
            }else if(winH>666 && winH<=780){
                itemGap=14;
                itemWidth=18;
                itemHeight=18;
                borderWidth =2;
            }else if(winH>1280 && winH<=1400){
                itemGap=16;
                itemWidth=20;
                itemHeight=20;
                borderWidth =2;
                fontSize=20;
            }else if(winH>1500 && winH<=2000){
                itemGap=28;
                itemWidth=36;
                itemHeight=36;
                borderWidth =4;
                fontSize=40;
            } else {
                itemGap=20;
                itemWidth=28;
                itemHeight=28;
                borderWidth =4;
            }

            var feepiecharts = echarts.init(document.getElementById('feepiecharts'));
            var feepieoption = {
                color:['#326CFF','#46E1CF','#FD9649','#EF5297'],
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    //x: 'right',
                    y2:'20%',
                    x2:"20%",
                    itemGap:itemGap,
                    itemWidth:itemWidth,
                    itemHeight:itemHeight,
                    data:['幼儿园','小学','初中','高中'],
                    textStyle: {
                        color:['#326CFF','#46E1CF','#FD9649','#EF5297'],
                        fontSize:fontSize
                    }
                },
                series: [
                    {
                        name:'各学段收费',
                        type:'pie',
                        radius: ['50%','75%'],
                        center:["30%","50%"],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            normal: {
                                borderWidth: borderWidth,
                                borderColor:"#fff"
                            }
                        },
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: fontSize,
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                       // data:$scope.piedata
                        data: [
                            {value:138, name:'幼儿园'},
                            {value:156, name:'小学'},
                            {value:120, name:'初中'},
                            {value:130, name:'高中'}
                        ]
                    },
                    {
                        name:'各学段收费',
                        type:'pie',
                        radius: ['40%','50%'],
                        center:["30%","50%"],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            normal: {
                                borderWidth: borderWidth,
                                borderColor:"#fff"
                            }
                        },
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: fontSize,
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        //data:$scope.piedata
                        data: [
                            {value:138, name:'幼儿园'},
                            {value:156, name:'小学'},
                            {value:120, name:'初中'},
                            {value:130, name:'高中'}
                        ]
                    }
                ]
            };
            feepiecharts.setOption(feepieoption);
        }
        $scope.linecharts()
        $scope.piecharts()
        //学校柱状图 bar
        $scope.barcharts = function(){
            var winH = $(window).height();
            var winW = $(window).width();
            $('.edu').css('height',winH);
            var barWidth;
            var fontSize;
            var fontSizeTetle;
            console.log(winH);
            //高度处理
            if(winH<666){
                barWidth = 19;
                fontSize = 10.5;
                fontSizeTetle =16;
            }else if(winH>666 && winH<=680){
                barWidth = 14;
                fontSize = 11;
                fontSizeTetle =16;
            }else if(winH>680 && winH<=770){
                barWidth = 12;
                fontSize = 10.5;
                fontSizeTetle =14;
            }else if(winH>850 && winH<=980){
                barWidth = 12;
                fontSize = 14;
                fontSizeTetle =14;
            }else if(winH>1500 && winH<=2000){
                barWidth = 22;
                fontSize = 22;
                fontSizeTetle =34;
            }else {
                barWidth = 19;
                fontSize = 12;
                fontSizeTetle =16;
            }
            // bar1
            var bar1 = echarts.init(document.getElementById('bar1'));
            var optionbar1 = {
                title : {
                    text: '学校人数增长率TOP5',
                    x:'40',
                    y:'0',
                    textStyle :{
                        fontSize:fontSizeTetle,
                        color:'white'
                    }
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer:{    //坐标轴指示器
                        type:'line',
                        lineStyle:{
                            color:'rgba(0,0,0,0)',
                        },
                    },
                    formatter: function (params) {
                        // var tar = params[0];
                        // var tar1 = params[1];
                        console.log("--------44444----------");
                        console.log(params);
                        for(var i=0;i<$scope.bar1_schoolR.length;i++){
                            if(params[0].name==$scope.bar1_schoolR[i].name){
                                return params[0].name + '<br/>' + '学校人数增长率' + ' : ' +$scope.bar1_schoolR[i].rszzl;
                            }
                        }
                        // return tar.name + '<br/>' + '学校人数增长率' + ' : ' + (tar.value / tar1.value * 100).toFixed(2)+"%";

                    }
                },
                // calculable : true,

                xAxis : [
                    {
                        type : 'category',
                        axisLabel:{
                            show:true,
                            interval:0,
                            rotate: 15,
                            textStyle:{
                                color:'#ddddde',
                                fontSize:fontSize,
                            }
                        },
                        axisTick:{show:false},
                        axisLine:{show:true,lineStyle:{color:"#2390a0"}},
                        //data: $scope.bar1_schoolX
                         data : ['A学校','B学校','C学校','D学校','E学校']
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        axisLabel:{show:false},
                        splitLine:{show:false},
                        axisLine:{show:false},
                        axisTick:{show:false},
                    }
                ],
                grid:{
                    y:20,
                    y2:"18%",
                    x:38,
                    x2:20
                },
                series : [
                    {
                        name:'学校人数',
                        type:'bar',
                        barWidth:barWidth,
                        itemStyle:{
                            normal:{
                                label :{position:'insideTopRight',show:true,textStyle:{color:"#72c190",fontSize : fontSize}},
                                color: '#146BC8',
                                barBorderRadius:[3, 3, 0, 0]
                            }
                        },
                        barGap:'0%',
                        //data:$scope.bar1_schoolOld,
                         data:[ 100, 100, 100, 100, 100],
                    },{
                        name:'学校人数',
                        type:'bar',
                        barWidth:barWidth,
                        itemStyle:{
                            normal:{
                                label :{position:'top',show:true,textStyle:{color:"#72c190",fontSize : fontSize}},
                                color: '#D25982',
                                barBorderRadius:[3, 3, 0, 0]
                            }
                        },
                        //data:$scope.bar1_schoolNew,
                         data:[ 150, 140, 130, 120, 110],
                    }
                ]
            };
            bar1.setOption(optionbar1);

            //bar 2
            var bar2 = echarts.init(document.getElementById('bar2'));
            var optionbar2 = {
                title : {
                    text: '学费收入增长率TOP5',
                    x:'40',
                    y:'8',
                    textStyle :{
                        fontSize:fontSizeTetle,
                        color:'white'
                    }
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer:{    //坐标轴指示器
                        type:'line',
                        lineStyle:{
                            color:'rgba(0,0,0,0)',
                        },
                    },
                    formatter: function (params) {
                        for(var i=0;i<$scope.bar2_schoolR.length;i++){
                            if(params[0].name==$scope.bar2_schoolR[i].name){
                                return params[0].name + '<br/>' + '学费收入增长率' + ' : ' +$scope.bar2_schoolR[i].jfzzl;
                            }
                        }
                        // return tar.name + '<br/>' + '学费收入增长率' + ' : ' + (tar.value / tar1.value * 100).toFixed(2)+"%";
                    }
                },
                calculable : true,

                xAxis : [
                    {
                        type : 'category',
                        axisLabel:{show:true,interval:0,rotate: 15,textStyle:{color : '#ddddde',fontSize : fontSize}},
                        axisTick:{show:false},
                        axisLine:{show:true,lineStyle:{color:"#2390a0"}},
                        data: $scope.bar2_schoolX
                        // data : ['A学校','B学校','C学校','D学校','E学校']
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        axisLabel:{show:false},
                        splitLine:{show:false},
                        axisLine:{show:false},
                        axisTick:{show:false},
                    }
                ],
                grid:{
                    y:30,
                    y2:"18%",
                    x:38,
                    x2:20
                },
                series : [
                    {
                        name:'学费收入',
                        type:'bar',
                        barWidth:barWidth,
                        itemStyle:{
                            normal:{
                                label :{position:'insideTopRight',show:true,textStyle:{color:"#72c190",fontSize : fontSize}},
                                color: '#146BC8',
                                barBorderRadius:[3, 3, 0, 0]
                            }
                        },
                        barGap:'0%',
                        //data:$scope.bar2_schoolOld,
                         data:[ 100, 100, 100, 100, 100],
                    },{
                        name:'学费收入',
                        type:'bar',
                        barWidth:barWidth,
                        itemStyle:{
                            normal:{
                                label :{position:'top',show:true,textStyle:{color:"#72c190",fontSize : fontSize}},
                                color: '#D25982',
                                barBorderRadius:[3, 3, 0, 0]
                            }
                        },
                        //data:$scope.bar2_schoolNew,
                        data:[ 150, 140, 130, 120, 110],
                    }
                ]
            };
            bar2.setOption(optionbar2);

            //bar 3
            var bar3 = echarts.init(document.getElementById('bar3'));
            var optionbar3 = {
                title : {
                    text: '学生人数TOP5',
                    x:'40',
                    y:'0',
                    textStyle :{
                        fontSize:fontSizeTetle,
                        color:'white'
                    }
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer:{    //坐标轴指示器
                        type:'line',
                        lineStyle:{
                            color:'rgba(0,0,0,0)',
                        },
                    }

                },
                grid: {
                    x:"29%",
                    x2:"10%",
                    y:24,
                    y2:20,
                    // containLabel: true
                    // default:false
                },
                xAxis:  {
                    type: 'value',
                    show:false
                },
                yAxis: {
                    type: 'category',
                    inverse:true, //是否是反向坐标轴
                    axisTick:{show:false},
                    axisLine:{show:true,lineStyle:{color:"#2390a0"}},
                    axisLabel:{show:true,interval:0,textStyle:{color : '#ddddde',fontSize : fontSize}},
                    //data:$scope.bar3_schoolX
                     data: ['A学校','B学校','C学校','D学校','E学校']
                },
                axisLabel:{
                    show:true,
                    textStyle:{
                        color:"#3AB5E4",
                        fontSize:fontSize
                    },
                },
                series: [
                    {
                        name: '学生人数',
                        type: 'bar',
                        stack: '总量',
                        itemStyle:{normal:{color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 1,
                            y2: 0,
                            colorStops: [{
                                offset: 0, color: '#146BC8' // 0% 处的颜色
                            }, {
                                offset: 1, color: '#31E3FA' // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        }}},
                        // itemStyle:{normal:{color:"#31E3FA"}},
                        barWidth : '50%',
                        label: {
                            normal: {
                                show: true,
                                position: 'right',
                                textStyle:{
                                    color:"#fff",
                                    fontSize:fontSize
                                }
                            }
                        },
                        //data:$scope.bar3_schoolData
                        data: [68,77,82,88,90,]
                    }

                ]
            };
            bar3.setOption(optionbar3);

        };
        // $scope.barcharts();

        //学校柱状图 bar_kin
        $scope.barcharts_kin = function(){
            var winH = $(window).height();
            var winW = $(window).width();
            $('.edu').css('height',winH);
            var barWidth;
            var fontSize;
            var fontSizeTetle;
            console.log(winH);
            //高度处理
            if(winH<666){
                barWidth = 12;
                fontSize = 10;
                fontSizeTetle =10;
            }else if(winH>666 && winH<=680){
                barWidth = 14;
                fontSize = 11;
                fontSizeTetle =16;
            }else if(winH>680 && winH<=770){
                barWidth = 12;
                fontSize = 10.5;
                fontSizeTetle =14;
            }else if(winH>1500 && winH<=2000){
                barWidth = 22;
                fontSize = 22;
                fontSizeTetle =34;
            }else {
                barWidth = 19;
                fontSize = 14;
                fontSizeTetle =16;
            }

            // bar1_kin
            var bar1_kin = echarts.init(document.getElementById('bar1_kin'));
            var optionbar1_kin = {
                title : {
                    text: '学校人数增长率TOP5',
                    x:'40',
                    y:'0',
                    textStyle :{
                        fontSize:fontSizeTetle,
                        color:'white'
                    }
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer:{    //坐标轴指示器
                        type:'line',
                        lineStyle:{
                            color:'rgba(0,0,0,0)',
                        },
                    },
                    formatter: function (params) {
                        // var tar = params[0];
                        // var tar1 = params[1];
                        console.log("--------44444----------");
                        console.log(params);
                        for(var i=0;i<$scope.bar1_kin_schoolR.length;i++){
                            if(params[0].name==$scope.bar1_kin_schoolR[i].name){
                                return params[0].name + '<br/>' + '学校人数增长率' + ' : ' +$scope.bar1_kin_schoolR[i].rszzl;
                            }
                        }
                        // return tar.name + '<br/>' + '学校人数增长率' + ' : ' + (tar.value / tar1.value * 100).toFixed(2)+"%";

                    }
                },
                calculable : true,

                xAxis : [
                    {
                        type : 'category',
                        axisLabel:{show:true,interval:0,rotate: 15,textStyle:{color : '#ddddde',fontSize : fontSize}},
                        axisTick:{show:false},
                        axisLine:{show:true,lineStyle:{color:"#2390a0"}},
                        //data: $scope.bar1_kin_schoolX
                         data : ['A学校','B学校','C学校','D学校','E学校']
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        axisLabel:{show:false},
                        splitLine:{show:false},
                        axisLine:{show:false},
                        axisTick:{show:false},
                    }
                ],
                grid:{
                    y:20,
                    y2:"15%",
                    x:38,
                    x2:20
                },
                series : [
                    {
                        name:'学校人数',
                        type:'bar',
                        barWidth:barWidth,
                        itemStyle:{
                            normal:{
                                label :{position:'insideTopRight',show:true,textStyle:{color:"#72c190",fontSize : fontSize}},
                                color: '#146BC8',
                                barBorderRadius:[3, 3, 0, 0]
                            }
                        },
                        barGap:'0%',
                        //data:$scope.bar1_kin_schoolOld,
                        data:[ 100, 100, 100, 100, 100],
                    },{
                        name:'学校人数',
                        type:'bar',
                        barWidth:barWidth,
                        itemStyle:{
                            normal:{
                                label :{position:'top',show:true,textStyle:{color:"#72c190",fontSize : fontSize}},
                                color: '#D25982',
                                barBorderRadius:[3, 3, 0, 0]
                            }
                        },
                        //data:$scope.bar1_kin_schoolNew,
                         data:[ 150, 140, 130, 120, 110],
                    }
                ]
            };
            bar1_kin.setOption(optionbar1_kin);

            //bar2_kin
            var bar2_kin = echarts.init(document.getElementById('bar2_kin'));
            var optionbar2_kin = {
                title : {
                    text: '学费收入增长率TOP5',
                    x:'40',
                    y:'8',
                    textStyle :{
                        fontSize:fontSizeTetle,
                        color:'white'
                    }
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer:{    //坐标轴指示器
                        type:'line',
                        lineStyle:{
                            color:'rgba(0,0,0,0)',
                        },
                    },
                    formatter: function (params) {
                        for(var i=0;i<$scope.bar2_kin_schoolR.length;i++){
                            if(params[0].name==$scope.bar2_kin_schoolR[i].name){
                                return params[0].name + '<br/>' + '学费收入增长率' + ' : ' +$scope.bar2_kin_schoolR[i].jfzzl;
                            }
                        }
                        // return tar.name + '<br/>' + '学费收入增长率' + ' : ' + (tar.value / tar1.value * 100).toFixed(2)+"%";
                    }
                },
                calculable : true,

                xAxis : [
                    {
                        type : 'category',
                        axisLabel:{show:true,interval:0,rotate: 10,textStyle:{color : '#ddddde',fontSize : fontSize}},
                        axisTick:{show:false},
                        axisLine:{show:true,lineStyle:{color:"#2390a0"}},
                        //data: $scope.bar2_kin_schoolX
                        data : ['A学校','B学校','C学校','D学校','E学校']
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        axisLabel:{show:false},
                        splitLine:{show:false},
                        axisLine:{show:false},
                        axisTick:{show:false},
                    }
                ],
                grid:{
                    y:30,
                    y2:"15%",
                    x:38,
                    x2:20
                },
                series : [
                    {
                        name:'学费收入',
                        type:'bar',
                        barWidth:barWidth,
                        itemStyle:{
                            normal:{
                                label :{position:'insideTopRight',show:true,textStyle:{color:"#72c190",fontSize : fontSize}},
                                color: '#146BC8',
                                barBorderRadius:[3, 3, 0, 0]
                            }
                        },
                        barGap:'0%',
                        //data:$scope.bar2_kin_schoolOld,
                         data:[ 100, 100, 100, 100, 100],
                    },{
                        name:'学费收入',
                        type:'bar',
                        barWidth:barWidth,
                        itemStyle:{
                            normal:{
                                label :{position:'top',show:true,textStyle:{color:"#72c190",fontSize : fontSize}},
                                color: '#D25982',
                                barBorderRadius:[3, 3, 0, 0]
                            }
                        },
                        //data:$scope.bar2_kin_schoolNew,
                         data:[ 150, 140, 130, 120, 110],
                    }
                ]
            };
            bar2_kin.setOption(optionbar2_kin);

            //bar3_kin
            var bar3_kin = echarts.init(document.getElementById('bar3_kin'));
            var optionbar3_kin = {
                title : {
                    text: '学生人数TOP5',
                    x:'40',
                    y:'0',
                    textStyle :{
                        fontSize:fontSizeTetle,
                        color:'white'
                    }
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer:{    //坐标轴指示器
                        type:'line',
                        lineStyle:{
                            color:'rgba(0,0,0,0)',
                        },
                    },
                },
                grid: {
                    x:"25%",
                    x2:"10%",
                    y:24,
                    y2:20,
                    // containLabel: true
                    // default:false
                },
                xAxis:  {
                    type: 'value',
                    show:false
                },
                yAxis: {
                    type: 'category',
                    inverse:true, //是否是反向坐标轴
                    axisTick:{show:false},
                    axisLine:{show:true,lineStyle:{color:"#2390a0"}},
                    axisLabel:{show:true,interval:0,textStyle:{color : '#ddddde',fontSize : fontSize}},
                    //data:$scope.bar3_kin_schoolX
                     data: ['A学校','B学校','C学校','D学校','E学校']
                },
                axisLabel:{
                    show:true,
                    textStyle:{
                        color:"#3AB5E4",
                        fontSize:fontSize
                    }
                },
                series: [
                    {
                        name: '学生人数',
                        type: 'bar',
                        stack: '总量',
                        itemStyle:{normal:{color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 1,
                            y2: 0,
                            colorStops: [{
                                offset: 0, color: '#146BC8' // 0% 处的颜色
                            }, {
                                offset: 1, color: '#31E3FA' // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        }}},
                        barWidth : '50%',
                        label: {
                            normal: {
                                show: true,
                                position: 'right',
                                textStyle:{
                                    color:"#fff",
                                    fontSize:fontSize
                                }
                            }
                        },
                        //data:$scope.bar3_kin_schoolData
                         data: [68,77,82,88,90,]
                    }

                ]
            };
            bar3_kin.setOption(optionbar3_kin);

        };
        // $scope.barcharts_kin();



        /**
         *数据统一处理
         *type
         * 1.取绝对值;
         * 2.取绝对值乘以100;
         * 3.取绝对值乘以100加“%”
         */
        function dataFormat(number,type){
            if(number)
            {
                if(type=="1")
                {
                    return  (Number(number).toFixed(2));
                }
                else if(type=="2")
                {
                    return  (Number(number*1000000*100)/1000000);
                }
                else if(type=="3")
                {
                    return   (Number(number*1000000*100)/1000000)+"%";
                }
            }
            else
            {
                return "0";
            }
        };

        // 单纯地加千位符和小数位
        function qwfformatter(value,type) {
            var numbers = new String(Math.round(value * 100) / 100).split(".", 2);
            var number = numbers[0].replace(/\d+?(?=(?:\d{3})+$)/img, "$&,");
            var dec = numbers[1] || "00";
            if(type=="1"){
                if (dec.length > 2) {
                    dec = dec.substring(0, 2);
                }
                if (dec.length == 1) {
                    dec += "0";
                }
                return number + "." + dec

            }else if (type=="2"){
                return number ;
            }

        };

    }]);
});