import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  sidebar_open: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
  toggleSidebarDefault() {
    this.sidebar_open = !this.sidebar_open
  }
}
