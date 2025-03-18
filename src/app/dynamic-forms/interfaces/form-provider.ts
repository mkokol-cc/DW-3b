import { FormGroup } from "@angular/forms";
import { FormFieldConfiguration } from "./form-field-configuration";
import { OptionElement } from "./option-element";

export interface FormProvider {

    getId():string|number

    anyToOption(item: any): OptionElement;
    //getListUrl(): unknown;
    //getSubformGroupForm(): FormGroup<any>;
    toTableData(): any;
    toSelectData(): any;
    //toSubformTableData(): any;
    getEditGroupForm(): FormGroup;
    getCreateGroupForm():FormGroup;
    getListOptions():FormFieldConfiguration[];
    //getUrl():string;

    getInstancedObjects(item:any):any;
  }