import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FormFieldConfiguration } from "../dynamic-forms/interfaces/form-field-configuration";
import { FormProvider } from "../dynamic-forms/interfaces/form-provider";
import { OptionElement } from "../dynamic-forms/interfaces/option-element";
import { Persistable } from "../dynamic-forms/persistable";
import { ApiService } from "../dynamic-forms/services/api.service";
import { Cliente } from "./cliente";
import { map, Observable } from "rxjs";

export class Paciente extends Persistable<Paciente> implements FormProvider{

    id?: string;
    nombre?: string;
    apellido?: string;
    dni?: number;
    correoElectronico?: string;
    telefono?: number;
    password?: string;

    cliente?:Cliente;

    constructor(apiService: ApiService, data?: any) {
        super('/api/pacientes', apiService);
        if (data) {
          this.id = data.id;
          this.nombre = data.nombre;
          this.apellido = data.apellido;
          this.dni = data.dni;
          this.correoElectronico = data.correoElectronico;
          this.telefono = data.telefono;
          this.password = data.password;
          this.cliente = data.cliente;
        }
    }  
    toSelectData() {
        throw new Error("Method not implemented.");
    }
    getId(): string | number {
        return this.id!
    }
    getInstancedObjects(item:any): any {
        return new Paciente(this.getApiService(),item);
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
            dni: this.dni,
            //cliente: this.cliente,
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
            dni: new FormControl(this.dni, [Validators.required, Validators.min(999999),Validators.max(99999999)]),
            correoElectronico: new FormControl(this.correoElectronico, [Validators.required, Validators.email]),
            telefono: new FormControl(this.telefono, [Validators.required, Validators.min(99999999),Validators.max(9999999999999)]),
            password: new FormControl(this.password, [Validators.required, Validators.minLength(2),Validators.maxLength(20)]),
            cliente: new FormControl(this.cliente, [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
        })
    }
    getCreateGroupForm(): FormGroup {
        return new FormGroup({
            nombre: new FormControl('', [Validators.required, Validators.minLength(2),Validators.maxLength(20)]),
            apellido: new FormControl('', [Validators.required, Validators.minLength(2),Validators.maxLength(20)]),
            dni: new FormControl(null, [Validators.required, Validators.min(999999),Validators.max(99999999)]),
            correoElectronico: new FormControl('', [Validators.required, Validators.email]),
            telefono: new FormControl(null, [Validators.required, Validators.min(99999999),Validators.max(9999999999999)]),
            password: new FormControl('', [Validators.required, Validators.minLength(2),Validators.maxLength(20)]),
            cliente: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
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
            options: this.getOptionsForCliente(),
            multipleOptions: false,
            formFieldLabel:'Cliente',
            errorMessage:'Selecciona a que cliente pertenece',
            formControlName:'cliente',
            placeholder:'Seleccione',
        }]
    }
    getOptionsForCliente(): Observable<OptionElement[]> {
        const t = new Cliente(this.getApiService());
        return t.getAll().pipe(
            map(obj => obj.map((item: any) => t.anyToOption(item)))
        );
    }
    getUrl(): string {
        throw new Error("Method not implemented.");
    }
}
