import { ChangeDetectorRef, Component, ComponentRef, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { FieldFactoryService } from '../../services/field-factory.service';
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
  //@ViewChild('fieldContainer', { read: ViewContainerRef }) fieldContainer!: ViewContainerRef;
  //fieldsComponents: ComponentRef<DynamicField>[] = [];

  constructor(private fieldFactory: FieldFactoryService,
    private cdRef: ChangeDetectorRef
  ) {
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

  ngAfterViewInit(): void {
    /*
    this.formFieldConf.forEach(fconf => {
      const type = this.fieldFactory.getConcreteComponent(fconf);
      if(type && this.form){
        const control = this.form.get(fconf.formControlName);
        if (control instanceof FormControl) {
          const nuevoHijo = this.fieldContainer.createComponent(type);
          nuevoHijo.instance.formFieldConfig = { ...fconf };
          nuevoHijo.instance.formControl = control;   //<-- mi objetivo es descomentar esta linea sin errores
          console.log(2)
          nuevoHijo.changeDetectorRef.detectChanges();
          this.cdRef.detectChanges();
        } else {
          console.warn(`El control ${fconf.formControlName} no es un FormControl.`);
        }
      }
    });*/
  }

  submitForm() {
    if (this.form && this.form.valid) {
      console.log('Formulario válido:', this.form.value);
    } else {
      console.log('Formulario inválido');
    }
  }
}
