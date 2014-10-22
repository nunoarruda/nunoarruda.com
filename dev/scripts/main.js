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
				}
			});
		}
		
		// avoid default behavior
		return false;
        
	});
});