import { Injectable } from '@angular/core';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks: Array<Task> = [];

  constructor() { }

  getTasks(): Array<Task>
  {
    return this.tasks;
  }

  updateTasks(newTasks: Array<Task>)
  {
    this.tasks = newTasks;
  }
}
