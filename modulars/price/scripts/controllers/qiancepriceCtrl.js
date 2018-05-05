 define(["./controllers"], function(controllers) {
	"use strict";
	controllers.controller("qiancepriceCtrl", ["$scope", "$state", "priceService", '$rootScope', '$tool','$window', function($scope, $state, priceService, $rootScope, $tool,$window) {		
		document.title = '前策产品定价部运营桌面';
		var fontSize =12
		var symbolSize = 8
		if(window.innerWidth>1900){
			fontSize = 16
		}else if(window.innerWidth<1400){
			fontSize = 12
		}
		if(window.innerWidth>1900){
			symbolSize = 10
		}else if(window.innerWidth<1400){
			symbolSize = 6
		}
		$scope.ispc = true;
		//轮播图控制播放与暂停
		$scope.start = true
		//是否显示遮罩
		//数据更新时间
		$scope.updataTime='';
		$scope.mask = false;
		//是否显示第一个下钻图标
		$scope.XZOne = false;
		//是否显示第二个下钻图标
		$scope.XZTwo = false;
		//集团各区域近一个月成交均价情况DataZoom
		$scope.FourChartDataZoom = ""
		//集团各区域近一个月成交均价情况X轴的data
		$scope.LastMonthAvgPriceXData = [];
		//集团各区域近一个月成交均价情况各区域成交均价
		$scope.LastMonthAvgPriceSeriesOne = [];
		//集团各区域近一个月成交均价情况集团整体成交均价
		$scope.LastMonthAvgPriceSeriesTwo = [];
		//集团各区域近一个月成交均价Y轴的最大值
		$scope.LastMonthAvgPriceMaxY ="";
		//更新时间
		$scope.timeRang = "08.17——09.17";
		//集团近一年均价走势图X轴,集团各物业类型近一年均价走势图X轴data
		$scope.NearAvePriXaxisData = [];
		//集团近一年均价走势图Series
		$scope.NearAvePriSeriesOne = [];
		//集团各物业类型近一年均价走势图Legend的data
		$scope.chartTwoLegendData = [],
		//集团各物业类型近一年均价走势图Series
		$scope.chartTwoSeries=[];
		//下钻一标题
		$scope.XiaZuanOneTitle=""
		//下钻一X轴数据
		$scope.XiaZuanChartOneXDate=[];
		//下钻一series数据1
		$scope.XiaZuanChartSeriesOne =[];
		//下钻一series数据2
		$scope.XiaZuanChartSeriesTwo =[];
		//下钻二series数据1
		$scope.XiaZuanChartTwoSeriesOne=[];
		//下钻二series数据2
		$scope.XiaZuanChartTwoSeriesTwo=[];
		//下钻二series标题
		$scope.XiaZuanTwoTitle=""
		//下钻二Xdata
		$scope.XiaZuanChartTwoXData=[]
		//chartFvie
		$scope.FiveChartDataZoom=""
		//标题
		$scope.qccpChartFiveTitle = "";
		//X轴的区域
		$scope.qccpChartFiveXData=[];
//		各区域溢破底金额
		$scope.qccpChartFiveSeriesOne=[];
		//集团平均溢价率
		$scope.qccpChartFiveSeriesTwo=[];
		//各区域溢价率
		$scope.qccpChartFiveSeriesThree=[];
		//劳斯莱斯图标数据处理
		$scope.chartThreeArr=[];
		$scope.chartThreeLegend=[];
		//集团各物业类型近一年均价走势图Series
		$scope.chartThreeSeries=[];
		//隐藏遮罩个下钻的表格
		$scope.cancel = function() {
			$scope.mask = false;
			$scope.XZOne = false;
			$scope.XZTwo = false;
			$("#myCarousel").carousel('cycle');
		}
		$scope.unLogin = function() {
			var mymessage = confirm("确定注销？");
			if(mymessage == true) {
				localStorage.setItem('login', false);
				localStorage.setItem('user', null);
				localStorage.setItem('psw', null);
				$rootScope.loginflag = false;
			} else if(mymessage == false) {
				return;
			}
		};
		$(".qccp").height(window.innerHeight)
		$scope.stopPropagation = function(e){
			e.stopPropagation()
		}
		//轮播图自动轮播 每隔20秒自动轮播 
		$('#myCarousel').carousel({interval:20000});
		$scope.bofang=function(){
			$scope.start = !$scope.start
			console.log($scope.start)
			if($scope.start){
				$("#myCarousel").carousel('cycle');
			}else{
				$("#myCarousel").carousel('pause');
			}
		}

		$scope.caidx = 1
		$scope.carouselTab=function(caidx){
			$scope.caidx = caidx
		}
		$('#myCarousel').on('slid.bs.carousel', function () {
		    $.each($(".carousel-inner .item"),function(i,n){
//				console.log($(n))
		    	if($(n).hasClass("active")){
//		    		console.log(i)
		    		$scope.caidx = i+1
		    	}
		    })
		    
		    $scope.$apply()
		})
		//集团近一年均价走势-- 折线图........................................................
		$scope.chartOne = function() {
			
			//设置最外层盒子的高度
			var groupOneChart = echarts.init(document.getElementById('groupOneChart'));
			// 指定图表的配置项和数据
			var groupOneOption = {
//				//标题组件
//				title: {
//					text: "集团近一年均价走势图",
//					textStyle: {
//						color: "#cdd3ee",
//						fontWeight: "normal",
//						fontSize: fontSize+3,
//					},
//					left: "3%"
//				},
				//			提示框组件
				tooltip: {
					trigger: 'axis',
					textStyle: {
						fontSize: fontSize,
					},
					formatter:"{b} : {c}"
					
				},
				//设置网格的大小
				grid: {
					top: "5%",
					left: '3%',
					right: '1%',
					bottom: '20%',
					//是否包含坐标轴
					containLabel: true
				},
				xAxis: [{
					type: 'category',
					//X轴的线相关
					axisLine: {
						show: true,
						lineStyle: {
							color: '#cdd3ee',
						}
					},
					//X轴坐标刻度相关
					axisTick: {
						show: false,
					},
					//X轴文字标签相关
					axisLabel: {
						show: true,
						//间隔多少个标签显示一次，0为全部标签都显示
						interval: 0,
						textStyle: {
							color: '#cdd3ee',
							fontSize: fontSize,
							
						},
						formatter:"{value}"
					},

					/*data: $scope.NearAvePriXaxisData*/
                    data: ['9月', '10月', '11月', '12月', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月']

				}],
				yAxis: [{
					//					scale:true,
					type: 'value',
					//Y轴放哪里
					position: 'left',

					//网格线
					splitLine: {
						//不显示
						show: false
					},
					//y轴的线
					axisLine: {
						show: false,
					},
					//y轴的标签
					axisLabel: {
						show: true,
						textStyle: {
							color: '#cdd3ee',
							fontSize: fontSize,
							
						}
					},
					//				y轴的刻度
					axisTick: {
						show: false,
					},

				}],
				series: [{
						name: '',
						type: 'line',
						//拐点处的图标
						symbol: 'circle',
						symbolSize: 10,
							data: ['8500', '8300', '8200', '7950', '7800', '8300', '8200', '7950', '7800', '8000', '8200', '8100'],
					/*	data: $scope.NearAvePriSeriesOne,*/
						//折线拐点标志(文字)的样式。
						itemStyle: {
							normal: {
								label: {
									show: true,
									position: "top",
									interval: "0",
									textStyle: {
										color: "#cdd3ee",
										fontSize: fontSize
									},
								},
								color: "#33A9E7",
								borderColor: '#33A9E7',
								lineStyle: {
									color: '#33A9E7'
								}
							}
						},
						//线条样式。
						lineStyle: {
							normal: {
								color: '#33A9E7',
							}
						},
					}

				]
			};

			// 使用刚指定的配置项和数据显示图表。
			groupOneChart.setOption(groupOneOption);

		}
        $scope.chartOne();
		//集团各物业类型近一年均价走势图-- 折线图........................................................
		$scope.chartTwo = function() {
			console.log(window.innerWidth)
			var groupTwoChart = echarts.init(document.getElementById('groupTwoChart'));
			// 指定图表的配置项和数据
			var groupTwoOption = {
				//设置图例的颜色
				color: ['#439FE0', '#45E2D1', '#FF9646', '#F25195', '#CF5AFF'],
				tooltip: {
					trigger: 'axis'
				},
				legend: {
					//图例标记的图形宽度，高度
					itemWidth: fontSize,
					itemHeight: fontSize,
					right: "1%",
					//设置每个图例的形状，名称要与series中的name一一对应
					textStyle: {
							color: '#cdd3ee',
							fontSize:fontSize,							
					},
					data: [{
						name: '洋房',
						// 强制设置图形为方形带边框弧度。
						icon: 'roundRect',
					}, {
						name: '别墅',
						// 强制设置图形为方形带边框弧度。
						icon: 'roundRect',
					}, {
						name: '公寓',
						// 强制设置图形为方形带边框弧度。
						icon: 'roundRect',
						// 设置文本为颜色
					}, {
						name: '车位',
						// 强制设置图形为方形带边框弧度。
						icon: 'roundRect',
					}, {
						name: '商业',
						// 强制设置图形为方形带边框弧度。
						icon: 'roundRect',
					}]
					/*data:$scope.chartTwoLegendData*/
				},
				grid: {
					top: "10%",
					left: '3%',
					right: '1%',
					bottom: '18%',
					//是否包含坐标轴
					containLabel: true
				},
				xAxis: [{
					type: 'category',
					triggerEvent: true,
					//X轴的线相关
					axisLine: {
						show: true,
						lineStyle: {
							color: '#cdd3ee',
						}
					},
					//X轴坐标刻度相关
					axisTick: {
						show: false,
					},
					//X轴文字标签相关
					axisLabel: {
						show: true,
						//间隔多少个标签显示一次，0为全部标签都显示
						interval: 0,
						textStyle: {
							color: '#cdd3ee',
							fontSize: fontSize,
							
						},
						formatter:"{value}"
					},
					//X轴的文字
						data: ['9月', '10月', '11月', '12月', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月']
					/*data: $scope.NearAvePriXaxisData,*/
				}],
				yAxis: [{
					type: 'value',
					//Y轴放哪里
					position: 'left',
					//				//y轴相对于原来位置的偏移量
					//				offset:15,
					//轴刻度值的范围
//					min: 0,
//					max: 20000,
					//y轴数据间隔
//					interval: 4000,
					//网格线
					splitLine: {
						//不显示
						show: false
					},
					//y轴的线
					axisLine: {
						show: false,
					},
					//y轴的标签
					axisLabel: {
						show: true,
						textStyle: {
							color: '#cdd3ee',
							fontSize: fontSize
						}
					},
					//				y轴的刻度
					axisTick: {
						show: false,
					},

				}],
				/*series: $scope.chartTwoSeries,*/
                series: [{
                    //一个对象为一个条折线
                    //改折线的名称，对应图例的名称
                    name: '洋房',
                    //折线图类型设置为折线
                    type: 'line',
                    //拐点处的图标
                    symbol: 'circle',
                    symbolSize:10,
                    //折线拐点标志(文字)的样式。
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                position: "top",
                                interval: "0",
                                textStyle: {
                                    color: "#cdd3ee",
                                    fontSize: fontSize
                                },
                            },
                        }
                    },
                    data: [22000, 26000, 11000, 19000, 28000, 10000,22000, 26000, 11000, 19000, 28000, 10000],
                    // data: $scope.LastMonthAvgPriceSeriesOne
                },
                    {
                        name: '别墅',
                        type: 'line',
                        symbol: 'circle',
                        symbolSize: 10,
                        data: [12000, 12000, 12000, 12000, 12000, 12000,12000, 12000, 12000, 12000, 12000, 12000],
                        // data: $scope.LastMonthAvgPriceSeriesTwo
                    },
                    {
                        name: '公寓',
                        type: 'line',
                        symbol: 'circle',
                        symbolSize: 10,
                        data: [12800, 12600, 12300, 13000, 14000, 13000,12800, 12600, 12300, 13000, 14000, 13000],
                        // data: $scope.LastMonthAvgPriceSeriesTwo
                    }
                    ,
                    {
                        name: '车位',
                        type: 'line',
                        symbol: 'circle',
                        symbolSize: 10,
                        data: [11000, 12500, 11500, 12000, 13000, 14000,11000, 12500, 11500, 12000, 13000, 14000],
                        // data: $scope.LastMonthAvgPriceSeriesTwo
                    }
                    ,
                    {
                        name: '商业',
                        type: 'line',
                        symbol: 'circle',
                        symbolSize: 10,
                        data: [16000, 11000, 15000, 10000, 12000, 13000,16000, 11000, 15000, 10000, 12000, 13000],
                        // data: $scope.LastMonthAvgPriceSeriesTwo
                    }
                ]
			};

			// 使用刚指定的配置项和数据显示图表。
			groupTwoChart.setOption(groupTwoOption);
			//绑定点击图例下钻事件
			groupTwoChart.on('legendselectchanged', function(params) {
                $scope.chartXZOne()
				console.log(params)
				console.log("点击了图例的" + params.name)
				$scope.mask = true
				$scope.XZOne = true
				$scope.$apply()
				//点击图例默认选中图例
				$scope.chartTwoSeries.forEach(function(items){
					groupTwoChart.dispatchAction({
						//设置图例为选中状态	
					    type: 'legendSelect',
					    // 图例名称
					    name: items.name
					})
					
				})
				//点击图例下钻1请求数据
			/*	priceService.getqccpXiaZuanChartOne("ls",[params.name]).then(function(res) {
					console.log(".........................")
					console.log(res)
					//先清空数组
					$scope.XiaZuanChartSeriesOne=[];
					$scope.XiaZuanChartSeriesTwo=[];
					$scope.XiaZuanOneTitle  ="";
					//表格的标题
					$scope.XiaZuanOneTitle =res.Syqcjtyearjjzsdata[0].roomsort+"近一年销售情况";
					
					//处理series数据
					res.Syqcjtyearjjzsdata.forEach(function(items) {
						$scope.XiaZuanChartSeriesOne.push(items.wylx_cjjj)
						$scope.XiaZuanChartSeriesTwo.push((items.cjhl/100000000).toFixed(2))
					})
					$scope.chartXZOne()
				})*/
				
				
				
			});

			//绑定点击月份下钻事件
			groupTwoChart.on('click', function(params) {
				console.log(params)
				if(params.componentType == "xAxis") {
                    $scope.chartXZTwo()
					console.log("点击了X轴的" + params.value)
					$scope.mask = true
					$scope.XZTwo = true
					$scope.$apply()
					//根据点击的月份请求数据
					priceService.getqccpXiaZuanChartTwo("ls",[params.value]).then(function(res) {
						console.log(".........................")
						console.log(res)
						//先清空数组
						$scope.XiaZuanChartTwoSeriesOne=[];
						$scope.XiaZuanChartTwoSeriesTwo=[];
						$scope.XiaZuanChartTwoXData = [];
						$scope.XiaZuanTwoTitle ="";
						//处理X轴的数据
						res.Syqcjtyearjjzsdata.forEach(function(items){
							$scope.XiaZuanChartTwoXData.push(items.roomsort)
						})
//						console.log("///////////////////////////")
//						console.log($scope.XiaZuanChartTwoXData)
						//表格的标题
						$scope.XiaZuanTwoTitle ="各物业类型"+res.Syqcjtyearjjzsdata[0].qy_month+"月成交情况";
						
						//处理series数据
						res.Syqcjtyearjjzsdata.forEach(function(items) {
							$scope.XiaZuanChartTwoSeriesOne.push((items.cjhl/100000000).toFixed(2))
							$scope.XiaZuanChartTwoSeriesTwo.push((items.qzwshl/100000000).toFixed(2))
						})
						$scope.chartXZTwo()
					})
				} else if(params.componentType == "series") {
					console.log("点击了series的")
				}

			});
		}
        $scope.chartTwo()
		//劳斯莱斯产品近一年均价走势均价走势图-- 折线图.....................................................
		$scope.chartThree = function() {
			var groupThreeChart = echarts.init(document.getElementById('groupThreeChart'));
			// 指定图表的配置项和数据
			var groupThreeOption = {
				//设置图例的颜色
				color: ['#439FE0', '#45E2D1', '#FF9646', '#F25195', '#CF5AFF',"#5EE678","#FEDB37"],
				tooltip: {
					trigger: 'axis'
				},
				legend: {
					//图例标记的图形宽度，高度
					itemWidth: fontSize,
					itemHeight: fontSize,
					//图例之间的间距
					itemGap: 5,
					//整个图例组件的大小
					width: "90%",
					right: "1%",
					textStyle: {
						color: '#cdd3ee',
						fontSize:fontSize
					},
					//设置每个图例的形状，名称要与series中的name一一对应
					/*data:$scope.chartThreeLegend,*/
					data: [{
						name: 'YJ140',
						// 强制设置图形为方形带边框弧度。
						icon: 'roundRect',
					}, {
						name: 'YJ180',
						// 强制设置图形为方形带边框弧度。
						icon: 'roundRect',
					}, {
						name: 'YJ190',
						// 强制设置图形为方形带边框弧度。
						icon: 'roundRect',
					}, {
						name: 'YJ260',
						// 强制设置图形为方形带边框弧度。
						icon: 'roundRect',
					}, {
						name: 'BJ240',
						// 强制设置图形为方形带边框弧度。
						icon: 'roundRect',
					}, {
						name: 'BJ260',
						// 强制设置图形为方形带边框弧度。
						icon: 'roundRect',
						// 设置文本为颜色
					}]
				},
				grid: {
					top: "10%",
					left: '3%',
					right: '1%',
					bottom: '18%',
					//是否包含坐标轴
					containLabel: true
				},
				xAxis: [{
					triggerEvent: true,
					type: 'category',
					//X轴的线相关
					axisLine: {
						show: true,
						lineStyle: {
							color: '#cdd3ee',
						}
					},
					//X轴坐标刻度相关
					axisTick: {
						show: false,
					},
					//X轴文字标签相关
					axisLabel: {
						show: true,
						//间隔多少个标签显示一次，0为全部标签都显示
						interval: 0,
						textStyle: {
							color: '#cdd3ee',
							fontSize: fontSize
						},
						formatter:"{value}"
					},
					//X轴的文字
					/*data:$scope.NearAvePriXaxisData,*/
                    data: ['9月', '10月', '11月', '12月', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],
				}],
				yAxis: [{
					type: 'value',
					//Y轴放哪里
					position: 'left',
					//				//y轴相对于原来位置的偏移量
					//				offset:15,
					//网格线
					splitLine: {
						//不显示
						show: false
					},
					//y轴的线
					axisLine: {
						show: false,
					},
					//y轴的标签
					axisLabel: {
						show: true,
						interval: 1000,
						textStyle: {
							color: '#cdd3ee',
							fontSize: fontSize
						}
					},
					//				y轴的刻度
					axisTick: {
						show: false,
					},

				}],
				/*series:$scope.chartThreeSeries,*/
				series: [{
						//一个对象为一个条折线
						//改折线的名称，对应图例的名称
						name: 'YJ140',
						//折线图类型设置为折线
						type: 'line',
						//拐点处的图标
						symbol: 'circle',
						symbolSize: 10,
						data: [12000, 11200, 10232, 12992, 10231, 11111, 12321, 12000, 11200, 10232, 12992, 10231],
					},
					{
						name: 'YJ180',
						type: 'line',
						symbol: 'circle',
						symbolSize: 10,
						data: [14000, 13200, 12232, 13992, 12331, 11211, 12321, 13000, 14200, 14232, 14992, 13231],
					},
					{
						name: 'YJ190',
						type: 'line',
						symbol: 'circle',
						symbolSize: 10,
						data: [18000, 18200, 18232, 17992, 17231, 18111, 18321, 19000, 17200, 18232, 18992, 18231],
					},
					{
						name: 'YJ260',
						type: 'line',
						symbol: 'circle',
						symbolSize: 10,
						data: [14000, 14200, 13232, 12992, 13231, 13111, 14321, 14000, 13200, 12232, 12992, 13231],
					},
					{
						name: 'BJ240',
						type: 'line',
						symbol: 'circle',
						symbolSize: 10,
						data: [8000, 9200, 9232, 8992, 8231, 9111, 8321, 7000, 8200, 9232, 8992, 7231],
					},
					{
						name: 'BJ260',
						type: 'line',
						symbol: 'circle',
						symbolSize: 10,
						data: [8000, 9200, 9232, 8992, 8231, 9111, 8321, 7000, 8200, 9232, 8992, 7231],
					}
				]
			};

			// 使用刚指定的配置项和数据显示图表。
			groupThreeChart.setOption(groupThreeOption);
			//绑定点击图例下钻事件
			groupThreeChart.on('legendselectchanged', function(params) {
                $scope.chartXZOne()
				console.log(params)
				console.log("点击了图例的" + params.name)
				$scope.mask = true
				$scope.XZOne = true
				$scope.$apply()
				//点击图例默认选中图例
				$scope.chartThreeSeries.forEach(function(items){
					groupThreeChart.dispatchAction({
						//设置图例为选中状态	
					    type: 'legendSelect',
					    // 图例名称
					    name: items.name
					})
					
				})
				priceService.getqccpChartTHreeXiaZuan1("ls",[params.name]).then(function(res) {
                    $scope.chartXZOne()
                    $scope.chartXZTwo()
					console.log(".........................")
					console.log(res)
					//先清空数组
					$scope.XiaZuanChartSeriesOne=[];
					$scope.XiaZuanChartSeriesTwo=[];
					$scope.XiaZuanOneTitle  ="";
					//表格的标题
					$scope.XiaZuanOneTitle =res.Syqclslslxdata[0].roomtype+"近一年销售情况";
//					
//					//处理series数据
					res.Syqclslslxdata.forEach(function(items) {
						$scope.XiaZuanChartSeriesOne.push(items.lsls_cjjj)
						$scope.XiaZuanChartSeriesTwo.push((items.cjhl/100000000).toFixed(2))
					})
					$scope.chartXZOne()
				})
				
				
			});
			
			//绑定点击月份下钻事件
			groupThreeChart.on('click', function(params) {
				console.log(params)
				if(params.componentType == "xAxis") {
                    $scope.chartXZTwo()
					console.log("点击了X轴的" + params.value)
					$scope.mask = true
					$scope.XZTwo = true
					$scope.$apply()
					//根据点击的月份请求数据
					priceService.getqccpChartTHreeXiaZuan2("ls",[params.value]).then(function(res) {
						console.log(".........................")
						console.log(res)
						//先清空数组
						$scope.XiaZuanChartTwoSeriesOne=[];
						$scope.XiaZuanChartTwoSeriesTwo=[];
						$scope.XiaZuanChartTwoXData = [];
						$scope.XiaZuanTwoTitle="";
						//处理X轴的数据
						res.Syqclslsyfdata.forEach(function(items){
							$scope.XiaZuanChartTwoXData.push(items.roomtype)
						})
//						console.log("///////////////////////////")
//						console.log($scope.XiaZuanChartTwoXData)
//						//表格的标题
						$scope.XiaZuanTwoTitle ="各类型劳斯莱斯产品"+res.Syqclslsyfdata[0].qy_month+"月成交情况";
//						
//						//处理series数据
						res.Syqclslsyfdata.forEach(function(items) {
							$scope.XiaZuanChartTwoSeriesOne.push((items.cjhl/100000000).toFixed(2))
							$scope.XiaZuanChartTwoSeriesTwo.push((items.qzwshl/100000000).toFixed(2))
						})
						console.log($scope.XiaZuanChartTwoSeriesOne)
						$scope.chartXZTwo()
					})

				} 

			});

		}
        $scope.chartThree();
		//集团各区域近一个月成交均价情况-- 折线图........................................................

		$scope.chartFour = function() {
			var groupFourChart = echarts.init(document.getElementById('groupFourChart'));
			// 指定图表的配置项和数据
			var groupFourOption = {
		/*		dataZoom: [
					{
						type: 'inside',
						xAxisIndex: [0],
						start: 0,
						end: $scope.FourChartDataZoom
					}
				],*/
				//设置图例的颜色
				color: ['#439FE0', '#EF5297'],
				tooltip: {
					trigger: 'axis'
				},
				legend: {
					//图例标记的图形宽度，高度
					itemWidth: fontSize,
					itemHeight: fontSize,
					//图例之间的间距
					itemGap: 10,
					right: "1%",
					textStyle:{
						fontSize:fontSize
					},
					//设置每个图例的形状，名称要与series中的name一一对应

					data: [{
						name: '各区域成交均价',
						// 强制设置图形为方形带边框弧度。
						icon: 'roundRect',
						// 设置文本为颜色
						textStyle: {
							color: '#439FE0'
						}
					}, {
						name: '集团整体成交均价',
						// 强制设置图形为方形带边框弧度。
						icon: 'roundRect',
						// 设置文本为颜色
						textStyle: {
							color: '#EF5297'
						}
					}]
				},
				grid: {
					top: "20%",
					left: '3%',
					right: '1%',
					bottom: '5%',
					//是否包含坐标轴
					containLabel: true
				},
				xAxis: [{
					type: 'category',
					//X轴的线相关
					axisLine: {
						show: true,
						lineStyle: {
							color: '#cdd3ee',
						}
					},
					//X轴坐标刻度相关
					axisTick: {
						show: false,
					},
					//X轴文字标签相关
					axisLabel: {
						show: true,
						//间隔多少个标签显示一次，0为全部标签都显示
						interval: 0,
						textStyle: {
							color: '#cdd3ee',
							fontSize: fontSize
						},
						formatter:function(val){
							return val.replace("区域","")
						}
					},
				
						data: ['北京区域', '辽宁区域', '河北区域', '海南区域', '上海区域', '内蒙古区域']
				/*	data: $scope.LastMonthAvgPriceXData*/
				}],
				yAxis: [{
					type: 'value',
					//Y轴放哪里
					position: 'left',
					//				//y轴相对于原来位置的偏移量
					//				offset:15,
					//轴刻度值的范围
					//					min: 0,
					//					max: 30000,
					//					//y轴数据间隔
					//					interval: 5000,
					//网格线
					/*min:0,
					max:$scope.LastMonthAvgPriceMaxY,*/
					splitLine: {
						//不显示
						show: false
					},
					//y轴的线
					axisLine: {
						show: false,
					},
					//y轴的标签
					axisLabel: {
						show: true,
						//						interval: 1000,
						textStyle: {
							color: '#cdd3ee',
							fontSize: fontSize
						}
					},
					//				y轴的刻度
					axisTick: {
						show: false,
					},

				}],
				series: [{
						//一个对象为一个条折线
						//改折线的名称，对应图例的名称
						name: '各区域成交均价',
						//折线图类型设置为折线
						type: 'line',
						//拐点处的图标
						symbol: 'circle',
						symbolSize:10,
						//折线拐点标志(文字)的样式。
						itemStyle: {
							normal: {
								label: {
									show: true,
									position: "top",
									interval: "0",
									textStyle: {
										color: "#cdd3ee",
										fontSize: fontSize
									},
								},
							}
						},
							data: [22000, 26000, 11000, 19000, 28000, 10000],
						/*data: $scope.LastMonthAvgPriceSeriesOne*/
					},
					{
						name: '集团整体成交均价',
						type: 'line',
						symbol: 'circle',
						symbolSize: 10,
									data: [12000, 12000, 12000, 12000, 12000, 12000],
						/*data: $scope.LastMonthAvgPriceSeriesTwo*/
					}
				]
			};

			// 使用刚指定的配置项和数据显示图表。
			groupFourChart.setOption(groupFourOption);

		}
        $scope.chartFour();
		//17年各区域溢价/破底情况-- 折线图........................................................
		$scope.chartFive = function() {
			var groupFiveChart = echarts.init(document.getElementById('groupFiveChart'));
			// 指定图表的配置项和数据
			var groupFiveOption = {
				//设置图例的颜色
				color: ['#439FE0', '#FC9C48', "#45FBE5"],
				tooltip: {
					trigger: 'axis'
				},
				dataZoom: [
					{
						type: 'inside',
						xAxisIndex: [0],
						start: 1,
                        // end: $scope.FiveChartDataZoom
                        end:80,
						throttle:100
					}
				],
				legend: {
					//图例标记的图形宽度，高度
					itemWidth: fontSize,
					itemHeight: fontSize,
					//图例之间的间距
					itemGap: 10,
					textStyle:{
						fontSize:fontSize
					},
					right:"1%",
					//设置每个图例的形状，名称要与series中的name一一对应

					data: [{
						name: '各区域溢价/破底金额(亿)',
						// 强制设置图形为方形带边框弧度。
						icon: 'roundRect',
						// 设置文本为颜色
						textStyle: {
							color: '#439FE0'
						}
					}, {
						name: '集团平均溢价率(%)',
						// 强制设置图形为方形带边框弧度。
						icon: 'circle',
						// 设置文本为颜色
						textStyle: {
							color: '#FC9C48'
						}
					}, {
						name: '各区域溢价率(%)',
						// 强制设置图形为方形带边框弧度。
						icon: 'circle',
						// 设置文本为颜色
						textStyle: {
							color: '#45FBE5'
						}
					}]
				},
				grid: {
					top: "20%",
					left: '3%',
					right: '3%',
					bottom: '5%',
					//是否包含坐标轴
					containLabel: true
				},
				xAxis: [{
					//X轴的文字
					/*data: $scope.qccpChartFiveXData,*/
                    data:['浙江','辽宁','安徽','河北','海南','上海','北京','内蒙古','四川','重庆','天津','沪浙',],
					triggerEvent: true,
					type: 'category',
					//X轴的线相关
					axisLine: {
						show: false,
						lineStyle: {
							color: '#cdd3ee',
						}
					},
					//X轴坐标刻度相关
					axisTick: {
						show: false,
					},
					//X轴文字标签相关
					axisLabel: {
						show: true,
						//间隔多少个标签显示一次，0为全部标签都显示
						interval: 0,
						textStyle: {
							color: '#cdd3ee',
							fontSize: fontSize
						},
						formatter:function(val){
							return val?val.replace("区域",""):""
						}
					},
					

				}],
				yAxis: [{
					type: 'value',
					//Y轴放哪里
					position: 'left',
					//网格线
					splitLine: {
						//不显示
						show: false
					},
					//y轴的线
					axisLine: {
						show: false,
					},
					//y轴的标签
					axisLabel: {
						show: true,
						textStyle: {
							color: '#cdd3ee',
							fontSize: fontSize
						}
					},
					minInterval:0.1,
					//				y轴的刻度
					axisTick: {
						show: true,
						lineStyle: {
							color: "#cdd3ee",
						}
					},
					
				}, {
					type: 'value',
					//Y轴放哪里
					position: 'right',
					//网格线
					scale:true,
					splitLine: {
						//不显示
						show: false
					},
					//y轴的线
					axisLine: {
						show: true,
						lineStyle: {
							color: "#cdd3ee",
						}
					},
					//y轴的标签
					axisLabel: {
						show: true,
						textStyle: {
							color: '#cdd3ee',
							fontSize: fontSize
						},
						formatter: function(val) {
							return val + '%';
						}

					},
					//				y轴的刻度
					axisTick: {
						show: true,
						lineStyle: {
							color: "#cdd3ee",
						}
					},

				}],
				series: [{
						name: '各区域溢价/破底金额(亿)',
						type: 'bar',
						symbolSize: 10,
						//					data: [3, 2.5, 2, 1.8, 1.2, 0.8,-0.5, -0.8, -1, -2, -1.7, -2],
						//设置单个柱子的样式
						data: [{
							value: 3,
							itemStyle: {
								normal: {
									//圆角
									barBorderRadius: [5, 5, 0, 0],
									color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
										offset: 0,
										color: '#4C91CC'
									}, {
										offset: 1,
										color: '#55D5FA'
									}])
								}
							}
						}, {
							value: 2.5,
							itemStyle: {
								normal: {
									//圆角
									barBorderRadius: [5, 5, 0, 0],
									color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
										offset: 0,
										color: '#4C91CC'
									}, {
										offset: 1,
										color: '#55D5FA'
									}])
								}
							}
						}, {
							value: 2,
							itemStyle: {
								normal: {
									//圆角
									barBorderRadius: [5, 5, 0, 0],
									color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
										offset: 0,
										color: '#4C91CC'
									}, {
										offset: 1,
										color: '#55D5FA'
									}])
								}
							}
						}, {
							value: 1.8,
							itemStyle: {
								normal: {
									//圆角
									barBorderRadius: [5, 5, 0, 0],
									color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
										offset: 0,
										color: '#4C91CC'
									}, {
										offset: 1,
										color: '#55D5FA'
									}])
								}
							}
						}, {
							value: 1.2,
							itemStyle: {
								normal: {
									//圆角
									barBorderRadius: [5, 5, 0, 0],
									color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
										offset: 0,
										color: '#4C91CC'
									}, {
										offset: 1,
										color: '#55D5FA'
									}])
								}
							}
						}, {
							value: 0.8,
							itemStyle: {
								normal: {
									//圆角
									barBorderRadius: [5, 5, 0, 0],
									color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
										offset: 0,
										color: '#4C91CC'
									}, {
										offset: 1,
										color: '#55D5FA'
									}])
								}
							}
						}, {
							value: -0.5,
							itemStyle: {
								normal: {
									//圆角
									barBorderRadius: [0, 0, 5, 5],
									color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
										offset: 0,
										color: '#EA686A'
									}, {
										offset: 1,
										color: '#EE251B'
									}])
								}
							}
						}, {
							value: -0.8,
							itemStyle: {
								normal: {
									//圆角
									barBorderRadius: [0, 0, 5, 5],
									color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
										offset: 0,
										color: '#EA686A'
									}, {
										offset: 1,
										color: '#EE251B'
									}])
								}
							}
						}, {
							value: -1,
							itemStyle: {
								normal: {
									//圆角
									barBorderRadius: [0, 0, 5, 5],
									color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
										offset: 0,
										color: '#EA686A'
									}, {
										offset: 1,
										color: '#EE251B'
									}])
								}
							}
						}, {
							value: -2,
							itemStyle: {
								normal: {
									//圆角
									barBorderRadius: [0, 0, 5, 5],
									color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
										offset: 0,
										color: '#EA686A'
									}, {
										offset: 1,
										color: '#EE251B'
									}])
								}
							}
						}, {
							value: -1.7,
							itemStyle: {
								normal: {
									//圆角
									barBorderRadius: [0, 0, 5, 5],
									color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
										offset: 0,
										color: '#EA686A'
									}, {
										offset: 1,
										color: '#EE251B'
									}])
								}
							}
						}, {
							value: -2,
							itemStyle: {
								normal: {
									//圆角
									barBorderRadius: [0, 0, 5, 5],
									color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
										offset: 0,
										color: '#EA686A'
									}, {
										offset: 1,
										color: '#EE251B'
									}])
								}
							}
						}],
						/*data:$scope.qccpChartFiveSeriesOne,*/
						barWidth: "20%",
						label:{
							normal:{
								show :true,
								position:"top",
								textStyle:{									
									fontSize :fontSize,
									color:"#cdd3ee"
								}
							}
						}

					},
					{
						name: '集团平均溢价率(%)',
						type: 'line',
						symbol: 'circle',
						//使用第二个Y轴
						yAxisIndex: 1,
						symbolSize: 10,
						itemStyle :{
							normal:{
								color:'#FC9C48'
							}
						},
						//百分数写数据的时候例如0.05=》0.05*100，写成5
						/*data:$scope.qccpChartFiveSeriesTwo,*/
                        data:['5','5','5','5','5','5','5','5','5','5','5','5']
					},
					{
						name: '各区域溢价率(%)',
						type: 'line',
						symbol: 'circle',
						//使用第二个Y轴
						yAxisIndex: 1,
						symbolSize: 10,
						itemStyle :{
							normal:{
								color:'#45FBE5'
							}
						},
						//百分数写数据的时候例如0.30=》0.30*100，写成30
						/*data: $scope.qccpChartFiveSeriesThree,*/
                        data:['1','2','-3','1','5','8','-1','1','1','-2','1','-1']
					}
				]
			};

			// 使用刚指定的配置项和数据显示图表。
			groupFiveChart.setOption(groupFiveOption);
			groupFiveChart.on("click", function(params) {
				console.log(params)
				if(params.componentType == "xAxis") {
					$window.location.href="#/qccpTab/"+ params.value
					
				}
			})

		}
        $scope.chartFive()
		//下钻1洋房产品近一年情况-- 折线图........................................................
		//点击chartTwo下钻
		$scope.chartXZOne = function() {
			$("#myCarousel").carousel('pause');
			//设置最外层盒子的高度
			var qccpXiaZuanOne = echarts.init(document.getElementById('qccpXiaZuanOne'));
			// 指定图表的配置项和数据
			var XiaZuanOneOption = {
				title:{
					top:'2%',
					left:'2%',
					/*text:$scope.XiaZuanOneTitle,*/
                    text:'洋房',
					padding:5,
					textStyle:{
						color:"#cdd3ee",
						fontWeight:"normal ",
						fontSize:22
					},
				},
				//设置图例的颜色
				color: ['#439FE0', '#F9A147'],
				tooltip: {
					trigger: 'axis',
					formatter:function(p){
						console.log(p)
						return p[0].name+"月</br>"+p[0].seriesName+" : "+p[0].data+"</br>"+p[1].seriesName+" : "+p[1].data
					},
				},
				legend: {
					//图例标记的图形宽度，高度
					right:"10%",
					top:"10%",
					itemWidth: fontSize,
					itemHeight: fontSize,
					textStyle: {
						fontSize: fontSize
					},
					//图例之间的间距
					itemGap: 10,
					//设置每个图例的形状，名称要与series中的name一一对应

					data: [{
						name: '成交货量(亿)',
						// 强制设置图形为方形带边框弧度。
						icon: 'roundRect',
						// 设置文本为颜色
						textStyle: {
							color: '#439FE0'
						}
					}, {
						name: '成交均价',
						// 强制设置图形为方形带边框弧度。
						icon: 'circle',
						// 设置文本为颜色
						textStyle: {
							color: '#F9A147'
						}
					}]
				},
				grid: {
					top: "20%",
					left: '3%',
					right: '4%',
					bottom: '5%',
					//是否包含坐标轴
					containLabel: true
				},
				xAxis: [{
					type: 'category',
					//X轴的线相关
					axisLine: {
						show: true,
						lineStyle: {
							color: '#cdd3ee',
						}
					},
					//X轴坐标刻度相关
					axisTick: {
						show: false,
					},
					//X轴文字标签相关
					axisLabel: {
						show: true,
						//间隔多少个标签显示一次，0为全部标签都显示
						interval: 0,
						textStyle: {
							color: '#cdd3ee',
							fontSize: fontSize
						},
						formatter:function(val){
							return val+"月"
						},
					},
					//X轴的文字
					/*data: $scope.NearAvePriXaxisData,*/
                    data:['10','11','12','1','2','3','4','5','6','7','8','9']

				}],
				yAxis: [{
					type: 'value',
					//Y轴放哪里
					position: 'left',
					//网格线
					splitLine: {
						//不显示
						show: false
					},
					//y轴的线
					axisLine: {
						show: true,
						lineStyle: {
							color: '#cdd3ee'
						}

					},
					//y轴的标签
					axisLabel: {
						show: true,
						textStyle: {
							color: '#cdd3ee',
							fontSize: fontSize
						}
					},
					//				y轴的刻度
					axisTick: {
						show: true,
						lineStyle: {
							color: "#cdd3ee",
						}
					},

				}, {
					type: 'value',
					//Y轴放哪里
					position: 'right',
					//				//y轴相对于原来位置的偏移量
					//				offset:15,
					//y轴数据间隔
					interval: 0,
					//网格线
					splitLine: {
						//不显示
						show: false
					},
					//y轴的线
					axisLine: {
						show: true,
						lineStyle: {
							color: "#cdd3ee",
						}
					},
					//y轴的标签
					axisLabel: {
						show: true,
						textStyle: {
							color: '#cdd3ee',
							fontSize: fontSize
						}
					},
					//				y轴的刻度
					axisTick: {
						show: true,
						lineStyle: {
							color: "#cdd3ee",
						}
					},

				}],
				series: [{
						name: '成交货量(亿)',
						type: 'bar',
						yAxisIndex: 0,
					/*data: $scope.XiaZuanChartSeriesTwo,*/
                    data:[320,288,352,400,312,281,479,310,234,313,301,321],
						itemStyle: {
							normal: {
								//圆角
								barBorderRadius: [5, 5, 0, 0],
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: '#55D5FA'
								}, {
									offset: 1,
									color: '#4C91CC'
								}])
							}
						},
						barWidth: "35%"

					},
					{
						name: '成交均价',
						type: 'line',
						symbol: 'circle',
						//使用第1个Y轴
						yAxisIndex: 1,
						symbolSize: 10,
						lineStyle: {
							normal: {
								color: "#F9A147"
							}
						},
						itemStyle: {
							normal: {
								color: "#F9A147"
							}
						},
						/*data: $scope.XiaZuanChartSeriesOne,*/
                        data:[1320,2188,3512,1400,3112,1281,4179,3110,1234,1313,2301,1321]

					}
				]
			};

			// 使用刚指定的配置项和数据显示图表。
			qccpXiaZuanOne.setOption(XiaZuanOneOption);
		}
