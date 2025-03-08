import { Injectable, Type } from '@angular/core';
import { DynamicField } from '../interfaces/dynamic-field-component';
import { FormFieldConfiguration } from '../interfaces/form-field-configuration';
import { TextDynamicFieldComponent } from '../inputs/text-dynamic-field/text-dynamic-field.component';
import { SelectDynamicFieldComponent } from '../inputs/select-dynamic-field/select-dynamic-field.component';
import { AutocompleteDynamicFieldComponent } from '../inputs/autocomplete-dynamic-field/autocomplete-dynamic-field.component';

@Injectable({
  providedIn: 'root',
})
export class FieldFactoryService {

  // Registro de componentes según el tipo
  private componentRegistry: { [key: string]: Type<DynamicField> } = {
    text: TextDynamicFieldComponent,
    select: SelectDynamicFieldComponent,
    autocomplete: AutocompleteDynamicFieldComponent
  };

  getConcreteComponent(config: FormFieldConfiguration): Type<DynamicField> | null {
    const componentType = this.componentRegistry[config.formFieldType];
    if (!componentType) {
      console.error(`Tipo de campo desconocido: ${config.type}`);
      return null;
    }
    return componentType
  }
}
