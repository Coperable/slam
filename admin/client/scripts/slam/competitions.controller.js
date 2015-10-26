(function () {
'use strict';

angular.module('app.competitions')
.controller('competition-edit', ['$scope', '$window', '$location', '$state', '$stateParams', '$timeout', 'api_host', 'logger', 'Competition', function($scope, $window, $location, $state, $stateParams, $timeout, api_host, logger, Competition) {

    $scope.format = 'dd/MM/yyyy';
    $scope.events = [ ];

    $scope.today = function() {
        $scope.event_date = new Date();
    };

    $scope.clear = function () {
        $scope.event_date = null;
    };

    $scope.disabled = function(date, mode) {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function() {
        $scope.minDate = $scope.minDate ? null : new Date();
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };


    $scope.torneo = {};

    if($stateParams.competitionId) {
        Competition.get({
            id: $stateParams.competitionId
        }, function(data) {
            $scope.torneo = data;
            $scope.event_date = moment($scope.torneo.event_date);
            $scope.setup_component();
        });

    } else {
        $scope.torneo = new Competition({
            region_id: $stateParams.regionId
        });
        $timeout(function() {
            $scope.setup_component();
        }, 1000);

    }


    $scope.canSubmit = function() {
        return $scope.torneo_form.$valid;
    };

    $scope.revert = function() {
        $scope.torneo = new Competition({});
    };

    $scope.submitForm = function() {
        if($scope.torneo.id) {
            $scope.torneo.$update(function() {
                logger.logSuccess("El torneo fue actualizado con éxito!"); 
                $state.go('competition-view', {
                    competitionId: $scope.torneo.id
                }); 
            }).catch(function(response) {
                logger.logError(response.message); 
            });
        } else {
            $scope.torneo.$save(function() {
                logger.logSuccess("El torneo fue creado con éxito!"); 
                $state.go('competition-view', {
                    competitionId: $scope.torneo.id
                }); 
            }).catch(function(response) {
                logger.logError(response.message); 
            });
        }


    };
    $scope.setup_component = function () {
        var input = document.getElementById('torneo-location'),
        options = {
            types: ['address'],
            componentRestrictions: {country: 'ar'}
        };
        var searchBox = new google.maps.places.Autocomplete(input, options);

        searchBox.addListener('place_changed', function() {
            var place = searchBox.getPlace();
            $scope.torneo.location = place;
        });

        $scope.today();


        $('#torneo_event_date').bootstrapMaterialDatePicker({  
            format : 'DD MM YYYY HH:mm',  
            minDate : new Date(), 
            currentDate: $scope.event_date,
            lang: 'es'  
        }).on('change', function(e, date) { 
            $scope.torneo.event_date = date; 
        }); 

    }



    $scope.upload_url = api_host+"/api/media/upload";
    $scope.uploading = false;

    $scope.onUpload = function(response) {
        $scope.uploading = true;
    };

    $scope.onError = function(response) {
        $scope.uploading = false;
        console.log('error');
    };

    $scope.onComplete = function(response) {
        $scope.uploading = false;
        $scope.torneo.cover_photo = response.data.filename;
    };

    /*

    $scope.onSuccess = function(response) {
        console.log('success');
        $http.get(api_host+'/api/providers/'+$scope.profile.id+'/medias').success(function(medias) {
            $scope.medias = medias;
        });
    };
    */



}])
.controller('competitions-list', ['$scope', '$http', '$state', 'api_host', 'Competition', function($scope, $http, $state, api_host, Competition) {
   
    /*
    Competition.query(function(data) {
        $scope.competitions = data;
    });
    */

    $scope.view = function(id) {
        console.log('view '+id);
        $state.go('competition-view', {
            competitionId: id
        }); 
    };

    $scope.edit = function(id) {
        $state.go('competition-edit', {
            competitionId: id
        }); 
    };



}])
.controller('competition-view', ['$scope', '$window', 'Competition', '$location', '$state', '$stateParams', function($scope, $window, Competition, $location, $state, $stateParams) {
    $scope.competition = {};

    $scope.show_participants = true;
    $scope.show_videos = false;
    $scope.show_cups = false;

    console.log('competition view');

    Competition.get({
        id: $stateParams.competitionId
    }, function(data) {
        $scope.competition = data;
        $scope.participants = $scope.competition.participants;
    });

    $scope.showParticipants = function() {
        console.log('click in participants');
        $scope.show_participants = true;
        $scope.show_videos = false;
        $scope.show_cups = false;
    };

    $scope.showVideos = function() {
        console.log('click in videos');
        $scope.show_participants = false;
        $scope.show_videos = true;
        $scope.show_cups = false;
    };

    $scope.showCups = function() {
        console.log('click in cups');
        $scope.show_participants = false;
        $scope.show_videos = false;
        $scope.show_cups = true;
    };

    $scope.edit = function(id) {
        $state.go('competition-edit', {
            competitionId: id
        }); 
    };



}])
.controller('competition-participants', ['$scope', 'Competition', function($scope, Competition) {
    $scope.participants = [];

    $scope.viewParticipant = function(id) {
        console.log('view '+id);
        $state.go('participant-view', {
            participantId: id
        }); 
    };

    $scope.addParticipant = function() {

    };
    console.log('competition participants');


}])
.controller('competition-videos', ['$scope', 'Competition', function($scope, Competition) {
    $scope.videos = [];


    console.log('competition videos');


}])
.controller('competition-cups', ['$scope', 'Competition', function($scope, Competition) {
    $scope.mentions = [];


    console.log('competition cups');


}]);



})(); 




