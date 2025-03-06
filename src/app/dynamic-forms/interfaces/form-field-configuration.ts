import { Persistable } from "../persistable";
import { FormProvider } from "./form-provider";

export interface FormFieldConfiguration {
    type:"date"|"time"|"datetime"|"file"|"number"|"string"|"object"|"text"|"telefono"|"email"|"boolean";//date,time,datetime,file,number,string,object,text,telefono,email,boolean
    relationToObject?:"many"|"one";//many,one
    typeRelationToObject?:"subform"|"select"|"autocomplete";// |"radio"| subform select radio
    instanceToObject?:Persistable<any> & FormProvider;
    col?:number;
    row?:number;
    formFieldType?:string;
    formFieldLabel?:string;
    errorMessage?:string;
    formControlName:string;
    fileTypeEnabled?:string[];
    placeholder?:string;
}
