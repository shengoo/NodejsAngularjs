/**
 * Created by UC165867 on 3/25/14.
 */
var CarApp = angular.module('CarApp',['ngResource','ngRoute'])

.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
    $routeProvider
        .when('/',{
            controller:'ListCtrl',
            templateUrl:'partials/list.html'
        })
        .when('/edit/:projectId', {
            controller:'EditCtrl',
            templateUrl:'partials/detail.html'
        })
        .when('/create', {
            controller:'CreateCtrl',
            templateUrl:'partials/detail.html'
        })
        .otherwise({redirectTo:'/'})
        $locationProvider.html5Mode(true)
}])

.factory('Cars',function($resource){
    return $resource('/api/cars/:id',{id:'@id'},{update:{method:'PUT'}})
})
.controller('ListCtrl',['$scope',function($scope){
        $scope.cars = [{title:"title"},{title:"title2"}];
}])
