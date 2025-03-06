import { ChangeDetectorRef, Component, ComponentRef, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';
import { FormFieldConfiguration } from '../../interfaces/form-field-configuration';
import { FieldFactoryService } from '../../services/field-factory.service';
import { DynamicField } from '../../interfaces/dynamic-field-component';

@Component({
  selector: 'app-dynamic-field',
  standalone: true,
  imports: [],
  templateUrl: './dynamic-field.component.html',
  styleUrl: './dynamic-field.component.scss'
})
export class DynamicFieldComponent {
  @Input() formCtrl:any;
  @Input() formFieldConfig!: FormFieldConfiguration;
  @ViewChild('inputContainer', { read: ViewContainerRef }) inputContainer!: ViewContainerRef;
  field?:ComponentRef<DynamicField>

  constructor(private fieldFactory: FieldFactoryService, private cdRef: ChangeDetectorRef){}
  
  getData(): FormControl | null {
    return this.field ? this.field.instance.getData() : null
  }

  ngAfterViewInit(): void {
    if (this.formCtrl && this.formFieldConfig) {
      const type = this.fieldFactory.getConcreteComponent(this.formFieldConfig);
      if (type && this.formCtrl instanceof FormControl) {
        
        this.field = this.inputContainer.createComponent(type);
        this.field.instance.formFieldConfig = { ...this.formFieldConfig };
        this.field.instance.formControl = this.formCtrl as FormControl; // Casteo explícito
        this.field.changeDetectorRef.detectChanges();
        this.cdRef.detectChanges();
      }
    } else {
      throw new Error('Todavía sin valor.');
    }
  }

}
