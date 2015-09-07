'use strict';

/**
 * @ngdoc function
 * @name slamApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the slamApp
 */
angular.module('slamApp')
.controller('MainCtrl', function ($scope) {

    $scope.setup_components = function() {
        setTimeout(function() {
            $("#home_slider_2").carousel({
                interval:7e3
            });
        }, 1000);
    };

    $scope.setup_components();
})
.controller('revista-view', function ($scope) {

})
.controller('torneo-view', function ($scope) {

})
.controller('foro-view', function ($scope) {

})
.controller('profile-view', function ($scope) {

});

