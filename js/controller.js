var app = angular.module('test', []);

app.controller('DataListCtrl', function ($scope,$http){
	 $scope.counter=0;
	$http.get("js/data.json")
  .then(function(response){ $scope.datalist = response.data; });
	$scope.isDelete=1;
	$scope.veg=[];
	$scope.fruit=[];
	$scope.setData=function(counter,type){
		if(($scope.datalist.length-1)>($scope.counter)){
			var item_color=$("select#fruit_color").val();
			$scope.datalist[$scope.counter].attr1=item_color;
			if(type=="veg"){
				console.log($scope.datalist[$scope.counter]);
				$scope.veg.push($scope.datalist[$scope.counter]);
			}else{
				$scope.fruit.push($scope.datalist[$scope.counter]);
			}
			$scope.counter = counter + 1;		
		}
	};

	$scope.undoData=function(){
		if($scope.counter>=0 && $scope.counter!=0){
			$scope.counter = $scope.counter - 1;		
		}
		var global = $scope.datalist[$scope.counter];
		var veg_array = $scope.veg[($scope.veg.length-1)];
		var fruit_array = $scope.fruit[($scope.fruit.length-1)];

		if(global==veg_array && veg_array!=undefined){
			$scope.veg.pop();
		}
		else if(global==fruit_array && fruit_array!=undefined){
			$scope.fruit.pop();
		}else{
		}
	};
	$scope.del="Yes";
	$scope.orderby='$index';
	$scope.orderbydata=function(val){
		if(val=='name'){
			$scope.orderby='name';	
			$("span#span_name").css("color","#337ab7");
			$("span#span_size").css("color","");
		}else{
			$scope.orderby='name.length';				
			$("span#span_size").css("color","#337ab7");
			$("span#span_name").css("color","");
		}
	};
	$scope.deleteItem=function(id,type){
		if($scope.del=="Yes") $scope.isDelete=1;
		else $scope.isDelete=0;
		
		if($scope.isDelete==1){
			if(type=="veg"){
				console.log($scope.datalist[$scope.counter]);
				$scope.veg.splice(id, 1);
				//$scope.veg.push($scope.datalist[$scope.counter]);
			}else{
				$scope.fruit.splice(id, 1);
				//$scope.fruit.push($scope.datalist[$scope.counter]);
			}
		}
	};
	$scope.arrowUp=function(id,type){
		console.log("id->"+id);
		console.log($scope.veg);
		if(type=='veg'){
			if(id!=0){
				var tmp = $scope.veg[id];
				$scope.veg[id]=$scope.veg[(id-1)];
				$scope.veg[(id-1)]=tmp;		
			}
		}
		else if(type=='fruit'){
			if(id!=0){
				var tmp = $scope.fruit[id];
				$scope.fruit[id]=$scope.fruit[(id-1)];
				$scope.fruit[(id-1)]=tmp;		
			}
		}
	};

	$scope.arrowDown=function(id,type){
		if(type=='veg'){
			if($scope.veg.length!=(id+1)){
				var tmp = $scope.veg[id];
				$scope.veg[id]=$scope.veg[(id+1)];
				$scope.veg[(id+1)]=tmp;		
			}
		}
		else if(type=='fruit'){
			if($scope.fruit.length!=(id+1)){
				var tmp = $scope.fruit[id];
				$scope.fruit[id]=$scope.fruit[(id+1)];
				$scope.fruit[(id+1)]=tmp;		
			}
		}
	}
});