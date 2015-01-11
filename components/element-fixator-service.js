angular.module('elementFixatorService', [])

  .factory('elementFixator', ['$window', function($window) {
    var fixedClass = 'fixed',
      area = $window.document.documentElement;

    function scrollY() {
      return area.scrollTop || $window.scrollY; //FF, IE || FF, Cr
    }

    return function(pusher, pushed) {

      function fixator() {
        var pusherRect = pusher[0].getBoundingClientRect(),

          fixate = area.scrollHeight - scrollY() !== area.clientHeight
            && pusherRect.bottom + pushed[0].clientHeight > area.clientHeight;

        if (fixate) {
          pusher.css({'margin-bottom': pushed[0].clientHeight + 'px'});

          pushed.css({
            'position': 'fixed',
            'bottom': 0,
            'right': area.clientWidth - pusherRect.right + 'px'
          });
          pushed.addClass(fixedClass);
        }
        else {
          pusher.css({'margin-bottom': ''});

          pushed.css({'position': '', 'bottom': '', 'left': ''});
          pushed.removeClass(fixedClass);
        }
      }

      function bindFixator(ev) {
        angular.element($window).bind(ev, fixator);
      }
      bindFixator('resize'); bindFixator('scroll');

      return fixator;
    };
  }]);
