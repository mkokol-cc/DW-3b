import { Component } from '@angular/core';
import { DynamicFormComponent } from '../../dynamic-forms/components-dynamic/dynamic-form/dynamic-form.component';
import { ApiService } from '../../dynamic-forms/services/api.service';
import { FormProvider } from '../../dynamic-forms/interfaces/form-provider';
import { Persistable } from '../../dynamic-forms/persistable';
import { Usuario } from '../../model/usuario';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormFieldConfiguration } from '../../dynamic-forms/interfaces/form-field-configuration';

@Component({
  selector: 'app-prueba',
  standalone: true,
  imports: [
    DynamicFormComponent
  ],
  templateUrl: './prueba.component.html',
  styleUrl: './prueba.component.scss'
})
export class PruebaComponent {
  
  //instance:Persistable<any> & FormProvider;
  form?:FormGroup;
  formConfiguration?:FormFieldConfiguration[];
  /*
  constructor(private service:ApiService){
    this.instance = new Usuario(service);
    this.form = this.instance.getCreateGroupForm();
    this.formConfiguration = this.instance.getListOptions();
  }*/

  constructor() {
    this.form = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(2),Validators.maxLength(20)]),
      edad: new FormControl(null, [Validators.required, Validators.min(0)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
    })
    this.formConfiguration = [{
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
      formFieldType:'number',
      formFieldLabel:'Edad',
      errorMessage:'Ingrese una edad mayor a 0',
      formControlName:'edad',
      //fileTypeEnabled?:string[];
      placeholder:'Edad',
    },{
      type:'text',//date,time,datetime,file,number,string,object,text,telefono,email,boolean
      //relationToObject?:"many"|"one";//many,one
      //typeRelationToObject?:"subform"|"select"|"radio";//subform select radio
      col:2,
      row:1,
      formFieldType:'email',
      formFieldLabel:'Email',
      errorMessage:'Ingrese una e-mail valido',
      formControlName:'email',
      //fileTypeEnabled?:string[];
      placeholder:'tuemail@gmail.com',
    }]
  }

}
