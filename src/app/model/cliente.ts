import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FormFieldConfiguration } from "../dynamic-forms/interfaces/form-field-configuration";
import { FormProvider } from "../dynamic-forms/interfaces/form-provider";
import { OptionElement } from "../dynamic-forms/interfaces/option-element";
import { Persistable } from "../dynamic-forms/persistable";
import { ApiService } from "../dynamic-forms/services/api.service";

export class Cliente extends Persistable<Cliente> implements FormProvider{

    id?: string;
    nombre?: string;
    telefono?: number;
    cuit?: number;
    correoElectronico?: string;

    constructor(apiService: ApiService, data?: any) {
        super('/api/clientes', apiService);
        if (data) {
          this.id = data.id;
          this.nombre = data.nombre;
          this.cuit = data.cuit;
          this.correoElectronico = data.correoElectronico;
          this.telefono = data.telefono;
        }
    }    
    toSelectData(): OptionElement {
        return {
            value: this.id,
            label: this.nombre + " ("+this.cuit+")"
        };
    }
    getId(): string | number {
        return this.id!
    }
    getInstancedObjects(item:any): any {
        return new Cliente(this.getApiService(),item);
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
            nombre:this.nombre,
            CUIT: this.cuit,
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
            cuit: new FormControl(this.cuit, [Validators.required, Validators.min(999999),Validators.max(99999999)]),
            correoElectronico: new FormControl(this.correoElectronico, [Validators.required, Validators.email]),
            telefono: new FormControl(this.telefono, [Validators.required, Validators.min(99999999),Validators.max(9999999999999)]),
        })
    }
    getCreateGroupForm(): FormGroup {
        return new FormGroup({
            nombre: new FormControl('', [Validators.required, Validators.minLength(2),Validators.maxLength(20)]),
            cuit: new FormControl(null, [Validators.required, Validators.min(999999999),Validators.max(99999999999)]),
            correoElectronico: new FormControl('', [Validators.required, Validators.email]),
            telefono: new FormControl(null, [Validators.required, Validators.min(99999999),Validators.max(9999999999999)]),
        })
    }
    getListOptions(): FormFieldConfiguration[] {
        return [{
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
            formFieldType:'number',
            formFieldLabel:'CUIT',
            errorMessage:'Ingrese un CUIT válido',
            formControlName:'cuit',
            //fileTypeEnabled?:string[];
            placeholder:'CUIT',
        },{
            type:'text',//date,time,datetime,file,number,string,object,text,telefono,email,boolean
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
            type:'text',//date,time,datetime,file,number,string,object,text,telefono,email,boolean
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
        }]
    }
    getUrl(): string {
        throw new Error("Method not implemented.");
    }
}
