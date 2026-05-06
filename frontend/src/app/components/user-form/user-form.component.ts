import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addUser } from '../../store/users/users.actions';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  @Output() close = new EventEmitter<void>();
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10,12}$')]]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.store.dispatch(addUser({ user: this.userForm.value }));
      this.close.emit();
    }
  }

  onCancel() {
    this.close.emit();
  }
}
