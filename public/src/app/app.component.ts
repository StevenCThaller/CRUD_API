import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private _httpService: HttpService) {}
  title = 'Restful Task API';
  tasks = [];
  toEdit: object;
  newTask: any;
  editTask: any;

  ngOnInit(){
    this.newTask = { title: "", description: "" }
    this.editTask = { title: "", description: "" }
    this.getTasksFromService();
  }
  
  
  getTasksFromService(){
    this.tasks=[];
    let observable = this._httpService.getTasks();
    observable.subscribe(data => {
      console.log("Got our tasks!", data);
      for(var k in data) {
        this.tasks.push(data[k]);
      }
    });
  }

  getTask(id) {
    let observable = this._httpService.getTask(id);

    observable.subscribe(data => {
      this.toEdit = data[0];
      this.editTask = { title: data[0].title, description: data[0].description };
      console.log(this.editTask);
      console.log(this.toEdit);
    })
  }

  addSubmit() {
    console.log(this.newTask);
    this._httpService.addTask(this.newTask);
    this.newTask = { title: "", description: "" }
    this.getTasksFromService();

  }

  editSubmit(id){
    console.log("Task: "+this.editTask.title+"\nID: "+id);
    this._httpService.updateTask(this.editTask, id);
    this.editTask = { title: "", description: "" };
    this.getTasksFromService();
    this.toEdit = {};
  }

  deleteTask(id){
    this._httpService.deleteT(id);
    this.getTasksFromService();
  }
}
