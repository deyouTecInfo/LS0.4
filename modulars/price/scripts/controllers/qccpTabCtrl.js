define(["./controllers"], function(controllers) {
	"use strict";
	controllers.controller("qccpTabCtrl", ["$scope", "$state", "priceService", '$rootScope', '$tool', function($scope, $state, priceService, $rootScope, $tool) {
//		$("body").height(window.innerHeight)
//		$(".qccpTab").height(window.innerHeight)
		
		$scope.Syqcqyyjpdxzdata = []
//		$scope.myprint=function(){}
		$scope.goHome = function(){
			//兼容火狐
			$("body").removeClass('bgc')
			$state.go('qccp');
		}
		console.log($state.params.area)
		priceService.getqccpTab("ls",[$state.params.area]).then(function(res) {
			console.log(".........................")
			$scope.Syqcqyyjpdxzdata = res.Syqcqyyjpdxzdata
			console.log(res.Syqcqyyjpdxzdata)
			
			//处理X轴的data数据
//			res.Syqcjtyearjjzsdata.forEach(function(items) {
//				$scope.NearAvePriXaxisData.push(items.qy_month + "月")
//				//处理series数据
//				$scope.NearAvePriSeriesOne.push(items.wylx_cjjj)
//			})
		})
	}]);
	//自定义指令repeatFinish
	controllers.directive('repeatFinishtwo',function(){
		return {
			link: function(scope,element,attr){
//				console.log(scope.$index)
				if(scope.$last == true){
					console.log('ng-repeat执行完毕')
					console.log($(".qccpTab").height())
					console.log(window.innerHeight)
					if($(".qccpTab").height()<window.innerHeight){
						$(".qccpTab").height(window.innerHeight)
						console.log(111)
						
					}else{
						//兼容火狐
						$("body").addClass('bgc')
					}
				}
			}
		}
	})
	controllers.filter("toThousands", function() {
		return function(num) {
			return Number(num).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
		}
	})
});