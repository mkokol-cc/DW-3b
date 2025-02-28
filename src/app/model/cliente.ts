import { FormGroup } from "@angular/forms";
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
    getId(): string | number {
        throw new Error("Method not implemented.");
    }
    getInstancedObjects(item:any): any {
        throw new Error("Method not implemented.");
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
