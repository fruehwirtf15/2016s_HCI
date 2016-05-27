angular.module('starter.controllers', [])

  .controller('LoginCtrl', function($scope, $ionicHistory) {
    $scope.$on('$ionicView.enter', function(){
      $ionicHistory.nextViewOptions({
        disableBack: true
      })
    });
  })

  .controller('MainMenuCtrl', function($scope){
  })
  
  .controller('DictionaryCtrl', function ($scope) {
  })

  .controller('BrowseCtrl', function ($scope, Lessons) {
    $scope.lessons = Lessons.all();
  })

  .controller('SearchCtrl', function ($scope) {
	 
  })
  
    .controller('SearchCtrl', function ($scope, Lessons) {
	  

  })
  
      .controller('SearchResultCtrl', function ($scope, Lessons) {
		  $scope.lessons = Lessons.searchItem('choose');
	  

  })

  .controller('SettingsCtrl', function ($scope) {

  })

  .controller('StatusCtrl', function ($scope) {
  })

  .controller('LessonCtrl', function ($scope, $stateParams, Lessons) {
    $scope.lessons = Lessons.all();
    $scope.lesson = Lessons.get($stateParams.lessonId);
    $scope.play = function(url) {
      // Play the audio file at url
      var my_media = new Media(url,
        // success callback
        function () {
          console.log("playAudio():Audio Success");
        },
        // error callback
        function (err) {
          console.log("playAudio():Audio Error: " + err);
        }
      );
      // Play audio
      my_media.play();
    };

    $scope.checkbox = {
      checked0: false,
      checked1: true,
      checked2: false,
      checked3: false,

    };


    $scope.updateSelection = function(position) {
      if(position == 1){
        alert("Hallo");
      }
    }
  });
