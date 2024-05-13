import { Component, effect, EventEmitter, input, Output } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { Task } from '../task';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
  ],
  styles: `
    .task-form {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 2rem;
    }
    .mat-mdc-radio-button ~ .mat-mdc-radio-button {
      margin-left: 16px;
    }
    .mat-mdc-form-field {
      width: 100%;
    }
  `,
  template: `
    <form
      class="task-form"
      autocomplete="off"
      [formGroup]="taskForm"
      (submit)="submitForm()"
    >
      <mat-form-field>
        <mat-label>Name</mat-label>
        <input matInput placeholder="Name" formControlName="name" required />
        @if (name.invalid) {
        <mat-error>Name must be at least 3 characters long.</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <mat-label>Category</mat-label>
        <input
          matInput
          placeholder="Category"
          formControlName="category"
          required
        />
        @if (category.invalid) {
        <mat-error>Category must be at least 3 characters long.</mat-error>
        }
      </mat-form-field>

      <mat-radio-group formControlName="state" aria-label="Select an option">
        <mat-radio-button name="state" value="open" required
          >Open</mat-radio-button
        >
        <mat-radio-button name="state" value="busy"
          >Busy</mat-radio-button
        >
        <mat-radio-button name="state" value="done"
          >Done</mat-radio-button
        >
      </mat-radio-group>
      <br />
      <button
        mat-raised-button
        color="primary"
        type="submit"
        [disabled]="taskForm.invalid"
      >
        Add
      </button>
    </form>
  `,
})
export class TaskFormComponent {
  initialState = input<Task>();

  @Output()
  formValuesChanged = new EventEmitter<Task>();

  @Output()
  formSubmitted = new EventEmitter<Task>();

  taskForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    category: ['', [Validators.required, Validators.minLength(3)]],
    state: ['open', [Validators.required]],
  });

  constructor(private formBuilder: FormBuilder) {
    effect(() => {
      this.taskForm.setValue({
        name: this.initialState()?.name || '',
        category: this.initialState()?.category || '',
        state: this.initialState()?.state || 'open',
      });
    });
  }

  get name() {
    return this.taskForm.get('name')!;
  }
  get category() {
    return this.taskForm.get('category')!;
  }
  get state() {
    return this.taskForm.get('state')!;
  }

  submitForm() {
    this.formSubmitted.emit(this.taskForm.value as Task);
  }
}