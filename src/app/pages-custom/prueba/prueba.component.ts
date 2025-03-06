import { Component } from '@angular/core';
import { DynamicFormComponent } from '../../dynamic-forms/components-dynamic/dynamic-form/dynamic-form.component';
import { ApiService } from '../../dynamic-forms/services/api.service';
import { FormProvider } from '../../dynamic-forms/interfaces/form-provider';
import { Persistable } from '../../dynamic-forms/persistable';
import { Usuario } from '../../model/usuario';
import { FormGroup } from '@angular/forms';
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
  
  instance:Persistable<any> & FormProvider;
  form?:FormGroup;
  formConfiguration?:FormFieldConfiguration[];

  constructor(private service:ApiService){
    this.instance = new Usuario(service);
    this.form = this.instance.getCreateGroupForm();
    this.formConfiguration = this.instance.getListOptions();
  }

}
