angular.module('amountDirective', [
  'amountService', 'elementFixatorService', 'digitSeparatorFilter'
])

  .directive('amount', ['$timeout', 'amount', 'elementFixator',
    function ($timeout, amount, elementFixator) {
      return {
        restrict: 'E',
        scope: {
          values: '='
        },
        link: function (scope, element, attr) {
          scope.amount = amount().init(scope.values, attr.property);

          var fixator = elementFixator(findElement('amount .list'),
            findElement('amount .total'));

          scope.$watch('amount.size()', function () {
            $timeout(fixator);
          });

          scope.$watch('amount.edited', function () {
            if (scope.amount.isEdited()) {
              $timeout(function () {
                var amountInput = findElement('amount .input')[0];
                amountInput.focus();

                // cursor to end of string
                var strLength = amountInput.value.length;
                amountInput.setSelectionRange(strLength, strLength);
              });
            }
          });

          function findElement(clazz) {
            return angular.element(element[0].querySelector(clazz));
          }
        },
        transclude: true,
        templateUrl: 'components/amount-directive/amount-directive.html'
      };
    }
  ]);
