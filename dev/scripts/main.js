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


window.onload = function () {

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
