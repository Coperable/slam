'use strict';

/**
 * @ngdoc function
 * @name slamApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the slamApp
 */
angular.module('slamApp')
.controller('MainCtrl', function ($scope, $rootScope) {

	$rootScope.home_page = true;
    $scope.setup_components = function() {
        setTimeout(function() {
            $("#home_slider_2").carousel({
                interval:7e3
            });
        }, 1000);
    };

    $scope.setup_components();
	$scope.participantes = 25;
	$scope.torneos = 10;

	$scope.changeLocalidad = function(localidad) {
		$scope.participantes = 60;	
		$scope.torneos = 30;	
	};
})
.controller('revista-view', function ($scope, $rootScope) {
	$rootScope.home_page = false;

})
.controller('torneo-view', function ($scope, $rootScope) {
	$rootScope.home_page = false;

})
.controller('torneo-list', function ($scope, $rootScope) {
	$rootScope.home_page = false;
})
.controller('user-signup', function ($scope, $rootScope) {
	$rootScope.home_page = false;
})
.controller('video-list', function ($scope, $rootScope) {
	$rootScope.home_page = false;
})
.controller('jugador-view', function ($scope, $rootScope) {
	$rootScope.home_page = false;
})
.controller('jugador-list', function ($scope, $rootScope) {
	$rootScope.home_page = false;
})
.controller('foro-view', function ($scope, $rootScope) {
	$rootScope.home_page = false;

})
.controller('profile-view', function ($scope, $rootScope) {
	$rootScope.home_page = false;

});

