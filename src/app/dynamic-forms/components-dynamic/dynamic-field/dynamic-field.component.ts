import { ChangeDetectorRef, Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';
import { FormFieldConfiguration } from '../../interfaces/form-field-configuration';
import { FieldFactoryService } from '../../services/field-factory.service';

@Component({
  selector: 'app-dynamic-field',
  standalone: true,
  imports: [],
  templateUrl: './dynamic-field.component.html',
  styleUrl: './dynamic-field.component.scss'
})
export class DynamicFieldComponent {
  @Input() formControl?:any/* AbstractControl | null = null/*FormControl<any> | null*/;
  @Input() formFieldConfig!: FormFieldConfiguration;
  @ViewChild('inputContainer', { read: ViewContainerRef }) inputContainer!: ViewContainerRef;

  constructor(private fieldFactory: FieldFactoryService, private cdRef: ChangeDetectorRef){}
  
  getData(): FormControl | null {
    throw new Error('Method not implemented.');
  }

  ngAfterViewInit(): void {
    if (this.formControl && this.formFieldConfig) {
      const type = this.fieldFactory.getConcreteComponent(this.formFieldConfig);
      if (type && this.formControl instanceof FormControl) {
        /*
        const nuevoHijo = this.inputContainer.createComponent(type);
        nuevoHijo.instance.formFieldConfig = { ...this.formFieldConfig };
        nuevoHijo.instance.formControl = this.formControl as FormControl; // Casteo explícito
        nuevoHijo.changeDetectorRef.detectChanges();
        this.cdRef.detectChanges();*/
      }
    } else {
      throw new Error('Todavía sin valor.');
    }
  }

}
