import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FormFieldConfiguration } from "../dynamic-forms/interfaces/form-field-configuration";
import { FormProvider } from "../dynamic-forms/interfaces/form-provider";
import { OptionElement } from "../dynamic-forms/interfaces/option-element";
import { Persistable } from "../dynamic-forms/persistable";
import { ApiService } from "../dynamic-forms/services/api.service";
import { TipoEstudio } from "./tipo-estudio";

export class Usuario extends Persistable<Usuario> implements FormProvider {

    id?: string;
    nombre?: string;
    apellido?: string;
    dni?: number;
    correoElectronico?: string;
    telefono?: number;
    matricula?: string;
    password?: string;

    /*VER COMO MANEJAR ESTA RELACION DE ONE TO MANY */
    tiposEstudio?: TipoEstudio[]

    constructor(apiService: ApiService, data?: any) {
        super('/api/usuarios', apiService);
        if (data) {
          this.id = data.id;
          this.nombre = data.nombre;
          this.apellido = data.apellido;
          this.dni = data.dni;
          this.correoElectronico = data.correoElectronico;
          this.telefono = data.telefono;
          this.matricula = data.matricula;
          this.password = data.password;
          this.tiposEstudio = data.tiposEstudio;
        }
    }  
    toSelectData() {
        throw new Error("Method not implemented.");
    }
    getId(): string | number {
        return this.id!
    }
    getInstancedObjects(item:any): any {
        return new Usuario(this.getApiService(),item);
    }

    anyToOption(item: any): OptionElement {
        throw new Error("Method not implemented.");
    }
    getListUrl(): unknown {
        throw new Error("Method not implemented.");
    }
    getSubformGroupForm(): FormGroup<any> {
        throw new Error("Method not implemented.");
    }
    toTableData() {
        return {
            id:this.id ,
            nombre:this.apellido+", "+this.nombre,
            matricula: this.matricula,
            dni: this.dni,
            telefono: this.telefono,
            email: this.correoElectronico
        }
    }
    toSubformTableData() {
        throw new Error("Method not implemented.");
    }
    getEditGroupForm(): FormGroup {
        return new FormGroup({
            nombre: new FormControl(this.nombre, [Validators.required, Validators.minLength(2),Validators.maxLength(20)]),
            apellido: new FormControl(this.apellido, [Validators.required, Validators.minLength(2),Validators.maxLength(20)]),
            matricula: new FormControl(this.matricula, [Validators.required, Validators.minLength(2),Validators.maxLength(20)]),
            dni: new FormControl(this.dni, [Validators.required, Validators.min(999999),Validators.max(99999999)]),
            correoElectronico: new FormControl(this.correoElectronico, [Validators.required, Validators.email]),
            telefono: new FormControl(this.telefono, [Validators.required, Validators.min(99999999),Validators.max(9999999999999)]),
            password: new FormControl(this.password, [Validators.required, Validators.minLength(2),Validators.maxLength(20)]),
        })
    }
    getCreateGroupForm(): FormGroup {
        return new FormGroup({
            nombre: new FormControl('', [Validators.required, Validators.minLength(2),Validators.maxLength(20)]),
            apellido: new FormControl('', [Validators.required, Validators.minLength(2),Validators.maxLength(20)]),
            matricula: new FormControl('', [Validators.required, Validators.minLength(2),Validators.maxLength(20)]),
            dni: new FormControl(null, [Validators.required, Validators.min(999999),Validators.max(99999999)]),
            correoElectronico: new FormControl('', [Validators.required, Validators.email]),
            telefono: new FormControl(null, [Validators.required, Validators.min(99999999),Validators.max(9999999999999)]),
            password: new FormControl('', [Validators.required, Validators.minLength(2),Validators.maxLength(20)]),
        })
    }
    getListOptions(): FormFieldConfiguration[] {
        return [{
            type:'string',//date,time,datetime,file,number,string,object,text,telefono,email,boolean
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
            type:'string',//date,time,datetime,file,number,string,object,text,telefono,email,boolean
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
        },{
            type:'string',//date,time,datetime,file,number,string,object,text,telefono,email,boolean
            //relationToObject?:"many"|"one";//many,one
            //typeRelationToObject?:"subform"|"select"|"radio";//subform select radio
            col:2,
            row:1,
            formFieldType:'text',
            formFieldLabel:'Matricula',
            errorMessage:'Ingrese una matricula entre 2 y 20 caracteres',
            formControlName:'matricula',
            //fileTypeEnabled?:string[];
            placeholder:'Matricula',
        },{
            type:'number',//date,time,datetime,file,number,string,object,text,telefono,email,boolean
            //relationToObject?:"many"|"one";//many,one
            //typeRelationToObject?:"subform"|"select"|"radio";//subform select radio
            col:2,
            row:1,
            formFieldType:'number',
            formFieldLabel:'DNI',
            errorMessage:'Ingrese un DNI válido',
            formControlName:'dni',
            //fileTypeEnabled?:string[];
            placeholder:'DNI',
        },{
            type:'email',//date,time,datetime,file,number,string,object,text,telefono,email,boolean
            //relationToObject?:"many"|"one";//many,one
            //typeRelationToObject?:"subform"|"select"|"radio";//subform select radio
            col:2,
            row:1,
            formFieldType:'email',
            formFieldLabel:'E-Mail',
            errorMessage:'Ingrese un e-mail válido',
            formControlName:'correoElectronico',
            //fileTypeEnabled?:string[];
            placeholder:'E-Mail',
        },{
            type:'number',//date,time,datetime,file,number,string,object,text,telefono,email,boolean
            //relationToObject?:"many"|"one";//many,one
            //typeRelationToObject?:"subform"|"select"|"radio";//subform select radio
            col:2,
            row:1,
            formFieldType:'number',
            formFieldLabel:'Teléfono',
            errorMessage:'Ingrese un teléfono válido',
            formControlName:'telefono',
            //fileTypeEnabled?:string[];
            placeholder:'Teléfono',
        },{
            type:'string',//date,time,datetime,file,number,string,object,text,telefono,email,boolean
            //relationToObject?:"many"|"one";//many,one
            //typeRelationToObject?:"subform"|"select"|"radio";//subform select radio
            col:4,
            row:1,
            formFieldType:'text',
            formFieldLabel:'Contraseña',
            errorMessage:'Ingrese una contraseña entre 2 y 20 caracteres',
            formControlName:'password',
            //fileTypeEnabled?:string[];
            placeholder:'Contraseña',
        }]
    }
    getUrl(): string {
        throw new Error("Method not implemented.");
    }
}
