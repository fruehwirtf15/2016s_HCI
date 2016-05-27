angular.module('starter.services', [])

  .service('Lessons', function() {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var lessons = [{
      id: 0,
      type: 'Translation',
      task: 'Please choose correct translation',
      question: 'The horizon is blue!',
      answers: ["Der Horizont ist blau!", "Das Wasser ist gruen!", "Das Fell glaenzt!", "Heute scheint die Sonne!"],
      correctAnswer: 'Der Horizont ist blau!',
      mediaURL: null
    }, {
      id: 1,
      type: 'Listening',
      task: 'Please choose correct option',
      question: null,
      answers: ["Der Horizont ist blau!", "Das Wasser ist gruen!", "Das Fell glaenzt!", "Heute scheint die Sonne!"],
      correctAnswer: 'Der Horizont ist blau!',
      mediaURL: null //Pfad der Tonquelldatei
    }, {
      id: 2,
      type: 'Visualisation',
      task: 'What\'s the correct translation for the following Visualization?',
      question: null,
      answers: ["Hund", "Kleinkind", "Affe", "Fisch"],
      correctAnswer: 'Affe',
      mediaURL: null //Pfad der Bildquelldatei
    }, {
      id: 3,
      type: 'GapText',
      task: 'Please fill in the correct words!',
      question: 'Ich bin Vegetarier deshalb esse ich kein ____ ! Jedoch ____ ich gerne Milchshakes und zähle somit'  +
        'nicht zu den Veganern. Am liebsten esse ich ____ oder Obst, da in diesen Lebensmitteln am meisten Vitamine enthalten sind!',
      answers: ["Fleisch", "trinke", "Gemuese"],
      correctAnswer: ["Fleisch", "trinke", "Gemuese"],
      mediaURL: null //Pfad der Tonquelldatei
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
				//if ( i === 2) {
				if (lessons[i].task.indexOf(searchString) !=-1) {
					tempArr.push(lessons[i]);
				}
			}
        return tempArr
		  
	  }

    };
  });
