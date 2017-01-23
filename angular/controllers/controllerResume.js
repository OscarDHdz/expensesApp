app.controller('resumeCtrl', ['$scope',  function ( $scope ) {

  $scope.arrayByGroups = [];
  $scope.peopleGroups = {};
  $scope.setGroups = function () {
    var temporalGroups = {};
    for( var i = 0; i < $scope.expenses.length; i++ ) {
      /*TODO: if ( $scope.expenses[i].users.length === $scope.availableUsers.length ){
        $scope.expenses[i].users = 'All';
      }*/
      if ( temporalGroups[$scope.expenses[i].users.toString()] === undefined ){
        temporalGroups[ $scope.expenses[i].users.toString() ] = [
            {
              title: $scope.expenses[i].title,
              from : $scope.expenses[i].from,
              amount: $scope.expenses[i].amount
            }
        ];
      }
      else {
        temporalGroups[ $scope.expenses[i].users.toString() ].push(
            {
              title: $scope.expenses[i].title ,
              from : $scope.expenses[i].from,
              amount: $scope.expenses[i].amount
            }
          );
      }

    }

    console.log(temporalGroups);
    $scope.peopleGroups = temporalGroups;
  }

  $scope.getOwedMoneyFromBy = function ( by ) {
    var owesTo = {};
    for ( var i = 0; i < $scope.expenses.length; i++ ) {
      // IF owe from this expense
      if ( $scope.expenses[i].users.indexOf( by ) !== -1  ) {
        //console.log(by, 'owes at', $scope.expenses[i].title, $scope.expenses[i].users );

        if ( owesTo[$scope.expenses[i].from] === undefined ) {
          owesTo[$scope.expenses[i].from] = Math.round($scope.expenses[i].amount / $scope.expenses[i].users.length);
        }
        else {
          owesTo[$scope.expenses[i].from] += Math.round($scope.expenses[i].amount / $scope.expenses[i].users.length);
        }

      }
    }

    return owesTo;
  }

  $scope.setGroups();


  $scope.exportResumeFor = function () {

    var resumeName =  $('#selectBy').val();
    if ( resumeName === '' ) {
      if ( $('#fileName').val().length === 0 ) {
        resumeName = 'DashBoard';
      }
      else {
        resumeName = $('#fileName').val();
      }

    }
    else {
      if (  $('#fileName').val().length === 0 ) {
        resumeName =  'Resume_' + resumeName.split(':')[1];
      }
      else {
        resumeName =   $('#fileName').val() + '_' + resumeName.split(':')[1];
      }

    }


    html2canvas($("#dashboardResume"), {
        onrendered: function(canvas) {
            theCanvas = canvas;
            canvas.toBlob(function(blob) {
                saveAs(blob, resumeName + ".png");
            });
        }
    });

  };

  // Signal --------------------------------------------------------------------
  $scope.$on('readedDataFile', function(event, args) {
    console.log('Update Resume at Readed File ');
    $scope.setGroups();
    $scope.$apply();
  });

}]);
