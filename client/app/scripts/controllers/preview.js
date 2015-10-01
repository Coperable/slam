'use strict';

angular.module('previewApp')
.controller('preview-main', function ($scope, $rootScope) {

    $scope.setup_components = function() {
        setTimeout(function() {
            $("#home_slider_2").carousel({
                interval:7e3
            });
        }, 1000);
    };

    $scope.setup_components();

});


