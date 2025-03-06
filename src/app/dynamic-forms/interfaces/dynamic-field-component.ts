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
     */
    getData(): FormControl | null;

}