angular.module('digitSeparatorFilter', [])

  .filter('dsep', function() {
    return function(input) {
      var parts = input.toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0');
      return parts.join('.');
    };
  });
