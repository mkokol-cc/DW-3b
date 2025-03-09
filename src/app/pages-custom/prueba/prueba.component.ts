import { Component } from '@angular/core';
import { DynamicFormComponent } from '../../dynamic-forms/components-dynamic/dynamic-form/dynamic-form.component';
import { ApiService } from '../../dynamic-forms/services/api.service';
import { FormProvider } from '../../dynamic-forms/interfaces/form-provider';
import { Persistable } from '../../dynamic-forms/persistable';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormFieldConfiguration } from '../../dynamic-forms/interfaces/form-field-configuration';
import { Observable } from 'rxjs/internal/Observable';
import { OptionElement } from '../../dynamic-forms/interfaces/option-element';
import { Cliente } from '../../model/cliente';
import { map } from 'rxjs';

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

  constructor(private service:ApiService) {
    this.instance = new Cliente(service);
    this.form = new FormGroup({
      cliente: new FormControl(null, [Validators.required])
    })
    this.formConfiguration = [{
      formFieldType:'autocomplete',
      col:4,
      row:1,
      options: this.getOptionsForCliente(),
      multipleOptions: false,
      formFieldLabel:'Cliente',
      errorMessage:'Selecciona a que cliente pertenece',
      formControlName:'cliente',
      placeholder:'Seleccione',
    }]
  }
  getOptionsForCliente(): Observable<OptionElement[]> {
    return this.instance.getAll().pipe(
      map(obj => obj.map((item: any) => this.instance.anyToOption(item)))
    );
  }


}
