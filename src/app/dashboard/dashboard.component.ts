import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit() {
  }

  tasks: string[] = [
    "Add new administrator",
    "Send email to Estong",
    "Contact advertisers"
  ]

}
