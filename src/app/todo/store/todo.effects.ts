import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { TodoService } from '../../core/services/todo.service';
import { Todo } from '../../models/todo';
import {
  ActionTypes,
  AddTodoAction,
  AddTodoFinishedAction,
  LoadAllTodosFinishedAction,
  LoadSingleTodoAction,
  LoadSingleTodoFinishedAction,
  SetAsDoneFinishedAction
} from './todo.actions';

@Injectable()
export class TodoEffects {
  constructor(private actions$: Actions, private todoService: TodoService) {}

  @Effect()
  loadTodos$ = this.actions$.pipe(
    ofType(ActionTypes.LoadAllTodos),
    switchMap(() =>
      this.todoService
        .getItems()
        .pipe(
          map(
            (todos: Todo[]) => new LoadAllTodosFinishedAction(todos),
            catchError(error => of(error))
          )
        )
    )
  );

  @Effect()
  loadSingleTodos$ = this.actions$.pipe(
    ofType(ActionTypes.LoadSingleTodo),
    switchMap((action: LoadSingleTodoAction) =>
      this.todoService
        .getItem(action.payload)
        .pipe(
          map(
            (todo: Todo) => new LoadSingleTodoFinishedAction(todo),
            catchError(error => of(error))
          )
        )
    )
  );

  @Effect()
  addTodo$ = this.actions$.pipe(
    ofType(ActionTypes.AddTodo),
    switchMap((action: AddTodoAction) =>
      this.todoService
        .addItem(action.payload)
        .pipe(
          map(
            (todo: Todo) => new AddTodoFinishedAction(todo),
            catchError(error => of(error))
          )
        )
    )
  );

  @Effect()
  markAsDone$ = this.actions$.pipe(
    ofType(ActionTypes.SetAsDone),
    switchMap(({ payload }) =>
      this.todoService
        .updateItem(payload)
        .pipe(
          map(
            (todo: Todo) => new SetAsDoneFinishedAction(todo),
            catchError(error => of(error))
          )
        )
    )
  );
}