//		$scope.chartXZOne()
		
		$scope.chartXZTwo = function() {
			// 停止轮播

			$("#myCarousel").carousel('pause');

			//设置最外层盒子的高度
			var qccpXiaZuanTwo = echarts.init(document.getElementById('qccpXiaZuanTwo'));
			// 指定图表的配置项和数据
			var XiaZuanTwoOption = {
				title: {
					/*text: $scope.XiaZuanTwoTitle,*/
                    text:'各物业类型成交情况',
					textStyle: {
						color: "#cdd3ee",
						fontSize:22,
						fontWeight :'normal' ,
					},
					padding: 10
				},
				color: ['#33A9E6', '#F9A147'],
				tooltip: {
					trigger: 'axis',
					axisPointer: { // 坐标轴指示器，坐标轴触发有效
						type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
					},
				},
				legend: {
					right:"2%",
					top:"10%",
					textStyle: {
							fontSize: fontSize
						},
					data: [{
						name: '成交货量(亿)',
						textStyle: {
							color: "#33A9E6"
						}
					}, {
						name: '取证未售货量(亿)',
						textStyle: {
							color: "#F9A147"
						}
					}],
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				xAxis: [{
					type: 'category',
					/*data:$scope.XiaZuanChartTwoXData,*/
                    data:['10月','11月','12月','1月','2月','3月','4月','5月','6月','7月','8月','9月'],
					//X轴的线相关
					axisLine: {
						show: true,
						lineStyle: {
							color: '#cdd3ee',
						}
					},
					//X轴坐标刻度相关
					axisTick: {
						show: false,
					},
					//X轴文字标签相关
					axisLabel: {
						show: true,
						//间隔多少个标签显示一次，0为全部标签都显示
						interval: 0,
						textStyle: {
							color: '#cdd3ee',
							fontSize: fontSize
						}
					},
				}],
				yAxis: [{
					type: 'value',
					position: 'left',
					//				//y轴相对于原来位置的偏移量
					//				offset:15,
					//网格线
					splitLine: {
						//不显示
						show: false
					},
					//y轴的线
					axisLine: {
						show: true,
						lineStyle: {
							color: '#cdd3ee'
						}

					},
					//y轴的标签
					axisLabel: {
						show: true,
						textStyle: {
							color: '#cdd3ee',
							fontSize: fontSize
						}
					},
					//				y轴的刻度
					axisTick: {
						show: true,
						lineStyle: {
							color: "#cdd3ee",
						}
					}
				}],
				series: [{
						name: '成交货量(亿)',
						type: 'bar',
						stack: '11',
					/*data: $scope.XiaZuanChartTwoSeriesOne,*/
                    data:[100,222,212,321,215,198,100,222,212,321,215,198],
						barWidth: "28%",
						itemStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: '#60CBF9'
								}, {
									offset: 1,
									color: '#26A1F1'
								}])
							}
						},

					},
					{
						name: '取证未售货量(亿)',
						type: 'bar',
						stack: '11',
						/*	data: $scope.XiaZuanChartTwoSeriesTwo,*/
                        data:[30,31,22,36,43,21,30,31,22,36,43,21],
						barWidth: "28%",
						itemStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: '#F8A95A'
								}, {
									offset: 1,
									color: '#FC8330'
								}])
							}
						},
					}

				]
			}

			// 使用刚指定的配置项和数据显示图表。
			qccpXiaZuanTwo.setOption(XiaZuanTwoOption);
			
		}
