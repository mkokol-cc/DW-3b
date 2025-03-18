import { FormControl } from "@angular/forms";
import { FormFieldConfiguration } from "./form-field-configuration";

export interface DynamicField {
    formControl: FormControl;
    formFieldConfig: FormFieldConfiguration;
    /*
    SE PUEDE PASAR UNA TUPLA VALIDADOR-MENSAJE
    */

    /**
     * Devuelve el FormControl si es válido, o null si es inválido.
     * Pero no sirve ya que los FormsModule trae solo los FormControls
     */
    //getData(): FormControl | null;

}