import { FormGroup } from "@angular/forms";
import { FormFieldConfiguration } from "../dynamic-forms/interfaces/form-field-configuration";
import { FormProvider } from "../dynamic-forms/interfaces/form-provider";
import { OptionElement } from "../dynamic-forms/interfaces/option-element";
import { Persistable } from "../dynamic-forms/persistable";
import { ApiService } from "../dynamic-forms/services/api.service";
import { Cliente } from "./cliente";

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
        throw new Error("Method not implemented.");
    }
    toSubformTableData() {
        throw new Error("Method not implemented.");
    }
    getEditGroupForm(): FormGroup {
        throw new Error("Method not implemented.");
    }
    getCreateGroupForm(): FormGroup {
        throw new Error("Method not implemented.");
    }
    getListOptions(): FormFieldConfiguration[] {
        throw new Error("Method not implemented.");
    }
    getUrl(): string {
        throw new Error("Method not implemented.");
    }
}
