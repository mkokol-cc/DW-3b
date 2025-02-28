import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ManyObjectComponent } from '../../inputs/many-object/many-object.component';
import { ObjectAutocompleteComponent } from '../../inputs/object-autocomplete/object-autocomplete.component';
import { ObjectSelectComponent } from '../../inputs/object-select/object-select.component';
import { FormFieldConfiguration } from '../../interfaces/form-field-configuration';
import { FormProvider } from '../../interfaces/form-provider';
import { ApiService } from '../../services/api.service';
import { Persistable } from '../../persistable';

@Component({
  selector: 'app-form',
  standalone: true,
  providers: [provideNativeDateAdapter()],
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
    ManyObjectComponent
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {
  @Input() data!: Persistable<any> & FormProvider; // El objeto que define los campos
  @Input() type!:'edit'|'new'|'subform'
  @Input() parentFormControlName?:string;
  form!: FormGroup;
  keys: string[] = [];
  formFieldConfigurations!:FormFieldConfiguration[]

  @ViewChildren(FormComponent) objectSubforms!: QueryList<FormComponent>
  @ViewChildren(ObjectAutocompleteComponent) objectAutocomplete!: QueryList<ObjectAutocompleteComponent>
  @ViewChildren(ObjectSelectComponent) objectSelect!: QueryList<ObjectSelectComponent>

  constructor(private service:ApiService){}

  ngOnInit(): void {
    if(this.type == 'edit'){
      this.form = this.data.getEditGroupForm()
    }else if(this.type == 'subform'){
      this.form = this.data.getSubformGroupForm()
    }
    else{
      this.form = this.data.getCreateGroupForm()
    }
    this.formFieldConfigurations = this.data.getListOptions()
    this.keys = Object.keys(this.form.controls);
  }

  onSubmit(){
    switch (this.type) {
      case 'edit':
        let dataSend:any = this.getValue()
        dataSend.id = this.data.getId()
        this.data.update(dataSend, dataSend.id).subscribe(obj=>{
          this.sendResult(true)
        });
        break;
      case 'new':
        this.data.create(this.getValue()).subscribe(obj=>{
          this.sendResult(true)
        });
        break;
      default:
        break;
    }
    /*
    this.service.create(this.data.getUrl(),this.form.value).subscribe(obj=>{
      alert('guardado')
    })
      */
  }

  enableSubmit():boolean{
    let isEnable=true
    if (Array.isArray(this.objectSubforms)) {
      this.objectSubforms.forEach(child => {
        if (!child.form.valid) {
          isEnable = false;
        }
      });
    }
  
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

  getValue():any{
    this.objectSubforms.forEach(child => {
      this.form.get(child.parentFormControlName!)!.setValue(child.form.value)
    });
    this.objectAutocomplete.forEach(child => {
      this.form.get(child.parentFormControlName!)!.setValue(child.getSelected())
    });
    this.objectSelect.forEach(child => {
      this.form.get(child.parentFormControlName!)!.setValue(child.getSelected())
    });
    console.log(this.form.value)
    return this.form.value
  }

  @Output() isSuccess = new EventEmitter<boolean>();
  sendResult(res:boolean){
    this.isSuccess.emit(res)
  }

}
