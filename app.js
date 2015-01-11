angular.module('app', ['amountDirective'])

  .controller('amountCtrl', ['$scope', function($scope) {
    var amounts = $scope.amounts = [];

    for (var i = 5; i > -5; i--) {
      amounts.push({val: i * 10000});
    }
  }]);
