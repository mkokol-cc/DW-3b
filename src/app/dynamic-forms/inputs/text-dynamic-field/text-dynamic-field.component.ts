import { Component, ViewEncapsulation } from '@angular/core';
import { DynamicField } from '../../interfaces/dynamic-field-component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormFieldConfiguration } from '../../interfaces/form-field-configuration';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-text-dynamic-field',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatInputModule
  ],
  templateUrl: './text-dynamic-field.component.html',
  styleUrl: './text-dynamic-field.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class TextDynamicFieldComponent implements DynamicField {
  formControl!: FormControl<any>;
  formFieldConfig!: FormFieldConfiguration;
  getData(): FormControl | null {
    throw new Error('Method not implemented.');
  }

}
