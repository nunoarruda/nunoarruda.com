import { Component, OnInit } from '@angular/core';
import { faCode, faCog, faTabletAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
})
export class WorkComponent implements OnInit {
  faCode = faCode;
  faCog = faCog;
  faTabletAlt = faTabletAlt;

  constructor() {}

  ngOnInit(): void {}
}
