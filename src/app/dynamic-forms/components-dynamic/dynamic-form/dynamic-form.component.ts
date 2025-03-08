import {Component, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormFieldConfiguration } from '../../interfaces/form-field-configuration';
import { MatGridListModule } from '@angular/material/grid-list';
import { DynamicFieldComponent } from '../dynamic-field/dynamic-field.component';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [
    MatGridListModule,
    ReactiveFormsModule,
    DynamicFieldComponent
  ],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss'
})
export class DynamicFormComponent {
  
  @Input() form!: FormGroup;
  @Input() formFieldConf!: FormFieldConfiguration[];
  @ViewChildren(DynamicFieldComponent) fields!: QueryList<DynamicFieldComponent>;
  @Output() submitEvent = new EventEmitter<any>();

  submitForm() {
    if (this.form && this.form.valid) {
      console.log('Formulario válido:', this.form.value);
      this.submitEvent.emit(this.form.value)
    } else {
      console.log('Formulario inválido');
    }
  }
}
