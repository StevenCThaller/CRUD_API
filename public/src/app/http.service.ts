import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) {}

  getTasks() {
    return this._http.get('/api/tasks');
  }

  getTask(id) {
    return this._http.get(`/api/tasks/${id}`);
  }

  addTask(newtask) {
    console.log(newtask);
    return this._http.post('/api/newtask/', newtask).subscribe((newtask) => {});
  }

  updateTask(edittask, id){
    console.log(`/api/update/${id}`);
    console.log(edittask.title);
    return this._http.post(`/api/update/${id}/`, edittask).subscribe((edittask) => {});
  }
  
  deleteT(id){
    console.log(id);
    return this._http.delete(`/api/delete/${id}`).subscribe((id) => {});
  }
}
