import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {
  faLinkedin,
  faStackOverflow,
  faGithub,
  faSkype,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  contactForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    subject: ['', Validators.required],
    message: ['', Validators.required],
  });
  sendingForm = false;
  faLinkedin = faLinkedin;
  faStackOverflow = faStackOverflow;
  faGithub = faGithub;
  faSkype = faSkype;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {}

  onSubmit(data: any) {
    if (!data.name) {
      alert('Please insert your name');
    } else if (!data.email) {
      alert('Please insert your email');
    } else if (!data.subject) {
      alert('Please insert a subject');
    } else if (!data.message) {
      alert('Please type your message');
    } else {
      // disable button
      this.sendingForm = true;

      // store form data
      const postBody = {
        name: data.name,
        _replyto: data.email,
        _subject: data.subject,
        message: data.message,
      };

      // send mail via AJAX
      this.http
        .post('https://formspree.io/nuno@nunoarruda.com', postBody)
        .subscribe(() => {
          alert(
            'Your message was sent!\nThank you for contacting me.\nI will respond as soon as possible.'
          );

          // clear form data
          this.contactForm.reset();

          // restore button
          this.sendingForm = false;
        });
    }
  }
}
