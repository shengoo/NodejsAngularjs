/**
 * Created by UC165867 on 3/25/14.
 */
var CarApp = angular.module('CarApp',['ngResource','ngRoute'])

.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
    $routeProvider
        .when('/',{
            controller:'ListCtrl',
            templateUrl:'/partials/list.html'
        })
        .when('/edit/:id', {
            controller:'EditCtrl',
            templateUrl:'/partials/detail.html'
        })
        .when('/create', {
            controller:'CreateCtrl',
            templateUrl:'partials/detail.html'
        })
        .otherwise({redirectTo:'/'})
        $locationProvider.html5Mode(true);
}])

.factory('CarsService',function($resource){
    return $resource('/api/cars/:id',{id:'@id'},{update:{method:'PUT'}});
})
.controller('ListCtrl',['$scope','CarsService',function($scope,CarsService){
    $scope.cars = CarsService.query();
    $scope.selectid = -1;//current select item

    $scope.select = function(id){
        if($scope.selectid === id){
            $scope.selectid = -1;
        }else {
            $scope.selectid = id;
        }
    }

    $scope.delcar = function(){
        if($scope.selectid >= 0){
            CarsService.delete({id:$scope.selectid});
            $scope.cars = CarsService.query();
        }
    }
}])

.controller('EditCtrl',['$scope','$location','$routeParams','CarsService',function($scope,$location,$routeParams,CarsService){
    $scope.car = [];
    var id = $routeParams.id;
    CarsService.get({id:id},function(resp){
        if(resp.code === 1){
            $scope.car = resp.content;
        }else{
            //err handle
        }

        console.log(resp)
    });
    $scope.updcar = function(){
        $location.path("/");
    }
}])

.controller('CreateCtrl',['$scope','$location','$routeParams','CarsService',function($scope,$location,$routeParams,CarsService){
    $scope.car = [];

}])