import { Observable } from "rxjs";
import { Persistable } from "../persistable";
import { FormProvider } from "./form-provider";
import { OptionElement } from "./option-element";

export interface FormFieldConfiguration {

    //Se refiere al tipo de FormField que va a ser
    formFieldType:string;
    
    //A BORRAR
    relationToObject?:"many"|"one";//many,one
    
    //A BORRAR
    typeRelationToObject?:"subform"|"select"|"autocomplete";// |"radio"| subform select radio
    
    //A BORRAR
    instanceToObject?:Persistable<any> & FormProvider;
    
    //Opciones que se pueden seleccionar si el tipo de formField lo necesita (autocomplete, select, radio, checklist)
    options?:Observable<OptionElement[]> | OptionElement[];
    
    //En los casos seleccionables, se usa para especificar que permite multiples opciones
    multipleOptions?:boolean;
    
    //Dato para acomodar los formularios en un Grid (4 columnas con rows de 100px)
    col?:number;
    row?:number;
    
    //Se refiere a los tipos nativos de los inputs de HTML, aplicable solo a los casos de FormFieldType=Text
    type?:"date"|"time"|"datetime"|"file"|"number"|"object"|"text"|"telefono"|"email"|"boolean";//date,time,datetime,file,number,string,object,text,telefono,email,boolean
    
    //Label que se mostrara en el input
    formFieldLabel?:string;
    
    //Mensaje de error genérico para cualquier error en los validators del FormControl
    errorMessage?:string;
    
    //FormControl al que esta asociado esta configuración
    formControlName:string;
    
    //NOSE A QUE SE REFIERE
    fileTypeEnabled?:string[];
    
    //Placeholder del input
    placeholder?:string;
}
