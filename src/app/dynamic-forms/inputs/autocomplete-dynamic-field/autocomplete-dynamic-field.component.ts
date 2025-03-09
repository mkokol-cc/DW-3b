import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, isObservable, of } from 'rxjs';
import { DynamicField } from '../../interfaces/dynamic-field-component';
import { FormFieldConfiguration } from '../../interfaces/form-field-configuration';
import { OptionElement } from '../../interfaces/option-element';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-autocomplete-dynamic-field',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './autocomplete-dynamic-field.component.html',
  styleUrl: './autocomplete-dynamic-field.component.scss'
})
export class AutocompleteDynamicFieldComponent implements DynamicField, OnInit {
  formControl!: FormControl<any>;
  _formFieldConfig!: FormFieldConfiguration;
  getData(): FormControl | null {
    throw new Error('Method not implemented.');
  }

  options: OptionElement[] = [];
  filteredOptions: OptionElement[] = [];

  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  ngOnInit() {
    this.loadData();
  }

  set formFieldConfig(value:FormFieldConfiguration){
    this._formFieldConfig = value;
    this.loadData();
  }

  get formFieldConfig(){
    return this._formFieldConfig
  }

  loadData(){
    this.getOptions$().subscribe((options) => {
      this.options = options;
      this.filteredOptions = options;
    });
  }

  getOptions$(): Observable<OptionElement[]> {
    if (this.formFieldConfig.options instanceof Observable) {
      return this.formFieldConfig.options;
    } else {
      return of(this.formFieldConfig.options || []);
    }
  }

  filter(): void {
    const filterValue = this.input.nativeElement.value.toLowerCase();
    this.filteredOptions = this.options.filter((o) =>
      o.label.toLowerCase().includes(filterValue)
    );
  }

  // Muestra el nombre en el input
  displayFn = (value: any): string => {
    if (!value || !this.formFieldConfig?.options) return '';
    const selectedOption = this.options.find(opt => opt.value === value);
    console.log(selectedOption)
    return selectedOption ? selectedOption.label : '';
  };

  // Al seleccionar una opción, guardamos el ID
  onOptionSelected(event: any) {
    const selectedOption: OptionElement = event.option.value;
    //console.log(selectedOption)
    this.formControl.setValue(selectedOption.value); // Guardamos el ID
  }
}