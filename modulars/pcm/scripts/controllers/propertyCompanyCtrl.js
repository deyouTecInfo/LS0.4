define(["./controllers"], function (controllers) {
    "use strict";
    controllers.controller("propertyCompanyCtrl", ["$scope", "$state","mainService","propertyCompanyService",'$rootScope','$tool',"$compile",function ($scope, $state,mainService,propertyCompanyService,$rootScope,$tool,$compile) {
        var url = $rootScope.mysates.name; //获取当前页面路由名称
        var pflag = "ls";
        var paramArr = [];
        var winH = $(window).height();
        var winW = $(window).width();
        $('.hpt').css('height',winH);
        $('.tqimgdiv').css('width',$('.tqimgdiv').height());	//天气、日期
        $scope.ispc = true;
        $scope.bfives = true;
        
        var setIn_5=0; //定时器五
        var setIn_6=0;//定时器六


        // console.log("url1----------------"+url);
        // console.log($rootScope.mysates.name);
        // console.log("login----------------"+$rootScope.loginflag);
        //设置全屏
//		$scope.quanping();
        $rootScope.homepage = "hpt";
        $rootScope.isNative = true;
        $rootScope.theme = true;
        $scope.screen = function(){
            $scope.quanping();
//		　　　　　　监听不同浏览器的全屏事件，并件执行相应的代码
            function processEvent(e){ e.preventDefault(); };
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
                // e.stopPropagation();
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
                        setH(7);
                    },1);
                }else{
                    setTimeout(function(){
                        runOnce(setH(8));
                    },1);
                }
            }, false);

            if(!$rootScope.qp){
                setTimeout(function () {
                    setH(9);
                    $('.hpt').css('height',winH);
                },400);
            }
        };


        //退出全屏
        $scope.exitFullScreen = function(){
            $scope.tuichuquanping();
            setTimeout(function () {
                setH(10);
            },100);
        };

        var setH = function(){
            //console.log("--------------------------");
            //console.log(a);
            clearInterval(setIn_5); //饼图轮播
            clearInterval(setIn_6); //地图轮播
            winH = $(window).height();
            winW = $(window).width();
            $('.hpt').css('height',winH);
            $('.tqimgdiv').css('width',$('.tqimgdiv').height());	//天气、日期
            //高度处理
            if(winH<=490){
                // $('.hpt .pmtb table,tr').css('height',20+"px");
                $(".card1").css("padding-top","3%");
            }else if(winH>490 && winH<750){
                // $('.hpt .pmtb table,tr').css('height',26+"px");
                $(".card1").css("padding-top","5%");
            }else if(winH>740 && winH<900){
                // $('.hpt .pmtb table,tr').css('height',35+"px");
                $(".card1").css("padding-top","10%");
            }else{

            }
            piecharts();
            mapcharts();
            $scope.$apply();
        };

        $scope.jyzt_byys="--"; //本月实收
        $scope.jyzt_brss="--"; //本日实收
        $scope.jyzt_bnljss="--"; //本年实收

        $scope.sjje=0;  //收缴金额
        $scope.sjl=0;   //收缴率
        $scope.sjmb=0; //目标收缴率
        $scope.yslsjje=0; //已收楼收缴金额
        $scope.yslsjl=0;  //已收楼收缴率
        $scope.mbyslsjl=0;  //目标已收楼收缴率
        $scope.zjje=0;  //追缴金额
        $scope.zjl=0; //追焦虑
        $scope.ncwnqf=0; //年初往年欠费
        $scope.cwsl=0; //车位数量
        $scope.cwsr=0; //车位收入
        $scope.cwwyf=0;  //车位物业费
        $scope.cwfwf=0;  //车位服务费
        $scope.cwsyf=0;  //车费使用费
        $scope.cwlstcf=0;  //临时停车费

        $scope.collect_fcds=0;  // 收款-房产代收
        $scope.collect_qt=1;  //收款-其他
        $scope.collect_xjsk=0;  //收款-现金收款
        $scope.collect_yhts=0;  //收款-银行托收
        $scope.collect_kzf=0;  //收款-收款
        $scope.collect_sk=0;  //收款-收款
        $scope.ZJSJ=[]; //收缴数据
        $scope.SJSJ=[]; //收缴数据
        $scope.DITUSJ=[];  //地图数据

        //获取大屏数据



        //饼图
        var piecharts=function () {
            var winH = $(window).height();
            var winW = $(window).width();
            $('.hpt').css('height',winH);
            var piebottom="15px";
            var pieleft="10%";
            var piecenter=["50%","35%"];
            var piepadding=[2,2];
            var itemGap=5;
            var  rad=['35%', '58%'];
            var titleY="27%";
            //高度处理
            if(winW<=1290){
                piepadding=[2,2];
                piecenter=["50%","35%"];
                itemGap=5;
                rad=['35%', '58%'];
                titleY="27%";
            }else if(winW>1290 && winH<=1370){
                piepadding=[2,2];
                piecenter=["50%","38%"];
                itemGap=7;
                rad=['35%', '58%'];
                titleY="27%";
            } else {
                piepadding=[5,15];
                piecenter=["50%","39%"];
                itemGap=14;
                rad=['40%', '65%'];
                titleY="34%";
            }
            var app = {};
            var myChart = echarts.init(document.getElementById('skfs'));
            var option = {
                // color:['#78A04E','#B89A38','#A45E44','#67B7AE','#788790','#CCCACB'],
                color:['#C25558','#B4517D','#B3BF75','#5499E6','#575EC6','#7693C2'],
                title: {
                    x: 'center',
                    y: titleY,
                    textStyle: {
                        fontWeight: 'normal',
                        fontSize: 18,
                        color:"#fff"
                    },
                    subtextStyle:{
                        fontSize: 16,
                        color:"#ddd"
                    }
                },
                tooltip: {
                    trigger: 'item',
                    // formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'horizontal',
                    bottom: 10,
                    itemWidth:15,
                    left:"12%",
                    width:"80%",
                    padding:piepadding,
                    itemGap:itemGap,
                    data:['房产代收','现金收款','银行托收','空置房','收款','其他'],
                    textStyle: {
                        // color:['#C25558','#B4517D','#D2686A','#5499E6','#575EC6','#1773A8'],
                        color:"#fff",
                        fontSize:12
                    }
                },
                grid:{
                    // left:"5%"
                },
                series: [
                    {
                        name:'收款方式',
                        center:piecenter,
                        type: 'pie',
                        selectedMode: 'single',
                        radius: rad,
                        label: {
                            normal: {
                                show:false,
                            }
                        },
                        data:[
                            {name:'房产代收',value:$scope.collect_fcds,},
                            {name:'现金收款',value:$scope.collect_xjsk, },
                            {name:'银行托收',value:$scope.collect_yhts, },
                            {name:'空置房',value:$scope.collect_kzf, },
                            {name:'收款',value:$scope.collect_sk, },
                            {name:'其他',value:$scope.collect_qt, },
                        ]
                    }
                ]
            };
            myChart.setOption(option);
            app.currentIndex = -1;
            function switchAction(){
                var dataLen = option.series[0].data.length;
                if (app.currentIndex > 0) {
                    myChart.dispatchAction({
                        type: 'pieUnSelect',
                        seriesIndex: 0,
                        dataIndex: option.series[0].data[app.currentIndex].name
                    });
                }

                app.currentIndex = (app.currentIndex + 1) % dataLen;
                // pieSelect
                myChart.dispatchAction({
                    type: 'pieToggleSelect',
                    seriesIndex: 0,
                    name: option.series[0].data[app.currentIndex].name,
                });


                option.title.text=option.series[0].data[app.currentIndex].name;
                option.title.subtext=option.series[0].data[app.currentIndex].value;
                myChart.setOption(option,true);

            };
            if($rootScope.loginflag) {
                setIn_5 = setInterval(switchAction, 3000);
            }
            myChart.on('click', function (params) {
                //console.log(params);
                option.title.text=params.name;
                option.title.subtext=params.value;
                myChart.setOption(option,true);
            });
        };
        //地图
        var mapcharts=function () {
            var convertData = function (data) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var geoCoord = geoCoordMap[data[i].name];
                    if (geoCoord) {
                        res.push({
                            name: data[i].name,
                            symbol:data[i].symbol,
                            value: geoCoord.concat(data[i].value)
                        });
                    }
                }
                return res;
            };
            var dtEchart = echarts.init(document.getElementById('gssjje'));
            var option = {
                tooltip: {
                    trigger: 'item',
                    position: function (pos, params, dom, rect, size) {
                        return [rect.x+20,rect.y]; //跟着选中区域跑
                    },
                    formatter: function (params) {
                        return params.name + ' : ' + qwfformatter(params.value[2],1)+" 万元";
                    }
                },
                geo: {
                    map: 'china',
                    top:"2%",
                    bottom:"12%",
                    left:"10%",
                    right:"10%",
                    roam:true,
                    scaleLimit:{min:1,max:5},
                    label: {
                        emphasis: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: { borderColor: '#dad6d6', areaColor: 'rgba(255,255,255,0)', },
                        emphasis: { borderColor: '#dad6d6', areaColor: 'rgba(255,255,255,0)' }
                    }
                },
                series: [
                    {
                        name: '各区域收缴金额分布',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        // data: convertData(data),
                        data: $scope.DITUSJ,
                        symbolSize: 30,
                        symbol:'pin',
                        label: {
                            normal: {
                                show: false,
                                formatter: '{b}'
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        itemStyle: {
                            normal: {
                                // color:"#13C4A5",
                            },
                            emphasis: {
                                color:"#5BC0DE",
                                borderColor: '#fff',
                                borderWidth: 1
                            }
                        },
                        animation:"true",
                        animationEasing:'quarticInOut',
                        animationDelay: function (idx) {
                            // 越往后的数据延迟越大
                            return idx * 20;
                        }

                    }
                ]
            }
            dtEchart.setOption(option);

            // var currentIndex = -1;
            function switchAction_map(){
                var dataLen = option.series[0].data.length;
                // console.log(dataLen);
                // 取消高亮
                dtEchart.dispatchAction({
                    type: 'downplay',
                    seriesIndex: 0,
                    dataIndex:$rootScope.currentIndex_map_1
                });

                $rootScope.currentIndex_map_1 = ($rootScope.currentIndex_map_1 + 1) % dataLen;
                // 高亮当前选中symbol

                // console.log(option.series[0].data[currentIndex]);
                dtEchart.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    name: option.series[0].data[$rootScope.currentIndex_map_1].name,
                });

                dtEchart.dispatchAction({
                    type : 'showTip',
                    seriesIndex : 0,
                    name: option.series[0].data[$rootScope.currentIndex_map_1].name,
                });


                if($rootScope.currentIndex_map_1==dataLen){
                    $rootScope.currentIndex_map_1=-1
                }
            };

            if($rootScope.loginflag){
                setIn_6=setInterval(switchAction_map,2000);
            }
            // console.log('----没点击'+setIn_6);
        };


        //三大指标
        var getWySjlSS_res=function () {
            var res =  {
                "status": 1001,
                "data": [ {
                    "jyzt_bnljss": "1528318656.65",
                    "jyzt_brss": "2153697.0",
                    "jyzt_byss": "169113840.00"
                } ]
            }
            if(!res ||res ==null || res.data.length<1){
                return;
            } else{
                var data=res.data[0];
                var br=qwfformatter(data.jyzt_brss,3)/1;
                var by=qwfformatter(data.jyzt_byss,3)/1;
                var bn=qwfformatter(data.jyzt_bnljss,3)/1;
                $scope.jyzt_brss=br; //本日实收
                $scope.jyzt_byys=by+br; //本月实收
                $scope.jyzt_bnljss=bn+by+br; //本年实收
            }

            $scope.$watch('jyzt_byys', function (newValue, oldValue, scope) {
                // console.log(newValue);
                // console.log(oldValue);
                var startVal = oldValue;
                var endVal = newValue;
                var duration = 2;
                var decimals=2;
                var numAnim = new CountUp("jyzt_byys",startVal,endVal,decimals, duration);
                numAnim.start();
            });
            $scope.$watch('jyzt_bnljss', function (newValue, oldValue, scope) {
                // console.log(newValue);
                // console.log(oldValue);
                var startVal = oldValue;
                var endVal = newValue;
                var duration = 2;
                var decimals=2;
                var numAnim = new CountUp("jyzt_bnljss",startVal,endVal,decimals, duration);
                numAnim.start();
            });
            $scope.$watch('jyzt_brss', function (newValue, oldValue, scope) {
                // console.log(newValue);
                // console.log(oldValue);
                var startVal = oldValue;
                var endVal = newValue;
                var duration = 2;
                var decimals=2;
                var numAnim = new CountUp("jyzt_brss",startVal,endVal,decimals, duration);
                numAnim.start();
            });

        };
        getWySjlSS_res();
        //各大指标
        var getwySjl=function () {
            var res={
                "status": 1001,
                "data": [
                    {
                        "collect_fcds": "46900.05143",
                        "collect_kzf": "3356.63382",
                        "collect_qt": "6139.68903",
                        "collect_sk": "13853.29257",
                        "collect_xjsk": "6284.52853",
                        "collect_yhts": "39484.78962",
                        "cw_fww": "2935.6915",
                        "cw_lstcf": "4830.13331",
                        "cw_sl": "47.8222",
                        "cw_sr": "15873.87169",
                        "cw_syf": "1934.25675",
                        "cw_wyf": "6173.79013",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "mbsjl": "95",
                        "mbyslsjl": "93",
                        "ncwnqf": "25859.66705",
                        "sjje": "152831.86567",
                        "sjl": "90.06",
                        "yslsjl": "90.53",
                        "zjje": "11319.65051",
                        "zjl": "43.77"
                    }
                ]
            }
            var data= res.data[0];

            $scope.sjje=qwfformatter(data.sjje,1);  //收缴金额
            $scope.sjl=data.sjl;   //收缴率
            $scope.sjmb=data.mbsjl; //目标收缴率
            $scope.yslsjje=qwfformatter(data.yslsjje,1); //已收楼收缴金额
            $scope.yslsjl=data.yslsjl;  //已收楼收缴率
            $scope.mbyslsjl=data.mbyslsjl;  //目标已收楼收缴率
            $scope.zjje=qwfformatter(data.zjje,1);  //追缴金额
            $scope.zjl=data.zjl; //追缴率
            $scope.ncwnqf=qwfformatter(data.ncwnqf,1); //年初往年欠费
            $scope.cwsl=qwfformatter(data.cw_sl,1); //车位数量
            $scope.cwsr=qwfformatter(data.cw_sr,1); //车位收入
            $scope.cwwyf=qwfformatter(data.cw_wyf,1);  //车位物业费
            $scope.cwfwf=qwfformatter(data.cw_fww,1);  //车位服务费
            $scope.cwsyf=qwfformatter(data.cw_syf,1);  //车费使用费
            $scope.cwlstcf=qwfformatter(data.cw_lstcf,1);  //临时停车费

            $scope.collect_fcds=qwfformatter(data.collect_fcds,2);  // 收款-房产代收
            $scope.collect_qt=qwfformatter(data.collect_qt,2);  //收款-其他
            $scope.collect_xjsk=qwfformatter(data.collect_xjsk,2);  //收款-现金收款
            $scope.collect_yhts=qwfformatter(data.collect_yhts,2);  //收款-银行托收
            $scope.collect_kzf=qwfformatter(data.collect_kzf,2);  //收款-空置房
            $scope.collect_sk=qwfformatter(data.collect_sk,2);  //收款-收款
            piecharts();
        };
        getwySjl();
        //地图指标
        var getwySjlDT=function () {
            var res ={
                "status": 1001,
                "data": [
                    {
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "lat": "25.88144",
                        "lng": "114.36251",
                        "province": "莞深区域",
                        "sjje": "4454.38082"
                    },
                    {
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "lat": "23.7656",
                        "lng": "115.75971",
                        "province": "粤东区域",
                        "sjje": "4645.13433"
                    },
                    {
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "lat": "31.78778",
                        "lng": "116.97947",
                        "province": "安徽区域",
                        "sjje": "5302.23406"
                    },
                    {
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "lat": "23.65867",
                        "lng": "112.2251",
                        "province": "江中区域",
                        "sjje": "9082.62523"
                    },
                    {
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "lat": "25.15587",
                        "lng": "113.63786",
                        "province": "粤北区域",
                        "sjje": "5742.45806"
                    },
                    {
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "lat": "23.51477",
                        "lng": "114.66494",
                        "province": "惠深区域",
                        "sjje": "6359.91087"
                    },
                    {
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "lat": "23.02825",
                        "lng": "113.11636",
                        "province": "佛山区域",
                        "sjje": "7870.8904"
                    },
                    {
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "lat": "43.92962",
                        "lng": "125.29499",
                        "province": "东北区域",
                        "sjje": "4080.408"
                    },
                    {
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "lat": "22.80942",
                        "lng": "113.30198",
                        "province": "顺碧区域",
                        "sjje": "5382.32645"
                    },
                    {
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "lat": "30.59752",
                        "lng": "114.31024",
                        "province": "武汉区域",
                        "sjje": "3578.24338"
                    },
                    {
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "lat": "29.122",
                        "lng": "120.01349",
                        "province": "浙江区域",
                        "sjje": "1206.42525"
                    },
                    {
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "lat": "32.20524",
                        "lng": "120.36245",
                        "province": "沪苏区域",
                        "sjje": "3195.19755"
                    },
                    {
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "lat": "23.06194",
                        "lng": "112.46503",
                        "province": "肇庆区域",
                        "sjje": "3188.22407"
                    },
                    {
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "lat": "28.25319",
                        "lng": "113.08752",
                        "province": "长沙区域",
                        "sjje": "3174.17659"
                    },
                    {
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "lat": "32.31274",
                        "lng": "118.7206",
                        "province": "江苏区域",
                        "sjje": "2820.28801"
                    },
                    {
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "lat": "36.39087",
                        "lng": "118.74555",
                        "province": "山东区域",
                        "sjje": "2415.81308"
                    },
                    {
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "lat": "32.06568",
                        "lng": "118.80333",
                        "province": "南京区域",
                        "sjje": "2024.50945"
                    },
                    {
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "lat": "30.77212",
                        "lng": "113.54075",
                        "province": "湖北区域",
                        "sjje": "1613.63193"
                    },
                    {
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "lat": "25.5075",
                        "lng": "118.43218",
                        "province": "福建区域",
                        "sjje": "1598.01524"
                    },
                    {
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "lat": "27.88226",
                        "lng": "112.27904",
                        "province": "湖南区域",
                        "sjje": "1447.33341"
                    },
                    {
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "lat": "23.26338",
                        "lng": "113.81292",
                        "province": "增城区域",
                        "sjje": "10732.01055"
                    },
                    {
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "lat": "22.96797",
                        "lng": "111.64224",
                        "province": "粤西区域",
                        "sjje": "3422.12899"
                    },
                    {
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "lat": "24.29177",
                        "lng": "113.69229",
                        "province": "广清区域",
                        "sjje": "12469.48828"
                    },
                    {
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "lat": "30.77338",
                        "lng": "120.8959",
                        "province": "沪浙区域",
                        "sjje": "128.08294"
                    },
                    {
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "lat": "31.32635",
                        "lng": "120.58433",
                        "province": "苏州区域",
                        "sjje": "0"
                    },
                    {
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "lat": "30.26085",
                        "lng": "104.9085",
                        "province": "四川区域",
                        "sjje": "1064.49818"
                    },
                    {
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "lat": "31.40626",
                        "lng": "110.43105",
                        "province": "重庆区域",
                        "sjje": "981.05846"
                    },
                    {
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "lat": "23.15676",
                        "lng": "109.29286",
                        "province": "广西区域",
                        "sjje": "973.45917"
                    },
                    {
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "lat": "27.28024",
                        "lng": "115.23904",
                        "province": "江西区域",
                        "sjje": "855.03735"
                    },
                    {
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "lat": "27.73431",
                        "lng": "106.93729",
                        "province": "遵义城市公司",
                        "sjje": "793.27466"
                    },
                    {
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "lat": "36.39878",
                        "lng": "103.67696",
                        "province": "西北区域",
                        "sjje": "697.17185"
                    },
                    {
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "lat": "38.93453",
                        "lng": "117.55867",
                        "province": "天津区域",
                        "sjje": "678.44814"
                    },
                    {
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "lat": "35.25043",
                        "lng": "114.00708",
                        "province": "河南区域",
                        "sjje": "631.26114"
                    },
                    {
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "lat": "21.08738",
                        "lng": "110.68362",
                        "province": "海南区域",
                        "sjje": "616.78283"
                    },
                    {
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "lat": "44.01457",
                        "lng": "119.25982",
                        "province": "内蒙区域",
                        "sjje": "587.16459"
                    },
                    {
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "lat": "30.50582",
                        "lng": "114.39704",
                        "province": "清能碧桂园",
                        "sjje": "433.82016"
                    },
                    {
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "lat": "37.6344",
                        "lng": "114.77883",
                        "province": "河北区域",
                        "sjje": "278.87027"
                    },
                    {
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "lat": "25.08216",
                        "lng": "102.42761",
                        "province": "云南区域",
                        "sjje": "205.0317"
                    },
                    {
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "province": "重庆金阳",
                        "sjje": "74.30261"
                    },
                    {
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "province": "衡水城市公司",
                        "sjje": "44.946"
                    },
                    {
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "lat": "37.8807",
                        "lng": "112.55407",
                        "province": "山西区域",
                        "sjje": "33.34898"
                    },
                    {
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "lat": "22.5908",
                        "lng": "114.08407",
                        "province": "深圳区域",
                        "sjje": "32.5026"
                    },
                    {
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "lat": "34.60952",
                        "lng": "109.32356",
                        "province": "陕西区域",
                        "sjje": "32.35225"
                    },
                    {
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "lat": "39.76306",
                        "lng": "116.51027",
                        "province": "北京区域",
                        "sjje": "22.10964"
                    },
                    {
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "lat": "34.50622",
                        "lng": "109.51705",
                        "province": "韩城公司",
                        "sjje": "18.74877"
                    },
                    {
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "lat": "31.25472",
                        "lng": "121.6346",
                        "province": "上海区域",
                        "sjje": "0"
                    },
                    {
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "lat": "29.86252",
                        "lng": "121.61593",
                        "province": "宁波区域",
                        "sjje": "0"
                    },
                    {
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "lat": "27.70856",
                        "lng": "107.21507",
                        "province": "贵州区域",
                        "sjje": "1030.85874"
                    }
                ]
            }
            if(!res ||res ==null ||res.data.length<1){
                return   mapcharts();
            } else{
                var data=res.data;
                for(var i=0;i<data.length;i++){
                    var obj={
                        name: "顺碧区域",
                        value:5167,
                        coord:[113.30198,22.80942]
                    }
                    obj.name=data[i].province;
                    obj.value=[data[i].lng,data[i].lat,data[i].sjje];
                    $scope.DITUSJ.push(obj);

                }

                $scope.DITUSJ.sort(function (a,b) {
                    // return qwfformatter((b.value[2]- a.value[2]),1);
                    return  b.value[2]- a.value[2] ;
                });
                console.log($scope.DITUSJ);
                mapcharts();
            }
        };
        getwySjlDT();
        //排名表格
        var getwySjlPM=function(){
            //console.log("排名表格");
            //console.log(res)
            var res={
                "status": 1001,
                "data": [
                    {
                        "areaname": "河北区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "99.42",
                        "lx": "SJ",
                        "pm": "1",
                        "pmbd": "0",
                        "ys": "99.24",
                        "ysws": "38.78",
                        "zh": "99.04"
                    },
                    {
                        "areaname": "沪浙区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "0",
                        "lx": "ZJ",
                        "pm": "1",
                        "pmbd": "0",
                        "ys": "73.42",
                        "ysws": "0",
                        "zh": "72.72"
                    },
                    {
                        "areaname": "莞深区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "82.67",
                        "lx": "SJ",
                        "pm": "2",
                        "pmbd": "0",
                        "ys": "97.65",
                        "ysws": "76.32",
                        "zh": "97.38"
                    },
                    {
                        "areaname": "河北区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "0",
                        "lx": "ZJ",
                        "pm": "2",
                        "pmbd": "0",
                        "ys": "65.93",
                        "ysws": "0",
                        "zh": "65.93"
                    },
                    {
                        "areaname": "粤北区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "98.63",
                        "lx": "SJ",
                        "pm": "3",
                        "pmbd": "0",
                        "ys": "97.28",
                        "ysws": "62.2",
                        "zh": "97.31"
                    },
                    {
                        "areaname": "福建区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "94.87",
                        "lx": "ZJ",
                        "pm": "3",
                        "pmbd": "0",
                        "ys": "62.01",
                        "ysws": "77.27",
                        "zh": "65.56"
                    },
                    {
                        "areaname": "惠深区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "92.23",
                        "lx": "SJ",
                        "pm": "4",
                        "pmbd": "-1",
                        "ys": "97.2",
                        "ysws": "50.27",
                        "zh": "96.98"
                    },
                    {
                        "areaname": "粤东区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "100",
                        "lx": "ZJ",
                        "pm": "4",
                        "pmbd": "0",
                        "ys": "62.73",
                        "ysws": "68.18",
                        "zh": "64.96"
                    },
                    {
                        "areaname": "粤东区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "92.68",
                        "lx": "SJ",
                        "pm": "5",
                        "pmbd": "1",
                        "ys": "97.08",
                        "ysws": "66.47",
                        "zh": "96.89"
                    },
                    {
                        "areaname": "海南区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "100",
                        "lx": "ZJ",
                        "pm": "5",
                        "pmbd": "0",
                        "ys": "56.38",
                        "ysws": "67.37",
                        "zh": "59.95"
                    },
                    {
                        "areaname": "增城区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "84.05",
                        "lx": "SJ",
                        "pm": "6",
                        "pmbd": "0",
                        "ys": "97.08",
                        "ysws": "82.51",
                        "zh": "96.5"
                    },
                    {
                        "areaname": "莞深区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "100",
                        "lx": "ZJ",
                        "pm": "6",
                        "pmbd": "0",
                        "ys": "57.23",
                        "ysws": "59.21",
                        "zh": "58.69"
                    },
                    {
                        "areaname": "顺碧区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "84.75",
                        "lx": "SJ",
                        "pm": "7",
                        "pmbd": "0",
                        "ys": "96.46",
                        "ysws": "64.08",
                        "zh": "96.31"
                    },
                    {
                        "areaname": "惠深区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "35.02",
                        "lx": "ZJ",
                        "pm": "7",
                        "pmbd": "-7",
                        "ys": "45.04",
                        "ysws": "75.99",
                        "zh": "58.6"
                    },
                    {
                        "areaname": "广清区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "92.73",
                        "lx": "SJ",
                        "pm": "8",
                        "pmbd": "0",
                        "ys": "96.42",
                        "ysws": "53.49",
                        "zh": "96.14"
                    },
                    {
                        "areaname": "江西区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "65.63",
                        "lx": "ZJ",
                        "pm": "8",
                        "pmbd": "1",
                        "ys": "56.72",
                        "ysws": "90.28",
                        "zh": "58.26"
                    },
                    {
                        "areaname": "山西区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "100",
                        "lx": "SJ",
                        "pm": "9",
                        "pmbd": "0",
                        "ys": "92.21",
                        "ysws": "51.45",
                        "zh": "96.01"
                    },
                    {
                        "areaname": "贵州区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "0",
                        "lx": "ZJ",
                        "pm": "9",
                        "pmbd": "0",
                        "ys": "57.68",
                        "ysws": "58.76",
                        "zh": "57.79"
                    },
                    {
                        "areaname": "江中区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "75.95",
                        "lx": "SJ",
                        "pm": "10",
                        "pmbd": "0",
                        "ys": "96.34",
                        "ysws": "59.52",
                        "zh": "95.92"
                    },
                    {
                        "areaname": "粤西区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "100",
                        "lx": "ZJ",
                        "pm": "10",
                        "pmbd": "2",
                        "ys": "39.87",
                        "ysws": "56.31",
                        "zh": "57.52"
                    },
                    {
                        "areaname": "佛山区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "87.08",
                        "lx": "SJ",
                        "pm": "11",
                        "pmbd": "-1",
                        "ys": "96.44",
                        "ysws": "62.93",
                        "zh": "95.86"
                    },
                    {
                        "areaname": "增城区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "99.83",
                        "lx": "ZJ",
                        "pm": "11",
                        "pmbd": "1",
                        "ys": "43.38",
                        "ysws": "60.81",
                        "zh": "57.44"
                    },
                    {
                        "areaname": "粤西区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "87.73",
                        "lx": "SJ",
                        "pm": "12",
                        "pmbd": "1",
                        "ys": "95.96",
                        "ysws": "75.29",
                        "zh": "95.57"
                    },
                    {
                        "areaname": "云南区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "100",
                        "lx": "ZJ",
                        "pm": "12",
                        "pmbd": "0",
                        "ys": "57.12",
                        "ysws": "49.98",
                        "zh": "57.38"
                    },
                    {
                        "areaname": "河南区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "99.11",
                        "lx": "SJ",
                        "pm": "13",
                        "pmbd": "0",
                        "ys": "94.27",
                        "ysws": "47.96",
                        "zh": "95.19"
                    },
                    {
                        "areaname": "河南区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "96.09",
                        "lx": "ZJ",
                        "pm": "13",
                        "pmbd": "2",
                        "ys": "54.53",
                        "ysws": "81.48",
                        "zh": "56.54"
                    },
                    {
                        "areaname": "肇庆区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "70.63",
                        "lx": "SJ",
                        "pm": "14",
                        "pmbd": "0",
                        "ys": "96.1",
                        "ysws": "54.16",
                        "zh": "94.64"
                    },
                    {
                        "areaname": "浙江区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "100",
                        "lx": "ZJ",
                        "pm": "14",
                        "pmbd": "1",
                        "ys": "49.66",
                        "ysws": "71.64",
                        "zh": "56.37"
                    },
                    {
                        "areaname": "江西区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "81.31",
                        "lx": "SJ",
                        "pm": "15",
                        "pmbd": "0",
                        "ys": "97.34",
                        "ysws": "65",
                        "zh": "94.3"
                    },
                    {
                        "areaname": "安徽区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "68.02",
                        "lx": "ZJ",
                        "pm": "15",
                        "pmbd": "0",
                        "ys": "52.24",
                        "ysws": "57.94",
                        "zh": "55.04"
                    },
                    {
                        "areaname": "云南区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "89.59",
                        "lx": "SJ",
                        "pm": "16",
                        "pmbd": "0",
                        "ys": "94.95",
                        "ysws": "38.05",
                        "zh": "93.85"
                    },
                    {
                        "areaname": "山西区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "0",
                        "lx": "ZJ",
                        "pm": "16",
                        "pmbd": "0",
                        "ys": "53.52",
                        "ysws": "0",
                        "zh": "53.52"
                    },
                    {
                        "areaname": "福建区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "91.42",
                        "lx": "SJ",
                        "pm": "17",
                        "pmbd": "0",
                        "ys": "94.33",
                        "ysws": "56.53",
                        "zh": "93.81"
                    },
                    {
                        "areaname": "江苏区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "56.49",
                        "lx": "ZJ",
                        "pm": "17",
                        "pmbd": "0",
                        "ys": "46.92",
                        "ysws": "70.14",
                        "zh": "52.93"
                    },
                    {
                        "areaname": "浙江区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "92.47",
                        "lx": "SJ",
                        "pm": "18",
                        "pmbd": "-1",
                        "ys": "93.88",
                        "ysws": "53.97",
                        "zh": "93.66"
                    },
                    {
                        "areaname": "南京区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "0",
                        "lx": "ZJ",
                        "pm": "18",
                        "pmbd": "0",
                        "ys": "48.66",
                        "ysws": "51.88",
                        "zh": "50.06"
                    },
                    {
                        "areaname": "江苏区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "92.52",
                        "lx": "SJ",
                        "pm": "19",
                        "pmbd": "1",
                        "ys": "93.83",
                        "ysws": "58.99",
                        "zh": "93.48"
                    },
                    {
                        "areaname": "广清区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "61.05",
                        "lx": "ZJ",
                        "pm": "19",
                        "pmbd": "0",
                        "ys": "49.04",
                        "ysws": "51.62",
                        "zh": "49.66"
                    },
                    {
                        "areaname": "广西区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "89.23",
                        "lx": "SJ",
                        "pm": "20",
                        "pmbd": "0",
                        "ys": "92.87",
                        "ysws": "50.35",
                        "zh": "92.51"
                    },
                    {
                        "areaname": "重庆区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "19.07",
                        "lx": "ZJ",
                        "pm": "20",
                        "pmbd": "0",
                        "ys": "53.69",
                        "ysws": "48.01",
                        "zh": "48.44"
                    },
                    {
                        "areaname": "海南区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "88.11",
                        "lx": "SJ",
                        "pm": "21",
                        "pmbd": "-1",
                        "ys": "92.38",
                        "ysws": "41.24",
                        "zh": "92.18"
                    },
                    {
                        "areaname": "山东区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "0",
                        "lx": "ZJ",
                        "pm": "21",
                        "pmbd": "0",
                        "ys": "44.75",
                        "ysws": "56.9",
                        "zh": "47.23"
                    },
                    {
                        "areaname": "山东区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "92.78",
                        "lx": "SJ",
                        "pm": "22",
                        "pmbd": "1",
                        "ys": "91.51",
                        "ysws": "53.83",
                        "zh": "91.34"
                    },
                    {
                        "areaname": "湖北区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "95.93",
                        "lx": "ZJ",
                        "pm": "22",
                        "pmbd": "0",
                        "ys": "42.42",
                        "ysws": "55.93",
                        "zh": "47.04"
                    },
                    {
                        "areaname": "北京区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "100",
                        "lx": "SJ",
                        "pm": "23",
                        "pmbd": "0",
                        "ys": "90.07",
                        "ysws": "33.99",
                        "zh": "90.2"
                    },
                    {
                        "areaname": "佛山区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "100",
                        "lx": "ZJ",
                        "pm": "23",
                        "pmbd": "0",
                        "ys": "47.17",
                        "ysws": "45.8",
                        "zh": "46.45"
                    },
                    {
                        "areaname": "沪苏区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "96.04",
                        "lx": "SJ",
                        "pm": "24",
                        "pmbd": "0",
                        "ys": "87.86",
                        "ysws": "51.4",
                        "zh": "89.08"
                    },
                    {
                        "areaname": "粤北区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "99.13",
                        "lx": "ZJ",
                        "pm": "24",
                        "pmbd": "-1",
                        "ys": "46.37",
                        "ysws": "38.8",
                        "zh": "46.16"
                    },
                    {
                        "areaname": "安徽区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "95.73",
                        "lx": "SJ",
                        "pm": "25",
                        "pmbd": "0",
                        "ys": "85.89",
                        "ysws": "46.23",
                        "zh": "86.28"
                    },
                    {
                        "areaname": "广西区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "100",
                        "lx": "ZJ",
                        "pm": "25",
                        "pmbd": "1",
                        "ys": "45.86",
                        "ysws": "45.05",
                        "zh": "45.89"
                    },
                    {
                        "areaname": "沪浙区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "45.32",
                        "lx": "SJ",
                        "pm": "26",
                        "pmbd": "-2",
                        "ys": "96.51",
                        "ysws": "55.04",
                        "zh": "85.86"
                    },
                    {
                        "areaname": "江中区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "97.79",
                        "lx": "ZJ",
                        "pm": "26",
                        "pmbd": "0",
                        "ys": "39.11",
                        "ysws": "52.96",
                        "zh": "45.4"
                    },
                    {
                        "areaname": "南京区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "87.78",
                        "lx": "SJ",
                        "pm": "27",
                        "pmbd": "1",
                        "ys": "85.4",
                        "ysws": "58.89",
                        "zh": "85.66"
                    },
                    {
                        "areaname": "东北区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "89.92",
                        "lx": "ZJ",
                        "pm": "27",
                        "pmbd": "-1",
                        "ys": "30.3",
                        "ysws": "47.27",
                        "zh": "43.53"
                    },
                    {
                        "areaname": "湖北区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "92.4",
                        "lx": "SJ",
                        "pm": "28",
                        "pmbd": "1",
                        "ys": "84.57",
                        "ysws": "36.58",
                        "zh": "85.08"
                    },
                    {
                        "areaname": "韩城公司",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "0",
                        "lx": "ZJ",
                        "pm": "28",
                        "pmbd": "1",
                        "ys": "97.58",
                        "ysws": "20.93",
                        "zh": "43.52"
                    },
                    {
                        "areaname": "贵州区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "96.61",
                        "lx": "SJ",
                        "pm": "29",
                        "pmbd": "0",
                        "ys": "82.84",
                        "ysws": "45.2",
                        "zh": "84.26"
                    },
                    {
                        "areaname": "肇庆区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "90.55",
                        "lx": "ZJ",
                        "pm": "29",
                        "pmbd": "0",
                        "ys": "33.2",
                        "ysws": "67.49",
                        "zh": "42.24"
                    },
                    {
                        "areaname": "深圳区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "0",
                        "lx": "SJ",
                        "pm": "30",
                        "pmbd": "-2",
                        "ys": "81.72",
                        "ysws": "0",
                        "zh": "81.71"
                    },
                    {
                        "areaname": "清能碧桂园",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "100",
                        "lx": "ZJ",
                        "pm": "30",
                        "pmbd": "0",
                        "ys": "31.97",
                        "ysws": "52.01",
                        "zh": "41.01"
                    },
                    {
                        "areaname": "陕西区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "74.05",
                        "lx": "SJ",
                        "pm": "31",
                        "pmbd": "1",
                        "ys": "88",
                        "ysws": "86.3",
                        "zh": "81.1"
                    },
                    {
                        "areaname": "顺碧区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "99.79",
                        "lx": "ZJ",
                        "pm": "31",
                        "pmbd": "0",
                        "ys": "44.05",
                        "ysws": "37.42",
                        "zh": "40.84"
                    },
                    {
                        "areaname": "韩城公司",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "0",
                        "lx": "SJ",
                        "pm": "32",
                        "pmbd": "1",
                        "ys": "81.01",
                        "ysws": "88.94",
                        "zh": "81.01"
                    },
                    {
                        "areaname": "沪苏区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "98.54",
                        "lx": "ZJ",
                        "pm": "32",
                        "pmbd": "0",
                        "ys": "33.53",
                        "ysws": "57.17",
                        "zh": "39.97"
                    },
                    {
                        "areaname": "遵义城市公司",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "84.64",
                        "lx": "SJ",
                        "pm": "33",
                        "pmbd": "0",
                        "ys": "79.24",
                        "ysws": "68.55",
                        "zh": "79.45"
                    },
                    {
                        "areaname": "西北区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": ".03",
                        "lx": "ZJ",
                        "pm": "33",
                        "pmbd": "0",
                        "ys": "33.33",
                        "ysws": "40",
                        "zh": "34.66"
                    },
                    {
                        "areaname": "东北区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "67.39",
                        "lx": "SJ",
                        "pm": "34",
                        "pmbd": "0",
                        "ys": "80.35",
                        "ysws": "58.72",
                        "zh": "78.36"
                    },
                    {
                        "areaname": "内蒙区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "86.12",
                        "lx": "ZJ",
                        "pm": "34",
                        "pmbd": "0",
                        "ys": "26.23",
                        "ysws": "35.17",
                        "zh": "34.47"
                    },
                    {
                        "areaname": "天津区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "96.78",
                        "lx": "SJ",
                        "pm": "35",
                        "pmbd": "0",
                        "ys": "77.33",
                        "ysws": "31.34",
                        "zh": "77.63"
                    },
                    {
                        "areaname": "长沙区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "42.81",
                        "lx": "ZJ",
                        "pm": "35",
                        "pmbd": "0",
                        "ys": "28.64",
                        "ysws": "37.82",
                        "zh": "33.5"
                    },
                    {
                        "areaname": "湖南区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "72.78",
                        "lx": "SJ",
                        "pm": "36",
                        "pmbd": "0",
                        "ys": "77.33",
                        "ysws": "56.14",
                        "zh": "77"
                    },
                    {
                        "areaname": "天津区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "100",
                        "lx": "ZJ",
                        "pm": "36",
                        "pmbd": "0",
                        "ys": "41.03",
                        "ysws": "31.29",
                        "zh": "32.65"
                    },
                    {
                        "areaname": "武汉区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "94.13",
                        "lx": "SJ",
                        "pm": "37",
                        "pmbd": "0",
                        "ys": "75.33",
                        "ysws": "32.14",
                        "zh": "76.01"
                    },
                    {
                        "areaname": "湖南区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "0",
                        "lx": "ZJ",
                        "pm": "37",
                        "pmbd": "0",
                        "ys": "23.91",
                        "ysws": "47.55",
                        "zh": "32.05"
                    },
                    {
                        "areaname": "重庆区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "65",
                        "lx": "SJ",
                        "pm": "38",
                        "pmbd": "0",
                        "ys": "77.3",
                        "ysws": "40.72",
                        "zh": "75.7"
                    },
                    {
                        "areaname": "北京区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "0",
                        "lx": "ZJ",
                        "pm": "38",
                        "pmbd": "0",
                        "ys": "31.7",
                        "ysws": "0",
                        "zh": "31.7"
                    },
                    {
                        "areaname": "四川区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "73.86",
                        "lx": "SJ",
                        "pm": "39",
                        "pmbd": "0",
                        "ys": "73.86",
                        "ysws": "37.96",
                        "zh": "73.81"
                    },
                    {
                        "areaname": "武汉区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "68.21",
                        "lx": "ZJ",
                        "pm": "39",
                        "pmbd": "0",
                        "ys": "26.54",
                        "ysws": "41.49",
                        "zh": "31.01"
                    },
                    {
                        "areaname": "西北区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "90.45",
                        "lx": "SJ",
                        "pm": "40",
                        "pmbd": "0",
                        "ys": "69.65",
                        "ysws": "41.37",
                        "zh": "72.02"
                    },
                    {
                        "areaname": "四川区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "0",
                        "lx": "ZJ",
                        "pm": "40",
                        "pmbd": "0",
                        "ys": "35.31",
                        "ysws": "19.79",
                        "zh": "29.52"
                    },
                    {
                        "areaname": "长沙区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "87.2",
                        "lx": "SJ",
                        "pm": "41",
                        "pmbd": "0",
                        "ys": "68.93",
                        "ysws": "43.8",
                        "zh": "70.27"
                    },
                    {
                        "areaname": "重庆金阳",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "0",
                        "lx": "ZJ",
                        "pm": "41",
                        "pmbd": "0",
                        "ys": ".19",
                        "ysws": ".96",
                        "zh": ".8"
                    },
                    {
                        "areaname": "清能碧桂园",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "31.65",
                        "lx": "SJ",
                        "pm": "42",
                        "pmbd": "0",
                        "ys": "67.09",
                        "ysws": "73.16",
                        "zh": "67.44"
                    },
                    {
                        "areaname": "遵义城市公司",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "0",
                        "lx": "ZJ",
                        "pm": "42",
                        "pmbd": "-5",
                        "ys": "0",
                        "ysws": "0",
                        "zh": "0"
                    },
                    {
                        "areaname": "衡水城市公司",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "0",
                        "lx": "SJ",
                        "pm": "43",
                        "pmbd": "0",
                        "ys": "61.58",
                        "ysws": "0",
                        "zh": "61.58"
                    },
                    {
                        "areaname": "深圳区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "0",
                        "lx": "ZJ",
                        "pm": "43",
                        "pmbd": "-2",
                        "ys": "0",
                        "ysws": "0",
                        "zh": "0"
                    },
                    {
                        "areaname": "内蒙区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "70.45",
                        "lx": "SJ",
                        "pm": "44",
                        "pmbd": "0",
                        "ys": "56.33",
                        "ysws": "52.43",
                        "zh": "58.47"
                    },
                    {
                        "areaname": "陕西区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "0",
                        "lx": "ZJ",
                        "pm": "44",
                        "pmbd": "-2",
                        "ys": "0",
                        "ysws": "0",
                        "zh": "0"
                    },
                    {
                        "areaname": "重庆金阳",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "0",
                        "lx": "SJ",
                        "pm": "45",
                        "pmbd": "0",
                        "ys": "26.43",
                        "ysws": "18.11",
                        "zh": "24.8"
                    },
                    {
                        "areaname": "衡水城市公司",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "0",
                        "lx": "ZJ",
                        "pm": "45",
                        "pmbd": "1",
                        "ys": "0",
                        "ysws": "0",
                        "zh": "0"
                    },
                    {
                        "areaname": "宁波区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "0",
                        "lx": "SJ",
                        "pm": "46",
                        "pmbd": "0",
                        "ys": "0",
                        "ysws": "0",
                        "zh": "0"
                    },
                    {
                        "areaname": "宁波区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "0",
                        "lx": "ZJ",
                        "pm": "46",
                        "pmbd": "4",
                        "ys": "0",
                        "ysws": "0",
                        "zh": "0"
                    },
                    {
                        "areaname": "上海区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "0",
                        "lx": "SJ",
                        "pm": "47",
                        "pmbd": "0",
                        "ys": "0",
                        "ysws": "0",
                        "zh": "0"
                    },
                    {
                        "areaname": "苏州区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "0",
                        "lx": "ZJ",
                        "pm": "47",
                        "pmbd": "4",
                        "ys": "0",
                        "ysws": "0",
                        "zh": "0"
                    },
                    {
                        "areaname": "上海区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "0",
                        "lx": "ZJ",
                        "pm": "48",
                        "pmbd": "0",
                        "ys": "0",
                        "ysws": "0",
                        "zh": "0"
                    },
                    {
                        "areaname": "苏州区域",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "kz": "0",
                        "lx": "SJ",
                        "pm": "48",
                        "pmbd": "0",
                        "ys": "0",
                        "ysws": "0",
                        "zh": "0"
                    }
                ]
            }
            var data=res.data;
            if(!res || res ==null || res.data.length<1){
                return;
            }else{
                $scope.ZJSJ=[]; //收缴数据
                $scope.SJSJ=[]; //收缴数据
                var arr1=[];
                var arr2=[];
                for(var i=0;i<data.length;i++){
                    if(data[i].lx=='SJ'  ){
                        arr1.push(data[i]);
                    }else if(data[i].lx=='ZJ' ){
                        arr2.push(data[i]);
                    }
                }
                if( $scope.bfives){
                    //前五
                    arr1=arr1.slice(0,5);
                    arr2=arr2.slice(0,5);

                }else{
                    //后五
                    arr1=arr1.slice(-5);
                    arr2=arr2.slice(-5);
                }

                for(var i=0;i<arr1.length;i++){
                    var obj1={};
                    obj1.areaname=arr1[i].areaname;
                    obj1.pmqk=arr1[i].pm;
                    obj1.pmbd=arr1[i].pmbd;
                    obj1.ys=arr1[i].ys;
                    obj1.ysws=arr1[i].ysws;
                    obj1.kz=arr1[i].kz;
                    obj1.zh=arr1[i].zh;
                    $scope.SJSJ.push(obj1);
                }
                for(var j=0;j<arr2.length;j++){
                    var obj2={};
                    obj2.areaname=arr2[j].areaname;
                    obj2.pmqk=arr2[j].pm;
                    obj2.pmbd=arr2[j].pmbd;
                    obj2.ys=arr2[j].ys;
                    obj2.ysws=arr2[j].ysws;
                    obj2.kz=arr2[j].kz;
                    obj2.zh=arr2[j].zh;
                    $scope.ZJSJ.push(obj2);
                }

                //console.log( $scope.SJSJ);
                //console.log( $scope.ZJSJ);

            }
        };
        getwySjlPM();


        //表格颜色
        $scope.tbclass=function (a) {
            if(a==0){
                return  "color1";
            } else if(a<0){
                return  "color3";
            }else if(a>0){
                return  "color4";
            }
        };



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
                        }
                    }
                });
            });
        }
        myCity.get(myFun);

        var now= new Date();//现在时刻
        var year= now.getFullYear();//现在时刻
        var month=now.getMonth()+1;//月;
        var day=now.getDate(); //日;
        var show_day=new Array('星期日','星期一','星期二','星期三','星期四','星期五','星期六');
        var reloadTime = 0;
        $scope.rq=year+"年"+month+"月"+day+"日";
        $scope.day=show_day[now.getDay()];


        //初始化股票数据
        $scope.openprice = 0;		//开盘价
        $scope.maxprice = 0;		//最高价
        $scope.currentprice = 0;	//当前价
        $scope.volume = 0;			//成交量
        //获取股票数据
        var getgupiao = function(){
            mainService.getgupiao(pflag,paramArr).then(function(res){
                //console.log(res);
                if(!res ||res ==null){

                }else if(res.Sharedata.length<1){

                }else{
                    $scope.openprice = (res.Sharedata[0].openprice/1).toFixed(3);		//开盘价
                    $scope.maxprice = (res.Sharedata[0].maxprice/1).toFixed(3);		//最高价
                    $scope.currentprice = (res.Sharedata[0].currentprice/1).toFixed(3);	//当前价
                    $scope.volume = res.Sharedata[0].volume;			//成交量
                }
            });
        }
        getgupiao();
        //股票定时刷新(每30s刷新一次)
        var setIn_3=setInterval(function(){
            getgupiao();
        }, 30000);


        //三大指标 20秒刷新一次
        var setIn_1=setInterval(function(){
            //三大指标

            $scope.jyzt_brss= $scope.jyzt_brss+10; //本日实收
            $scope.jyzt_byys=$scope.jyzt_byys+$scope.jyzt_brss; //本月实收
            $scope.jyzt_bnljss=+$scope.jyzt_byys; //本年实收
            $scope.$digest();
        },20000);

        //表格数据 10秒刷新一次
        $scope.sjpm="前五";
        $scope.zjpm="前五";
        var setIn_2=setInterval(function(){
            if($rootScope.loginflag) {
                if ($scope.sjpm == "前五") {
                    $scope.sjpm = "后五";
                    $scope.zjpm = "后五";
                    $scope.bfives = false;
                    getwySjlPM();
                } else {
                    $scope.sjpm = "前五";
                    $scope.zjpm = "前五";
                    $scope.bfives = true;
                    getwySjlPM();
                }
            }
            $scope.$digest();    //这个换成$apply即可

        }, 10000);

        //跳转地图详细数据页面
        $scope.gopcm3=function(){
            $state.go("pcm3");
            $rootScope.clearste();
        };
        //跳转第二版大屏页面
        $scope.qiehuan=function(){
            $rootScope.clearste();
            $state.go("pcm2");
        };



        //清除定时器
        $rootScope.clearste  = function () {
            window.clearInterval(setIn_1); //三大指标
            window.clearInterval(setIn_2); //数据表格切换
            window.clearInterval(setIn_3); //股票
            window.clearInterval($rootScope.setIn_1); //切换页面
            window.clearInterval(setIn_5); //饼图轮播
            window.clearInterval(setIn_6); //地图轮播
        };


        //注销
        $scope.cancel = function(){
            var mymessage=confirm("确定注销？");
            if(mymessage==true){
                localStorage.setItem('login',false);
                localStorage.setItem('user',null);
                localStorage.setItem('psw',null);
                $rootScope.loginflag = false;
                clearste();
            }else if(mymessage==false){
                return;
            }
        };

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
            if(value || value!=undefined || value!=null ){
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
                }else if(type=="2"){
                    return  (Number(value).toFixed(2));
                } else if(type=="3"){
                    return  value/10000;
                }else {
                    return number
                }
            }else{
                return "--";
            }


        };
    }]);
});