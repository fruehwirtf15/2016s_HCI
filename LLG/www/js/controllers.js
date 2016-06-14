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

  .controller('SearchResultCtrl', function ($scope, $stateParams,  Lessons) {
		  //searchString
		  $scope.lessons = Lessons.searchItem($stateParams.searchString);
  })

  .controller('SettingsCtrl', function ($scope) {

  })

  .controller('StatusCtrl', function ($scope, Images, Score) {
	  $scope.image = Images.displayImage(Score.getScore());
  })

  .controller('LessonCtrl', function ($scope, $stateParams, Lessons, $state, $ionicPopup) {
    $scope.lessons = Lessons.all();
    $scope.lesson = Lessons.get($stateParams.lessonId);
    $scope.selection = {choice: {}};
    $scope.selectionGT = {
      choice0:{},
      choice1:{},
      choice2:{}
    }

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
    }
    $scope.checkAnswer = function (id) {
      if($scope.lesson.type === 'GapText'){
        if($scope.selectionGT.choice0 === $scope.lesson.correctAnswer[0] && $scope.selectionGT.choice1 === $scope.lesson.correctAnswer[1] && $scope.selectionGT.choice2 === $scope.lesson.correctAnswer[2]){
          $scope.showPopupSuccess();
          $scope.nextLesson(id);
        }else{
          $scope.showPopupFail();
        }
      }else{
        if($scope.selection.choice === $scope.lesson.correctAnswer){
          $scope.showPopupSuccess();
          $scope.nextLesson(id);
        }else{
          $scope.showPopupFail();
        }
      }
    }
    $scope.nextLesson = function(id){
      if((id+1) < $scope.lessons.length){
        $state.go('lesson', {lessonId: id+1});
      }else {
        $state.go('lesson', {lessonId: 0});
      }
    }
    $scope.getValue = function (index, myValue) {
      if(index === 0){
        $scope.selectionGT.choice0 = myValue;
      }else if(index === 1){
        $scope.selectionGT.choice1 = myValue;
      }else if(index === 2) {
        $scope.selectionGT.choice2 = myValue;
      }
    }
    $scope.showPopupSuccess = function() {
      $scope.data = {}

      // Custom popup
      var myPopup = $ionicPopup.show({
        title: "Congratulation!",
        subTitle: "You did it!",
        template: '<img width="75px" height="75px" src="img/trueCheck.png">',
        scope: $scope,
        cssClass: 'popup_style',

        buttons: [
          {text: 'Save'}
        ]
      });
    }
    $scope.showPopupFail = function() {
      $scope.data = {}

      // Custom popup
      var myPopup = $ionicPopup.show({
        title: "Sorry!",
        subTitle: "That's the wrong answer! Please try again!",
        template: '<img width="75px" height="75px" src="img/falseCheck.png">',
        scope: $scope,
        cssClass: 'popup_style',

        buttons: [{text: 'Cancel'}]
      });
    };
  });
