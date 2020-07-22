(function ($) {
  "use strict";
  var EGOSMART = {};

  /*************************
  Predefined Variables
*************************/
  var $window = $(window),
    $document = $(document),
    $body = $("body"),
    $countdownTimer = $(".countdown"),
    $counter = $(".counter");
  //Check if function exists
  $.fn.exists = function () {
    return this.length > 0;
  };

  /*************************
         Sticky
*************************/

  EGOSMART.isSticky = function () {
    $(window).on("scroll", function (event) {
      var scroll = $(window).scrollTop();
      if (scroll < 300) {
        $(".header").removeClass("sticky-top");
      } else {
        $(".header").addClass("sticky-top");
      }
    });
  };

  /*************************
      Tooltip
*************************/

  $('[data-toggle="tooltip"]').tooltip();
  $('[data-toggle="popover"]').popover();

  /*************************
      Magnific Popup
  *************************/

  EGOSMART.mediaPopups = function () {
    if (
      $(".popup-single").exists() ||
      $(".popup-gallery").exists() ||
      $(".modal-onload").exists() ||
      $(".popup-youtube, .popup-vimeo, .popup-gmaps").exists()
    ) {
      if ($(".popup-single").exists()) {
        $(".popup-single").magnificPopup({
          type: "image",
        });
      }
      if ($(".popup-gallery").exists()) {
        $(".popup-gallery").magnificPopup({
          delegate: "a.portfolio-img",
          type: "image",
          tLoading: "Loading image #%curr%...",
          mainClass: "mfp-img-mobile",
          gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1], // Will preload 0 - before current, and 1 after the current image
          },
        });
      }
      if ($(".popup-youtube, .popup-vimeo, .popup-gmaps").exists()) {
        $(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
          disableOn: 700,
          type: "iframe",
          mainClass: "mfp-fade",
          removalDelay: 160,
          preloader: false,
          fixedContentPos: false,
        });
      }
      var $modal = $(".modal-onload");
      if ($modal.length > 0) {
        $(".popup-modal").magnificPopup({
          type: "inline",
        });
        $(document).on("click", ".popup-modal-dismiss", function (e) {
          e.preventDefault();
          $.magnificPopup.close();
        });
        var elementTarget = $modal.attr("data-target");
        setTimeout(function () {
          $.magnificPopup.open(
            {
              items: {
                src: elementTarget,
              },
              type: "inline",
              mainClass: "mfp-no-margins mfp-fade",
              closeBtnInside: !0,
              fixedContentPos: !0,
              removalDelay: 500,
            },
            0
          );
        }, 1500);
      }
    }
  };

  /*************************
     Back to top
*************************/

  EGOSMART.goToTop = function () {
    var $goToTop = $("#back-to-top");
    $goToTop.hide();
    $window.scroll(function () {
      if ($window.scrollTop() > 100) $goToTop.fadeIn();
      else $goToTop.fadeOut();
    });
    $goToTop.on("click", function () {
      $("body,html").animate(
        {
          scrollTop: 0,
        },
        1000
      );
      return false;
    });
  };

  /*************************
     Smooth scroll
*************************/

  $("a[href^='#']").on("click", function (e) {
    // prevent default anchor click behavior
    e.preventDefault();

    // store hash
    var hash = this.hash;
    if (hash) {
      // animate
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        1000,
        function () {
          // when done, add hash to url
          // (default click behaviour)
          window.location.hash = hash;
        }
      );
    }
  });

  $("body").scrollspy({
    target: ".bs-docs-sidebar",
    offset: 40,
  });

  //Document ready functions
  $document.ready(function () {
    $("body").scrollspy({
      target: ".bs-docs-sidebar",
      offset: 40,
    });
    EGOSMART.isSticky(), EGOSMART.goToTop(), EGOSMART.mediaPopups();
  });
})(jQuery);
