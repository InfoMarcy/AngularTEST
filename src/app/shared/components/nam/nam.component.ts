import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nam',
  templateUrl: './nam.component.html',
  styleUrls: ['./nam.component.css']
})
export class NAMComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.location.href = 'https://namns.desadsi.gs/abc/home'
  }

}
