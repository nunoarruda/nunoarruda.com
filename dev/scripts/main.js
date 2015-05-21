// defer loading of css to avoid render-blocking and boost page loading
var cssList = [
    '//cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.min.css',
    '//fonts.googleapis.com/css?family=Open+Sans:300,600,700',
    '//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css',
    '/styles/main.css'
];

var cb = function() {
    for (var i in cssList) {
        var l = document.createElement('link');
        l.rel = 'stylesheet';
        l.href = cssList[i];
        var h = document.getElementsByTagName('head')[0];
        h.appendChild(l);
    }
};

var raf = requestAnimationFrame || mozRequestAnimationFrame || webkitRequestAnimationFrame || msRequestAnimationFrame;
if (raf) raf(cb);
else window.addEventListener('load', cb);


// know when jQuery loads async
var elem = document.getElementById("jquery");

elem.onload = function () {
    runAfterJquery();
};


// code to run after jQuery is loaded
function runAfterJquery() {

    // Smooth Scrolling
    // http://css-tricks.com/snippets/jquery/smooth-scrolling/
    $(function() {
      $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top
            }, 1000);
            return false;
          }
        }
      });
    });
    
    
    // ScrollSpy plugin
    /* ========================================================================
     * Bootstrap: scrollspy.js v3.3.4
     * http://getbootstrap.com/javascript/#scrollspy
     * ========================================================================
     * Copyright 2011-2015 Twitter, Inc.
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * ======================================================================== */


    +function ($) {
      'use strict';

      // SCROLLSPY CLASS DEFINITION
      // ==========================

      function ScrollSpy(element, options) {
        this.$body          = $(document.body)
        this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
        this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
        this.selector       = (this.options.target || '') + ' .nav li > a'
        this.offsets        = []
        this.targets        = []
        this.activeTarget   = null
        this.scrollHeight   = 0

        this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
        this.refresh()
        this.process()
      }

      ScrollSpy.VERSION  = '3.3.4'

      ScrollSpy.DEFAULTS = {
        offset: 10
      }

      ScrollSpy.prototype.getScrollHeight = function () {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
      }

      ScrollSpy.prototype.refresh = function () {
        var that          = this
        var offsetMethod  = 'offset'
        var offsetBase    = 0

        this.offsets      = []
        this.targets      = []
        this.scrollHeight = this.getScrollHeight()

        if (!$.isWindow(this.$scrollElement[0])) {
          offsetMethod = 'position'
          offsetBase   = this.$scrollElement.scrollTop()
        }

        this.$body
          .find(this.selector)
          .map(function () {
            var $el   = $(this)
            var href  = $el.data('target') || $el.attr('href')
            var $href = /^#./.test(href) && $(href)

            return ($href
              && $href.length
              && $href.is(':visible')
              && [[$href[offsetMethod]().top + offsetBase, href]]) || null
          })
          .sort(function (a, b) { return a[0] - b[0] })
          .each(function () {
            that.offsets.push(this[0])
            that.targets.push(this[1])
          })
      }

      ScrollSpy.prototype.process = function () {
        var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
        var scrollHeight = this.getScrollHeight()
        var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
        var offsets      = this.offsets
        var targets      = this.targets
        var activeTarget = this.activeTarget
        var i

        if (this.scrollHeight != scrollHeight) {
          this.refresh()
        }

        if (scrollTop >= maxScroll) {
          return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
        }

        if (activeTarget && scrollTop < offsets[0]) {
          this.activeTarget = null
          return this.clear()
        }

        for (i = offsets.length; i--;) {
          activeTarget != targets[i]
            && scrollTop >= offsets[i]
            && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
            && this.activate(targets[i])
        }
      }

      ScrollSpy.prototype.activate = function (target) {
        this.activeTarget = target

        this.clear()

        var selector = this.selector +
          '[data-target="' + target + '"],' +
          this.selector + '[href="' + target + '"]'

        var active = $(selector)
          .parents('li')
          .addClass('active')

        if (active.parent('.dropdown-menu').length) {
          active = active
            .closest('li.dropdown')
            .addClass('active')
        }

        active.trigger('activate.bs.scrollspy')
      }

      ScrollSpy.prototype.clear = function () {
        $(this.selector)
          .parentsUntil(this.options.target, '.active')
          .removeClass('active')
      }


      // SCROLLSPY PLUGIN DEFINITION
      // ===========================

      function Plugin(option) {
        return this.each(function () {
          var $this   = $(this)
          var data    = $this.data('bs.scrollspy')
          var options = typeof option == 'object' && option

          if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
          if (typeof option == 'string') data[option]()
        })
      }

      var old = $.fn.scrollspy

      $.fn.scrollspy             = Plugin
      $.fn.scrollspy.Constructor = ScrollSpy


      // SCROLLSPY NO CONFLICT
      // =====================

      $.fn.scrollspy.noConflict = function () {
        $.fn.scrollspy = old
        return this
      }


      // SCROLLSPY DATA-API
      // ==================

      $(window).on('load.bs.scrollspy.data-api', function () {
        $('[data-spy="scroll"]').each(function () {
          var $spy = $(this)
          Plugin.call($spy, $spy.data())
        })
      })

    }(jQuery);

    
    // ScrollSpy setup
    $(function() {
        $('body').scrollspy({ target: '#nav' });
    });


    // send form via jQuery/AJAX
    $(document).ready(function() {
        $('.submit-button').click(function(e) {

            // target fields
            var name = $("input#name");
            var email = $("input#email");
            var subject = $("input#subject");
            var message = $("textarea");

            // validation
            if (name.val() == '') {
                alert('Please insert your name');
                name.focus();
            } else if (email.val() == '') {
                alert('Please insert your email');
                email.focus();
            } else if (subject.val() == '') {
                alert('Please insert a subject');
                subject.focus();
            } else if (message.val() == '') {
                alert('Please type your message');
                message.focus();
            }
            else {
                // disable button
                $(this).html('<i class="fa fa-refresh fa-spin"></i>').attr("disabled", 'disabled');

                // store form data
                var data = {
                    name:    name.val(),
                    email:   email.val(),
                    subject: subject.val(),
                    message: message.val()
                };

               // send mail via AJAX
                $.ajax({
                    type:    "POST",
                    url:     "sendmail.php",
                    data:    data,
                    success: function() {
                        alert('Your message was sent!\nThank you for contacting me.\nI will respond as soon as possible.');

                        // clear form data
                        $('form')[0].reset();

                        // restore button
                        $('.submit-button').removeAttr('disabled').html('Send Message');
                    }
                });
            }

            // avoid default behavior
            return false;

        });
    });
    
};
