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

  .controller('BrowseCtrl', function ($scope) {
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
    //alert($stateParams.lessonId);
    $scope.lessons = Lessons.all();
    $scope.lesson = Lessons.get($stateParams.lessonId);
  });
