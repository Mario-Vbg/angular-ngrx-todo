import { Component, OnInit } from '@angular/core';
import { Todo } from '@app/models/todo';
import { getAllDoneItems, getAllUndoneItems, TodoState } from '@app/todo/store';
import {
  AddTodoAction,
  LoadAllTodosAction,
  SetAsDoneAction,
} from '@app/todo/store/todo.actions';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit {
  items$: Observable<Todo[]>;
  doneItems$: Observable<Todo[]>;

  constructor(private store: Store<TodoState>) {}

  ngOnInit() {
    this.items$ = this.store.pipe(select(getAllUndoneItems));
    this.doneItems$ = this.store.pipe(select(getAllDoneItems));

    this.store.dispatch(new LoadAllTodosAction());
  }

  addTodo(item: string) {
    this.store.dispatch(new AddTodoAction(item));
  }

  markAsDone(item: Todo) {
    this.store.dispatch(new SetAsDoneAction(item));
  }
}