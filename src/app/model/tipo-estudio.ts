import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FormFieldConfiguration } from "../dynamic-forms/interfaces/form-field-configuration";
import { FormProvider } from "../dynamic-forms/interfaces/form-provider";
import { OptionElement } from "../dynamic-forms/interfaces/option-element";
import { Persistable } from "../dynamic-forms/persistable";
import { ApiService } from "../dynamic-forms/services/api.service";

export class TipoEstudio extends Persistable<TipoEstudio> implements FormProvider {

    id?: string;
    nombre?: string;

    constructor(apiService: ApiService, data?: any) {
        super('/api/tiposestudio', apiService);
        if (data) {
          this.id = data.id;
          this.nombre = data.nombre;
        }
    }
    toSelectData() {
        throw new Error("Method not implemented.");
    }
    getId(): string | number {
        return this.id!
    }

    getInstancedObjects(item: any): any {
        return new TipoEstudio(this.getApiService(),item);
    }

    anyToOption(item: any): OptionElement {
        const data = <TipoEstudio> item;
        return {value:data.id, label:data.nombre!}
    }
    getListUrl(): unknown {
        throw new Error("Method not implemented.");
    }
    getSubformGroupForm(): FormGroup<any> {
        throw new Error("Method not implemented.");
    }
    toTableData(): any {
        return {id:this.id ,nombre:this.nombre}
    }
    toSubformTableData() {
        throw new Error("Method not implemented.");
    }
    getEditGroupForm(): FormGroup {
        return new FormGroup({
            nombre: new FormControl(this.nombre,[Validators.required, Validators.minLength(2),Validators.maxLength(20)]),
        })
    }
    getCreateGroupForm(): FormGroup {
        return new FormGroup({
            nombre: new FormControl('', [Validators.required, Validators.minLength(2),Validators.maxLength(20)]),
        })
    }
    getListOptions(): FormFieldConfiguration[] {
        return [{
            formFieldType:'text',
            type:'text',
            col:4,
            row:1,
            formFieldLabel:'Nombre',
            errorMessage:'Ingrese un nombre entre 2 y 20 caracteres',
            formControlName:'nombre',
            placeholder:'Nombre',
        }]
    }
    getUrl(): string {
        throw new Error("Method not implemented.");
    }
}
