import { Component, OnInit, ViewChild} from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task.model';
import { NgForm } from '@angular/forms';
import { MatTable } from '@angular/material/table';


@Component({
  selector: 'app-task-tracker',
  templateUrl: './task-tracker.component.html',
  styleUrls: ['./task-tracker.component.css']
})
export class TaskTrackerComponent implements OnInit {

  tasks: Array<Task> = [];
  msg: string = "";
  columnsToDisplay = ["id", "name", "task", "deadline"];
  @ViewChild(MatTable) table: MatTable<Task> | undefined;

  
  constructor(public ts: TaskService)
  {
  }

  ngOnInit(): void
  {
    this.getTasks();
  }

  private getTasks()
  {
    this.tasks = this.ts.getTasks();
  }

  addTask(f: NgForm)
  {
    this.msg = "";
    console.log(f.value.id + " " + f.value.name + " " + f.value.task + " " + f.value.deadline)

    if(
      f.value.id == "" || f.value.id == null ||
      f.value.name == "" || f.value.name == null ||
      f.value.task == "" || f.value.task == null ||
      f.value.deadline == "" || f.value.deadline == null)
    {
      this.msg = "You must fill out all fields!";
      return;
    }

    this.pushTask(f.value.id, f.value.name, f.value.task, f.value.deadline);
    f.reset();
    if(this.table != undefined)
      this.table.renderRows();
  }

  private pushTask(id: string, name: string, task: string, deadline: string)
  {
    this.tasks.push({"id": id, "name": name, "task": task, "deadline": deadline});
    this.ts.updateTasks(this.tasks);
    console.log("Successfully updated tasks:");
    console.log(this.ts.getTasks());
  }

}
