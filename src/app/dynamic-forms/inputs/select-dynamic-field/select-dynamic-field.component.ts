import { Component } from '@angular/core';
import { DynamicField } from '../../interfaces/dynamic-field-component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormFieldConfiguration } from '../../interfaces/form-field-configuration';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Observable, isObservable, of } from 'rxjs';
import { OptionElement } from '../../interfaces/option-element';

@Component({
  selector: 'app-select-dynamic-field',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './select-dynamic-field.component.html',
  styleUrl: './select-dynamic-field.component.scss'
})
export class SelectDynamicFieldComponent implements DynamicField {
  formControl!: FormControl<any>;
  formFieldConfig!: FormFieldConfiguration;
  getData(): FormControl | null {
    throw new Error('Method not implemented.');
  }

  getOptions$(): Observable<OptionElement[]> {
    if (isObservable(this.formFieldConfig.options)) {
        return this.formFieldConfig.options;  // Ya es un Observable, lo devuelvo tal cual
    } else {
        return of(this.formFieldConfig.options || []);  // Si es un array, lo convierto en Observable
    }
  }

}
