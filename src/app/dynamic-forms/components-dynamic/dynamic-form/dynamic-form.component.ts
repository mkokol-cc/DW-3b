import {Component, Input, QueryList, ViewChildren } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
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

  constructor() {
    this.form = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(2),Validators.maxLength(20)]),
      apellido: new FormControl('', [Validators.required, Validators.minLength(2),Validators.maxLength(20)]),
    })
    this.formFieldConf = [{
      type:'text',//date,time,datetime,file,number,string,object,text,telefono,email,boolean
      //relationToObject?:"many"|"one";//many,one
      //typeRelationToObject?:"subform"|"select"|"radio";//subform select radio
      col:2,
      row:1,
      formFieldType:'text',
      formFieldLabel:'Nombre',
      errorMessage:'Ingrese un nombre entre 2 y 20 caracteres',
      formControlName:'nombre',
      //fileTypeEnabled?:string[];
      placeholder:'Nombre',
    },{
      type:'text',//date,time,datetime,file,number,string,object,text,telefono,email,boolean
      //relationToObject?:"many"|"one";//many,one
      //typeRelationToObject?:"subform"|"select"|"radio";//subform select radio
      col:2,
      row:1,
      formFieldType:'text',
      formFieldLabel:'Apellido',
      errorMessage:'Ingrese un apellido entre 2 y 20 caracteres',
      formControlName:'apellido',
      //fileTypeEnabled?:string[];
      placeholder:'Apellido',
    }]
  }

  submitForm() {
    if (this.form && this.form.valid) {
      console.log('Formulario válido:', this.form.value);
    } else {
      console.log('Formulario inválido');
    }
  }
}
