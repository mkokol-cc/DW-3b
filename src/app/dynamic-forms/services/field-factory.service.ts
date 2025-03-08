import { Injectable, Type, EnvironmentInjector, inject } from '@angular/core';
import { DynamicField } from '../interfaces/dynamic-field-component';
import { FormFieldConfiguration } from '../interfaces/form-field-configuration';
import { TextDynamicFieldComponent } from '../inputs/text-dynamic-field/text-dynamic-field.component';
import { SelectDynamicFieldComponent } from '../inputs/select-dynamic-field/select-dynamic-field.component';

@Injectable({
  providedIn: 'root',
})
export class FieldFactoryService {

  // Registro de componentes según el tipo
  private componentRegistry: { [key: string]: Type<DynamicField> } = {
    text: TextDynamicFieldComponent,
    //date: DatePickerComponent,
    select: SelectDynamicFieldComponent,
  };

  // Inyección de EnvironmentInjector para crear componentes
  private injector = inject(EnvironmentInjector);

  /**
   * Crea un componente dinámicamente en el contenedor dado según el tipo especificado.
   * @param type Tipo de campo a crear (ej.: 'text', 'date', 'select').
   * @param container Contenedor donde se inyectará el componente.
   * @param formControl FormControl asociado al campo.
   * @returns La instancia creada del componente.
   */

  getConcreteComponent(config: FormFieldConfiguration): Type<DynamicField> | null {
    const componentType = this.componentRegistry[config.formFieldType];
    if (!componentType) {
      console.error(`Tipo de campo desconocido: ${config.type}`);
      return null;
    }
    return componentType
    /*
    // Crear el componente directamente usando ViewContainerRef
    const componentRef = container.createComponent(componentType, {
      injector: this.injector,  // Usa el injector existente
    });

    const instance = componentRef.instance as DynamicFieldComponent;
    instance.formControl = formControl;  // Asigna el FormControl
    instance.formFieldConfig = config;  // Asigna la configuración

    return instance;  // Devuelve la instancia creada
    */
  }
}