//		$scope.chartXZTwo()

		//		进入页面函数自执行
		//		$scope.chartOne()
		//		$scope.chartTwo()
//		$scope.chartThree()
		//		$scope.chartFour()
//		$scope.chartFive()

		//设置全屏
		//		$scope.quanping();
		
			//设置全屏................................................
//		$scope.quanping();
		$rootScope.homepage = "qccp";
		$rootScope.isNative = true;
		$rootScope.theme = true;
		$scope.screen = function() {
			$scope.quanping();
			//		　　　　　　监听不同浏览器的全屏事件，并件执行相应的代码
			document.addEventListener("webkitfullscreenchange", function() {
				if(document.webkitIsFullScreen) {
					setTimeout(function() {
						setH(1);
					}, 1);
				} else {
					setTimeout(function() {
						setH(2);
					}, 1);
				}
			}, false);
			document.addEventListener("fullscreenchange", function() {
				if(document.fullscreen) {
					setTimeout(function() {
						setH(3);
					}, 1);
				} else {
					setTimeout(function() {
						setH(4);
					}, 1);
				}
			}, false);
			document.addEventListener("mozfullscreenchange", function() {
				if(document.mozFullScreen) {
					setTimeout(function() {
						setH(5);
					}, 1);
				} else {
					setTimeout(function() {
						setH(6);
					}, 1);
				}
			}, false);
			document.addEventListener("msfullscreenchange", function() {
				if(document.msFullscreenElement) {
					setTimeout(function() {
						setH();
					}, 1);
				} else {
					setTimeout(function() {
						setH();
					}, 1);
				}
			}, false);
		};
		//退出全屏
		$scope.exitFullScreen = function() {
			$scope.tuichuquanping();
			setTimeout(function() {
				//setH(101);
			}, 100);
		};

		var setH = function(a) {
			//          var winH = $(window).height();
			//          var winW = $(window).width();
			//          $('.qccp').css('height',winH);
			$(".qccp").height(window.innerHeight)
			if(window.innerWidth>1900){
				fontSize = 16
			}else if(window.innerWidth<1400){
				fontSize = 12
			}
			$scope.chartOne()
			$scope.chartTwo()
			$scope.chartThree()
			$scope.chartFour()
			$scope.chartFive()
			$scope.$apply();
		};

		//qccp修改-start
		//请求数据
		//调用2017年X月X日-X月X日新开盘项目净利润情况
		priceService.getqccpNewProProfit("ls").then(function(res) {
			$scope.NewProProfit = res.Syqcnewxmjlrdata
			console.log($scope.NewProProfit)
			//处理时间
			var startTime = new Date(res.Syqcnewxmjlrdata[0].start_time)
			$scope.start_time = `${startTime.getFullYear()}年${startTime.getMonth()+1}月${startTime.getDate()}日`

			var end_time = new Date(res.Syqcnewxmjlrdata[0].end_time)
			$scope.end_time = `${end_time.getMonth()+1}月${end_time.getDate()}日`
		})
		//调用异常降价监控接口
		priceService.getqccpYiChang("ls").then(function(res) {
			$scope.YiChang = res.Syqcycjjdata
//			console.log('aaaaaaaaaa')
//						console.log(res.Syqcycjjdata)
		})
		//调用集团各区域近一个月成交均价情况
		priceService.getqccpLastMonthAvgPrice("ls").then(function(res) {
			console.log(res.Syqcjtqyjjdata)
			
			$scope.timeRang = res.Syqcjtqyjjdata[0].last_month
//			console.log($scope.timeRang)
//			console.log($scope.timeRang.split("-")[0])
			var timeRang = new Date($scope.timeRang.split("—")[0])
			var timeRang2 = new Date($scope.timeRang.split("—")[1])
			console.log(timeRang)
			var mon1 = timeRang.getMonth()+1+"月"
			var day1 = timeRang.getDate()+"日"
			var mon2 = timeRang2.getMonth()+1+"月"
			var day2 = timeRang2.getDate()+"日"
//			console.log(mon1+day1+"—"+mon2+day2)
			$scope.timeRang = "("+mon1+day1+"—"+mon2+day2+")"
			$scope.FourChartDataZoom = 8*100/(res.Syqcjtqyjjdata.length)
			//处理X轴的data数据
			res.Syqcjtqyjjdata.forEach(function(items) {
				$scope.LastMonthAvgPriceXData.push(items.salearea)
				$scope.LastMonthAvgPriceSeriesOne.push(items.cjjj_month)
				$scope.LastMonthAvgPriceSeriesTwo.push(items.wylx_cjjj)
			})
			var max = res.Syqcjtqyjjdata[0].cjjj_month
			console.log(max)
//			console.log((Math.ceil(max/Math.pow(10,max.length-1)))*Math.pow(10,max.length-1))
			$scope.LastMonthAvgPriceMaxY = (Math.ceil(max/Math.pow(10,max.length-1)))*Math.pow(10,max.length-1)
			$scope.chartFour()
		})
		//调用集团近一年均价走势图
		priceService.getqccpNearAvePri("ls").then(function(res) {
			$("#groupOneChart").height($(".carousel-inner").height()*0.72)
			$("#groupOneChart").width($(".carousel-inner").width())			
			//处理X轴的data数据
			res.Syqcjtyearjjzsdata.forEach(function(items) {
				$scope.NearAvePriXaxisData.push(items.qy_month)
				//处理series数据
				$scope.NearAvePriSeriesOne.push(items.wylx_cjjj)
			})
//			console.log($scope.NearAvePriXaxisData)
			$scope.chartOne()
			$scope.chartTwo()
			$scope.chartThree()
		})
		
		//		集团各物业类型近一年均价走势图
		priceService.getqccpNearClassAvePri("ls").then(function(res) {
			$("#groupTwoChart").height($(".carousel-inner").height()*0.72)
			$("#groupTwoChart").width($(".carousel-inner").width())
			if(window.innerWidth>1900){
				symbolSize = 10
			}else if(window.innerWidth<1400){
				symbolSize = 6
			}
//			console.log(".........................")
//			console.log(JSON.parse(res.洋房))
			//转换数据格式
			var ClassAvePriArr=[]
			for(var attr in res){
				ClassAvePriArr.push(JSON.parse(res[attr]))
			}

			console.log(ClassAvePriArr)
			//提取数据更新时间
			var date = ClassAvePriArr[0][ClassAvePriArr[0].length-1].ds_ts;  	
			$scope.updataTime = date.replace(/\..*/,"")
//			console.log($scope.updataTime)
			ClassAvePriArr.forEach(function(items){
				//第二个图表的图例的Data
				$scope.chartTwoLegendData.push({
					name:items[0].roomsort ,
					// 强制设置图形为方形带边框弧度。
					icon: 'roundRect',						
				})
				//第二个图标的series
				var tempDataArr = items.map(function(items){
					return items.wylx_cjjj
				})
				$scope.chartTwoSeries.push({
					name: items[0].roomsort,
					type: 'line',
					symbol: 'circle',
					symbolSize: symbolSize,
					data: tempDataArr,
				})
				
				
			})
			
//			console.log($scope.chartTwoSeries)

			$scope.chartTwo()
		})
		//劳斯莱斯产品近一年均价走势
		priceService.getqccpChartTHree("ls").then(function(res) {
			$("#groupThreeChart").height($(".carousel-inner").height()*0.72)
			$("#groupThreeChart").width($(".carousel-inner").width())
			if(window.innerWidth>1900){
				symbolSize = 10
			}else if(window.innerWidth<1400){
				symbolSize = 6
			}
			console.log(".........................")
			console.log(res)
			priceService.getqccpChartTHreeClass("ls").then(function(resClass) {
				
//				console.log(resClass.Syqclslsleidata)
				//遍历类型次				
				resClass.Syqclslsleidata.forEach(function(items){
					var tempArr =[]

					$scope.chartThreeLegend.push({
						name: items.roomtype,
						// 强制设置图形为方形带边框弧度。
						icon: 'roundRect',
					})
					res.Syqclslsjjdata.forEach(function(n){
						if(items.roomtype == n.roomtype){
							tempArr.push(n)
						}
					})
					console.log(".........................")
						//处理特殊情况，月份数据缺失情况
						//获取月份排序数组	处理特殊情况，月份数据缺失情况			
						var dataArr = $scope.NearAvePriXaxisData.map(function(item){
							return Number(item)
						})
						tempArr.forEach(function(items){
							for(var i=0;i<=dataArr.length-1;i++){
								if(items.qy_month==dataArr[i]){
									dataArr[i] = items
								}
							}
						})
						//把没有数据的项设置为空
						dataArr.forEach(function(items,i){
							if(typeof items=="number"){
								dataArr[i]=''
							}
						})
					
//					console.log(dataArr)
					$scope.chartThreeArr.push(dataArr)
				})
				console.log($scope.chartThreeArr)
				$scope.chartThreeArr.forEach(function(items){
					//数据缺失情况，获取series中name的值
					var roomtype =''
					var tempDataArr = items.map(function(m){
						if(m){
							roomtype = m.roomtype							
						}
						return Number(m.lsls_cjjj)						
					})
					
					$scope.chartThreeSeries.push({
						name: roomtype,
						type: 'line',
						symbol: 'circle',
						symbolSize: symbolSize,
						data: tempDataArr,
					})
					
				})
				console.log($scope.chartThreeSeries)
				$scope.chartThree()
				
			})
			//处理X轴的data数据
//			res.Syqcjtyearjjzsdata.forEach(function(items) {
//				$scope.NearAvePriXaxisData.push(items.qy_month)
//				//处理series数据
//				$scope.NearAvePriSeriesOne.push(items.wylx_cjjj)
//			})
		})
		//17年各区域溢价/破底情况
		priceService.getqccpChartFive("ls").then(function(res) {
//			console.log(".........................")
//			console.log(res)
			$scope.FiveChartDataZoom=8*100/(res.Syqcqyyjpddata.length)		
			res.Syqcqyyjpddata.forEach(function(items) {
//				年份
				$scope.qccpChartFiveTitle = items.year+"年各区域溢价/破底情况"
				//X轴的区域
				$scope.qccpChartFiveXData.push(items.areaname)
//				各区域溢破底金额
				var money = Number((items.zje/100000000).toFixed(2))
				if(money>0){
					$scope.qccpChartFiveSeriesOne.push({
						value: money,
						itemStyle: {
							normal: {
								//圆角
								barBorderRadius: [5, 5, 0, 0],
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: '#4C91CC'
								}, {
									offset: 1,
									color: '#55D5FA'
								}])
							}
						}
					})
				}else{
					$scope.qccpChartFiveSeriesOne.push({
						value:money,
						itemStyle: {
							normal: {
								//圆角
								barBorderRadius: [0, 0, 5, 5],
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: '#EA686A'
								}, {
									offset: 1,
									color: '#EE251B'
								}])
							}
						}
					})
				}
				//集团平均溢价率
				$scope.qccpChartFiveSeriesTwo.push(Number((items.jtyjl*100).toFixed(2)))
				//各区域溢价率
				$scope.qccpChartFiveSeriesThree.push(Number((items.qyyjl*100).toFixed(2)))
			})
