angular.module('starter.services', [])

  .service('Lessons', function() {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var lessons = [{
      id: 0,
      type: 'Translation',
      task: 'Please choose correct translation',
      question: 'The horizon is blue!',
      answers: ["Der Horizont ist blau!", "Das Wasser ist grün!", "Das Fell glänzt!", "Heute scheint die Sonne!"],
      correctAnswer: 'Der Horizont ist blau!',
      mediaURL: null,
    }, {
      id: 1,
      type: 'Listening',
      task: 'Please choose correct option',
      question: null,
      answers: ["Der Horizont ist blau!", "Das Wasser ist grün!", "Das Fell glänzt!", "Heute scheint die Sonne!"],
      correctAnswer: 'Der Horizont ist blau!',
      mediaURL: 'img/lesson1.mp3',//Pfad der Tonquelldatei
    }, {
      id: 2,
      type: 'Visualisation',
      task: 'What\'s the correct translation for the following Visualization?',
      question: null,
      answers: ["Hund", "Kleinkind", "Affe", "Fisch"],
      correctAnswer: 'Affe',
      mediaURL: 'img/affe.jpg', //Pfad der Bildquelldatei
    }, {
      id: 3,
      type: 'GapText',
      task: 'Please fill in the correct words!',
      question: ['Ich bin Vegetarier deshalb esse ich kein ','Jedoch ', ' ich gerne Milchshakes und zähle somit nicht zu den Veganern. Am liebsten esse ich' , 'oder Obst, da in diesen Lebensmitteln am meisten Vitamine enthalten sind!'],
      answers: ["Fleisch", "trinke", "Gemüse"],
      correctAnswer: ["Fleisch", "trinke", "Gemüse"],
      mediaURL: null, //Pfad der Tonquelldatei
    }];


    return {
      all: function() {
        return lessons;
      },
      get: function(lessonId) {
        for (var i = 0; i < lessons.length; i++) {
          if (lessons[i].id === parseInt(lessonId)) {
            return lessons[i];
          }
        }
        return null;
      },
      getAllOfType: function(lessonType) {
        var tempArr = null;
        for (var i = 0; i < lessons.length; i++) {
          if (lessons[i].type === lessonType ) {
            tempArr.add(lessons[i]);
          }
        }
        return tempArr;
      },



	  searchItem: function(searchString){
        var tempArr = [];
		    for (var i = 0; i < lessons.length; i++) {
				if (lessons[i].task.indexOf(searchString) !=-1) {
					tempArr.push(lessons[i]);
					continue;
				}
				if (lessons[i].type.indexOf(searchString) !=-1) {
					tempArr.push(lessons[i]);
					continue;
				}
			}
        return tempArr

	  }


    };
  })
    .service('Score', function() {
		var lessonScore = 15.0;
		
		return {
			getScore: function(){
				return lessonScore;
			},
			setScore: function(theScore){
				lessonScore = theScore;
			},
		};
	  })	
  .service('Images', function() {
	  var imagesArray = [
	  {
			id: 0,
			text: 'You failed :-(',
			mediaURL: 'img/fail.gif',
	  },{
			id: 1,
			text: 'good',
			mediaURL: 'img/feuerwerk01.gif',
	  },{
			id: 2,
			text: 'better',
			mediaURL: 'img/feuerwerk02.gif',
	  },{
			id: 3,
			text: 'excellent!',
			mediaURL: 'img/feuerwerk03.gif',
	  }];

	  return {

		displayImage: function(scoreValue){

			//var num = Math.floor(Math.random() * (imagesArray.length+1));
			var num = Math.floor(scoreValue * 4 / 100);
			//the second statement display the random image from the imagesArray array in the canvas image using the random number as the subscript value
			return imagesArray[num];

		},
	  };

  });
