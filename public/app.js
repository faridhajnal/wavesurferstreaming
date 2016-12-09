var app = angular.module('ngWavesurfer', []);

app.directive('ngWavesurfer', function () {
    return {
        restrict: 'E',

        link: function ($scope, $element, $attrs) {
            $element.css('display', 'block');

            var options = angular.extend({ container: $element[0] }, $attrs);
            var wavesurfer = WaveSurfer.create(options);

            if ($attrs.url) {
                wavesurfer.load($attrs.url, $attrs.data || null);
            }

            $scope.$emit('wavesurferInit', wavesurfer);
        }
    };
});

app.controller('PlaylistController', function ($scope) {


    $scope.songs = [
        {
            name : 'Periphery - Alpha',
            url : 'media/alpha.mp3',
            duration : '5:21'
        },
        {
            name : 'Periphery - MK Ultra',
            url : 'media/mkultra.mp3',
            duration : '2:54'
        },
        {
            name : 'Periphery - Psychosphere',
            url: 'media/psychosphere.mp3',
            duration: '6:12'
        }
        
        
        
    ];

    $scope.streamingAudios = [
            {
            name : 'Audio 1',
            url : 'http://localhost:5000/audio/audio1.mp3',
            duration : '0:07'
            },
            {
            name : 'Audio 2',
            url : 'http://localhost:5000/audio/audio2.mp3',
            duration : '0:06'
            },
            {
            name : 'Audio 3',
            url : 'http://localhost:5000/audio/audio3.mp3',
            duration : '0:11'
            },
            {
            name : 'Audio 4',
            url : 'http://localhost:5000/audio/audio4.mp3',
            duration : '9:25'
            }

    ];

    var activeUrl = null;

    $scope.paused = true;

    $scope.$on('wavesurferInit', function (e, wavesurfer) {
        $scope.wavesurfer = wavesurfer;

        $scope.wavesurfer.on('play', function () {
            $scope.paused = false;
        });

        $scope.wavesurfer.on('pause', function () {
            $scope.paused = true;
        });

        $scope.wavesurfer.on('finish', function () {
            $scope.paused = true;
            $scope.wavesurfer.seekTo(0);
            $scope.$apply();
        });
    });

    $scope.play = function (url) {
        if (!$scope.wavesurfer) {
            return;
        }

        activeUrl = url;

        $scope.wavesurfer.once('ready', function () {
            $scope.wavesurfer.play();
            console.log($scope.wavesurfer);
            $scope.$apply();
        });

        $scope.wavesurfer.load(activeUrl);
    };

    $scope.playPauseKey = function(e){
        if(e.keyCode===99){
            $scope.wavesurfer.playPause();
        }
        else if(e.keyCode===118){
            $scope.wavesurfer.skipBackward(2);
        }
        else if(e.keyCode===98){
            $scope.wavesurfer.skipForward(2);
        }
        else{
            console.log(e);
        }


        
    }

    $scope.isPlaying = function (url) {
        return url == activeUrl;
    };
});