//			console.log($scope.qccpChartFiveTitle,$scope.qccpChartFiveSeriesOne,$scope.qccpChartFiveSeriesTwo,$scope.qccpChartFiveSeriesThree)
			$scope.chartFive()
		})
		//qccp修改-end
	}]);
	
	controllers.filter("toThousands", function() {
		return function(num) {
			return Number(num).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
		}
	})
	controllers.filter("red", function() {
		return function(num) {
			if(num<60){
				return `11`
			}else{
				return num
			}
		}
	})
	controllers.filter("replaceArea", function() {
		return function(val) {
			return val.replace("区域","");
		}
	})
	controllers.filter("sliceFont", function($filter) {
		return function(input) {
			
			if(input.length > 10) {
				console.log(input)
				return $filter("limitTo")(input,10,0)+ '...'
			} else {
				return input
			}
		}
	})
	controllers.directive('repeatFinish',function(){
		return {
			link: function(scope,element,attr){
				if(scope.$last == true){
					//获取tip盒子的宽高，用于判断鼠标移到边缘的情况
					var tipBoxWidth = $(".tip").outerWidth()
					var tipBoxHeight = $(".tip").outerHeight()
					var tbodyWidth = $(".tbody").eq(1).outerWidth()
					var tbodyHeight = $(".tbody").eq(1).outerHeight()
					var scrollH = 0;
					$(".tbody").scroll(function(){
						scrollH = this.scrollTop
						console.log(scrollH)
					})
					console.log(111111111111111111111111111)
					console.log(document.querySelectorAll(".tbody")[1])
					document.querySelectorAll(".tbody")[1].addEventListener("click", function(e){
						//设置tip盒子的left值和top值
						e.stopPropagation()
						if($(e.target).parent().attr("data-tip")=="是"){
							$(".tip").css("display","block")
							var x = e.target.offsetLeft+e.offsetX
							var y = e.target.offsetTop+e.offsetY
							//tip盒子的坐标
	//						console.log(e.target.offsetLeft+e.offsetX,e.target.offsetTop+e.offsetY)
							//tip盒子的宽高
	//						console.log(tipBoxWidth,tipBoxHeight)
							//tbody(定位盒子)盒子的宽高
	//						console.log(tbodyWidth,tbodyHeight)
							//处理横向边缘
							if(x+tipBoxWidth>=tbodyWidth){
								//右
								x=x-tipBoxWidth	
								if(y+tipBoxHeight>=tbodyHeight+scrollH){
									//右下
									console.log("右下")
									y=y-tipBoxHeight-8
									$(".tip").removeClass("tl bl tr").addClass("br")
								}else{
									console.log("右上")
									y = y+8
									$(".tip").removeClass("tl bl br").addClass("tr")
								}
							}else{
								//左
								if(y+tipBoxHeight>=tbodyHeight+scrollH){
									//左下
									console.log("左下")
									y=y-tipBoxHeight-8
									$(".tip").removeClass("tl bl tr").addClass("bl")
								}else{
									console.log("左上")
									y = y+8
									$(".tip").removeClass("tl bl br").addClass("tl")
								}
								x = x-8
							}									
							document.querySelector(".tip").style.left=x+"px"
							document.querySelector(".tip").style.top=y+"px"							
						}else{
							$(".tip").css("display","none")
						}
					}, false);
					document.addEventListener("click",function(){
						$(".tip").css("display","none")
					})
						//鼠标移入事件
//					document.querySelectorAll(".tbody")[1].addEventListener("click", function(e){
//						//设置tip盒子的left值和top值
//						$(".tip").css("display","block")
//						
//					}, false);
//					//鼠标移出事件
//					document.querySelectorAll(".tbody")[1].addEventListener("mouseout", function(e){
//						//设置tip盒子的left值和top值
//						$(".tip").css("display","none")
//						
//					}, false);
					
					
				}
			}
		}
	})
});