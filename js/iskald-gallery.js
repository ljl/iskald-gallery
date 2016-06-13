(function ($) {

  defaults = {
    prevButton: '<button class="prev">Previous</button>',
    nextButton: '<button class="next">Next</button>',
    activeClass: 'active'
  };

  function Gallery(element, options) {

    this.element = $(element);
    this.options = $.extend({}, defaults, options);

    var prevButton = $(this.options.prevButton);
    var nextButton = $(this.options.nextButton);
    var images = [];
    var activeClass = this.options.activeClass;
    this.element.find('img').each(function (index, value) {
      images.push($(value));
    })
    images[0].addClass(activeClass);

    function getCurrent() {
      var result;
      images.forEach(function (image, index) {
        if (image.hasClass(activeClass)) {
          result = index;
        }
      });
      return result;
    }

    function getNext(current) {
      if (current == images.length - 1) {
        return 0;
      } else {
        return current + 1;
      }
    }

    function getPrevious(current) {
      if (current == 0) {
        return images.length - 1;
      } else {
        return current - 1;
      }
    }
    this.element.append(prevButton);
    this.element.append(nextButton);
    nextButton.on('click', function () {
      var current = getCurrent();
      images[current].removeClass(activeClass);
      images[getNext(current)].addClass(activeClass);
    });
    prevButton.on('click', function () {
      var current = getCurrent();
      images[current].removeClass(activeClass);
      images[getPrevious(current)].addClass(activeClass);
    });
  };

  $.fn.gallery = function (options) {

    return this.each(function () {
      new Gallery(this, options);
    });
  };

})(jQuery);
