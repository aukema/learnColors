angular.module('starter.controllers', [])

.controller('DashCtrl', function($log, $scope) {
  $scope.colors = [
  {name: 'Rood', css: 'assertive' }, 
  {name: 'Geel', css: 'energized'}, 
  {name: 'Groen', css: 'balanced'},
  {name: 'Blauw', css: 'positive'},
  {name: 'Paars', css: 'royal'}, 
  {name: 'Wit', css: 'light'},
  {name: 'Grijs', css: 'stable'},
  {name: 'Zwart', css: 'dark'}
  ];

  $scope.speak = function(txt){
    $log.log('Speak: ' + txt);
      TTS
    .speak({text: txt,
      locale: 'nl-NL'
    }, function () {
        //alert('success');
    }, function (reason) {
        //failure
        alert(reason);
    });
  }
})

.controller('ChatCtrl', function($log, $scope) {
  
  $scope.colors = [
  {name: 'Rood', css: 'assertive'}, 
  {name: 'Geel', css: 'energized'}, 
  {name: 'Groen', css: 'balanced'},
  {name: 'Blauw', css: 'positive'},
  {name: 'Paars', css: 'royal'}, 
  {name: 'Wit', css: 'light'},
  {name: 'Grijs', css: 'stable'},
  {name: 'Zwart', css: 'dark'}
  ];

  $scope.currentcolor;
  $scope.numberofanswers = 4;
  $scope.answers = [];

  $scope.init = function(){
    $scope.reset();
  }

  $scope.reset = function(){ 
    previous = $scope.currentcolor;
    temp = $scope.randomcolor();
    if(temp == previous){
      $log.log('Dubbele kleur: ' + temp.name);
      $scope.reset();
    }
    $scope.currentcolor = temp;

    $scope.answers = [];
    //put all colors in the answer array
    $scope.answers = $scope.answers.concat($scope.colors);
    //remove current color
    $scope.answers.splice($scope.answers.indexOf($scope.currentcolor), 1);
    //shuffle and pick first part
    $scope.answers = $scope.shuffleArray($scope.answers);
    $scope.answers = $scope.answers.slice(0,$scope.numberofanswers-1);
    //push back correct answer and reshuffle
    $scope.answers.push($scope.currentcolor);
    $scope.answers = $scope.shuffleArray($scope.answers);

    $scope.speak($scope.currentcolor.name);
  }

  $scope.randomcolor = function(){
    return $scope.colors[Math.floor(Math.random() * $scope.colors.length)];
  }

  $scope.check = function(answer){
    if($scope.answers[answer] == $scope.currentcolor){
      $scope.reset();
    }
  }

  $scope.shuffleArray = function(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }

  $scope.speak = function(txt){
    $log.log('Speak: ' + txt);
      TTS
    .speak({text: txt,
      locale: 'nl-NL'
    }, function () {
        //alert('success');
    }, function (reason) {
        //failure
        alert(reason);
    });
  }

});
