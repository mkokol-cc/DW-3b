import { CommonModule } from '@angular/common';
import { Component, Input, QueryList, ViewChildren } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ObjectAutocompleteComponent } from '../../inputs/object-autocomplete/object-autocomplete.component';
import { ObjectSelectComponent } from '../../inputs/object-select/object-select.component';
import { FormFieldConfiguration } from '../../interfaces/form-field-configuration';
import { FormProvider } from '../../interfaces/form-provider';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-subform',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule, // Necesario para los formularios reactivos
    MatFormFieldModule,  // Material para los campos
    MatInputModule,      // Input de Material
    MatGridListModule,
    MatIconModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    ObjectAutocompleteComponent,
    ObjectSelectComponent,
  ],
  templateUrl: './subform.component.html',
  styleUrl: './subform.component.scss'
})
export class SubformComponent {
  @Input() data!: FormProvider; // El objeto que define los campos
  //@Input() type!:'edit'|'new'|'subform'
  @Input() parentFormControlName?:string;
  form!: FormGroup;
  keys: string[] = [];
  formFieldConfigurations!:FormFieldConfiguration[]

  @ViewChildren(ObjectAutocompleteComponent) objectAutocomplete!: QueryList<ObjectAutocompleteComponent>
  @ViewChildren(ObjectSelectComponent) objectSelect!: QueryList<ObjectSelectComponent>

  constructor(private service:ApiService){}

  ngOnInit(): void {/*
    if(this.type == 'edit'){
      this.form = this.data.getEditGroupForm()
    }else if(this.type == 'subform'){
      this.form = this.data.getSubformGroupForm()
    }
    else{
      this.form = this.data.getCreateGroupForm()
    }*/
    this.form = this.data.getCreateGroupForm()
    this.formFieldConfigurations = this.data.getListOptions()
    this.keys = Object.keys(this.form.controls);
  }

  onSubmit(){
    this.objectAutocomplete.forEach(child => {
      this.form.get(child.parentFormControlName!)!.setValue(child.getSelected())
    });
    this.objectSelect.forEach(child => {
      this.form.get(child.parentFormControlName!)!.setValue(child.getSelected())
    });
    console.log(this.form.value)
    this.service.create(this.data.getUrl(),this.form.value).subscribe(obj=>{
      alert('guardado')
    })
  }

  enableSubmit():boolean{
    let isEnable=true
  
    if (Array.isArray(this.objectAutocomplete)) {
      this.objectAutocomplete.forEach(child => {
        if (!child.getSelected()) {
          isEnable = false;
        }
      });
    }
  
    if (Array.isArray(this.objectSelect)) {
      this.objectSelect.forEach(child => {
        if (!child.getSelected()) {
          isEnable = false;
        }
      });
    }
    return isEnable;
  }

  getValue(){
    return this.form.value
  }

}
