import { AfterViewInit } from '@angular/core';
import { Component } from '@angular/core';
import { Todo } from './interfaces/todo';
import { ApiService } from './services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  todos: Todo[];
  todolistForm: FormGroup;
  itemCount: number;
  completedIcon = 'done';
  incompletedIcon = 'cancel';

  constructor(private apiService: ApiService, private formBuilder: FormBuilder) {
    this.initForm();
  }

  ngAfterViewInit() {
    this.apiService.getTodo().subscribe(todos => { this.todos = todos; this.itemCount = this.todos.length; });
  }

  addTodo() {
    let params = {
      title: this.todolistForm.get('todoName').value,
      completed: "incomplete"
    };
    this.todos.unshift(params);
    this.itemCount = this.todos.length;
    this.todolistForm.reset();
  }

  deleteTodo(todo) {
    this.todos.splice(this.todos.indexOf(todo), 1);
    this.itemCount = this.todos.length;
  }

  public initForm() {
    this.todolistForm = this.formBuilder.group({
      todoName: ['', Validators.required],
    });
  }
}
