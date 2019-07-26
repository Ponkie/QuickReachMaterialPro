import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  tasks: ITask[];
  taskInput: string;

  ngOnInit() {
    this.tasks = [
      {
        description: "Add new administrator",
        isDone: false
      },
      {
        description: "Send email to Estong",
        isDone: false
      },
      {
        description: "Contact advertisers",
        isDone: false
      }    
    ]
  }

  addTask() {
    this.tasks.push({
      description: this.taskInput,
      isDone: false
    })
    this.taskInput = "";
  }

  changeStatus(task: ITask) {

    let index = this.tasks.indexOf(task);

    this.tasks[index] = {
      description: task.description,
      isDone: !task.isDone
    }

  }

}

interface ITask {
  description: string;
  isDone: boolean;
}
