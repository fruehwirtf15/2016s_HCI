angular.module('starter.controllers', [])

  .controller('LoginCtrl', function($scope, $ionicHistory) {
    $scope.$on('$ionicView.enter', function(){
      $ionicHistory.nextViewOptions({
        disableBack: true
      })
    });
  })

  .controller('MainMenuCtrl', function($scope, Lessons, $state, $ionicPopup, $ionicHistory){
    $scope.lessons = Lessons.all();

    $scope.getLastLesson = function () {
      var lastLesson = window.localStorage.getItem("lastLesson");
      if(lastLesson === null){
        window.localStorage.setItem("lastLesson", 0);
        $state.go('lesson', {lessonId: 0});
      }else{
        $scope.goToNextLesson(lastLesson);
      }
    }
    $scope.goToNextLesson = function(id) {
      var counter = 0;

      while(counter < $scope.lessons.length){
        if(id < $scope.lessons.length){
          if(window.localStorage.getItem(id) !== null){
            id++;
            counter++;
          }else{
            window.localStorage.setItem("lastLesson", id);
            $state.go('lesson', {lessonId: id});
            return;
          }
        }else{
          id = 0;
        }
      }
      $scope.showNoMoreLessons();
    }
    $scope.showNoMoreLessons = function() {
      // Custom popup
      var myPopup = $ionicPopup.show({
        title: "Sorry!",
        subTitle: "You did all existing Lessons with Success! To reset your SaveData, please navigate to Settings!",
        template: '<img width="75px" height="75px" src="img/falseCheck.png">',
        scope: $scope,
        cssClass: 'popup_style',

        buttons: [
          {text: 'Back to Menu',
            onTap: function () {
              $state.go('mainMenu');
            }}
        ]
      });
    }
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

  .controller('SettingsCtrl', function ($scope, $state, $ionicPopup) {
    $scope.resetData = function () {
      $scope.showWarning();
    }
    $scope.removeData = function (){
      window.localStorage.clear();
    }

    $scope.showWarning = function() {
      // Custom popup
      var myPopup = $ionicPopup.show({
        title: "WARNING!",
        subTitle: "Do you really want to reset all your learning progress?\nThis process could NOT be undone!",
        template: '<img width="75px" height="75px" src="img/falseCheck.png">',
        scope: $scope,
        cssClass: 'popup_style',

        buttons: [
          {text: 'Cancel',
            onTap: function () {
              $state.go("settings");
            }},
          {text: 'Reset',
            onTap: function () {
              $scope.removeData();
              $scope.showResetSuccess();
            }}
        ]
      });
    }

    $scope.showResetSuccess = function() {
      // Custom popup
      var myPopup = $ionicPopup.show({
        title: "Reset Successfully Done",
        subTitle: "Your learning progress data had been deleted! You can now try again!",
        template: '<img width="75px" height="75px" src="img/trueCheck.png">',
        scope: $scope,
        cssClass: 'popup_style',

        buttons: [
          {text: 'OK',
            onTap: function () {
              $state.go("settings");
            }}
        ]
      });
    }
  })

  .controller('StatusCtrl', function ($scope, Images) {
	  $scope.image = Images.displayImage();
  })

  .controller('LessonCtrl', function ($scope, $stateParams, Lessons, $state, $ionicPopup, $ionicHistory) {
    $scope.$on('$ionicView.enter', function(){
      if($ionicHistory.backTitle() !== "Main Menu"){
        $ionicHistory.removeBackView();
      }
    });

    $scope.lessons = Lessons.all();
    $scope.lesson = Lessons.get($stateParams.lessonId);
    $scope.selection = {choice: {}};
    $scope.selectionGT = {
      choice0:{},
      choice1:{},
      choice2:{}
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

    $scope.saveData = function(id) {
        $scope.updateScore();
        window.localStorage.setItem(id, id);
    }

    $scope.updateScore = function () {
      if(window.localStorage.getItem("Score") !== null){
        var temp = window.localStorage.getItem("Score");
        window.localStorage.setItem("Score", temp);
      }else{
        window.localStorage.setItem("Score", 1);
      }
    }

    $scope.checkLessonDone = function(id) {
        if(window.localStorage.getItem(id) === null){
          return false; //return false, if lesson is able to play.
        }else{
          return true;  //return true, if lesson successfully was played at this point.
        }
    }

    $scope.goToNextLesson = function(id) {
      var counter = 0;

      while(counter < $scope.lessons.length){
        if(id < $scope.lessons.length){
          if($scope.checkLessonDone(id)){
            id++;
            counter++;
          }else{
            window.localStorage.setItem("lastLesson", id);
            $state.go('lesson', {lessonId: id});
            return;
          }
        }else{
          id = 0;
        }
      }
      $scope.showNoMoreLessons();
    }

    $scope.checkAnswer = function (id) {
      if($scope.lesson.type === 'GapText'){
        if($scope.selectionGT.choice0 === $scope.lesson.correctAnswer[0] && $scope.selectionGT.choice1 === $scope.lesson.correctAnswer[1] && $scope.selectionGT.choice2 === $scope.lesson.correctAnswer[2]){
          $scope.showPopupSuccess(id);
        }else{
          $scope.showPopupFail();
        }
      }else{
        if($scope.selection.choice === $scope.lesson.correctAnswer){
          $scope.showPopupSuccess(id);
        }else{
          $scope.showPopupFail();
        }
      }
    }


    $scope.showPopupSuccess = function(id) {
      $scope.saveData(id);
      // Custom popup
      var myPopup = $ionicPopup.show({
        title: "Congratulation!",
        subTitle: "You did it!",
        template: '<img width="75px" height="75px" src="img/trueCheck.png">',
        scope: $scope,
        cssClass: 'popup_style',

        buttons: [
          {text: 'Cancel',
            onTap: function () {
              $state.go("mainMenu");
            }},
          {text: 'Next',
           onTap: function () {
             $scope.goToNextLesson(id);
           }}
        ]
      });
    }

    $scope.showPopupFail = function() {
      // Custom popup
      var myPopup = $ionicPopup.show({
        title: "Sorry!",
        subTitle: "That's the wrong answer! Please try again!",
        template: '<img width="75px" height="75px" src="img/falseCheck.png">',
        scope: $scope,
        cssClass: 'popup_style',

        buttons: [{text: 'Try again'}]
      });
    }

    $scope.showNoMoreLessons = function() {
      // Custom popup
      var myPopup = $ionicPopup.show({
        title: "Sorry!",
        subTitle: "You did all existing Lessons with Success! To reset your SaveData, please navigate to Settings!",
        template: '<img width="75px" height="75px" src="img/falseCheck.png">',
        scope: $scope,
        cssClass: 'popup_style',

        buttons: [
          {text: 'Back to Menu',
           onTap: function () {
             $ionicHistory.nextViewOptions({
               disableBack: true
             })
             $state.go('mainMenu');
           }}
        ]
      });
    };
  });
