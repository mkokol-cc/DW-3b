import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FormFieldConfiguration } from "../dynamic-forms/interfaces/form-field-configuration";
import { FormProvider } from "../dynamic-forms/interfaces/form-provider";
import { OptionElement } from "../dynamic-forms/interfaces/option-element";
import { Persistable } from "../dynamic-forms/persistable";
import { ApiService } from "../dynamic-forms/services/api.service";
import { TipoEstudio } from "./tipo-estudio";
import { map, Observable } from "rxjs";

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
            //tiposEstudio: new FormControl(this.password, [Validators.required, Validators.minLength(2),Validators.maxLength(20)]),
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
            tiposEstudio: new FormControl([], [Validators.required, Validators.minLength(1)]),
        })
    }
    getListOptions(): FormFieldConfiguration[] {
        return [{
            formFieldType:'text',
            type:'text',
            col:2,
            row:1,
            formFieldLabel:'Nombre',
            errorMessage:'Ingrese un nombre entre 2 y 20 caracteres',
            formControlName:'nombre',
            placeholder:'Nombre',
        },{
            formFieldType:'text',
            type:'text',
            col:2,
            row:1,
            formFieldLabel:'Apellido',
            errorMessage:'Ingrese un apellido entre 2 y 20 caracteres',
            formControlName:'apellido',
            placeholder:'Apellido',
        },{
            formFieldType:'text',
            type:'text',
            col:2,
            row:1,
            formFieldLabel:'Matricula',
            errorMessage:'Ingrese una matricula entre 2 y 20 caracteres',
            formControlName:'matricula',
            placeholder:'Matricula',
        },{
            formFieldType:'text',
            type:'number',
            col:2,
            row:1,
            formFieldLabel:'DNI',
            errorMessage:'Ingrese un DNI válido',
            formControlName:'dni',
            placeholder:'DNI',
        },{
            formFieldType:'text',
            type:'email',
            col:2,
            row:1,
            formFieldLabel:'E-Mail',
            errorMessage:'Ingrese un e-mail válido',
            formControlName:'correoElectronico',
            placeholder:'E-Mail',
        },{
            formFieldType:'text',
            type:'number',
            col:2,
            row:1,
            formFieldLabel:'Teléfono',
            errorMessage:'Ingrese un teléfono válido',
            formControlName:'telefono',
            placeholder:'Teléfono',
        },{
            formFieldType:'text',
            type:'text',
            col:4,
            row:1,
            formFieldLabel:'Contraseña',
            errorMessage:'Ingrese una contraseña entre 2 y 20 caracteres',
            formControlName:'password',
            placeholder:'Contraseña',
        },{
            formFieldType:'select',
            col:4,
            row:1,
            options: this.getOptionsForTipoDeEstudio(),
            multipleOptions: true,
            formFieldLabel:'Tipo de Estudio',
            errorMessage:'Selecciona algún tipo de estudio',
            formControlName:'tiposEstudio',
            placeholder:'Seleccione',
        }]
    }
    getUrl(): string {
        throw new Error("Method not implemented.");
    }


    getOptionsForTipoDeEstudio():Observable<OptionElement[]>{
        const t = new TipoEstudio(this.getApiService());
        return t.getAll().pipe(
            map(obj => obj.map((item: any) => t.anyToOption(item)))
        );
    }
}



/**
 * 
 *     //Se refiere al tipo de FormField que va a ser
    formFieldType:string;
    
    //A BORRAR
    relationToObject?:"many"|"one";//many,one
    
    //A BORRAR
    typeRelationToObject?:"subform"|"select"|"autocomplete";// |"radio"| subform select radio
    
    //A BORRAR
    instanceToObject?:Persistable<any> & FormProvider;
    
    //Opciones que se pueden seleccionar si el tipo de formField lo necesita (autocomplete, select, radio, checklist)
    options?:OptionElement[];
    
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
 */