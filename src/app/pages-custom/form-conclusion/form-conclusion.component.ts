import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';
import { FileSelectorComponent } from '../file-selector/file-selector.component';
import { Observable, startWith, map } from 'rxjs';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ApiService } from '../../dynamic-forms/services/api.service';
import { Cliente } from '../../model/cliente';
import { Paciente } from '../../model/paciente';
import { MatIconModule } from '@angular/material/icon';
import {CdkDragDrop, moveItemInArray, CdkDrag, CdkDropList} from '@angular/cdk/drag-drop';
import { MatChipsModule } from '@angular/material/chips';
import { PdfViewerComponent } from '../pdf-viewer/pdf-viewer.component';
import { AutocompleteDynamicFieldComponent } from '../../dynamic-forms/inputs/autocomplete-dynamic-field/autocomplete-dynamic-field.component';
import { OptionElement } from '../../dynamic-forms/interfaces/option-element';

@Component({
  selector: 'app-form-conclusion',
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FileSelectorComponent,

    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,

    MatAutocompleteModule,
    MatSelectModule,

    AsyncPipe,

    MatIconModule,


    MatChipsModule, CdkDropList, CdkDrag,

    PdfViewerComponent,

  ],
  templateUrl: './form-conclusion.component.html',
  styleUrl: './form-conclusion.component.scss'
})
export class FormConclusionComponent implements OnInit {

  formPaso1 = this._formBuilder.group({
    cliente: [null, Validators.required],
    paciente: [null, Validators.required],
  });
  formPaso2 = this._formBuilder.group({
    conclusion: ['', Validators.required],
  });

  clientes:Cliente[] = []
  pacientes:Paciente[] = []
  pacientesFiltrados:Paciente[] = []

  constructor(private _formBuilder: FormBuilder, private service:ApiService) {
    this.getClientes()
    this.getPacientes()
  }

  getClientes(){
    this.service.list('api/clientes',{}).subscribe(obj=>{
      this.clientes = obj.map((item: any) => new Cliente(this.service,item))
      console.log(this.clientes)
    })
  }
  getPacientes(){
    this.service.list('api/pacientes',{}).subscribe(obj=>{
      this.pacientes = obj.map((item: any) => new Paciente(this.service,item))
      this.pacientesFiltrados = [];
      console.log(this.pacientes)
    })
  }
  filterPacientes(idCliente?:string){
    this.pacientesFiltrados = idCliente ? this.pacientes.filter(paciente => paciente.cliente!.toString() === idCliente) : [];
    console.log(this.pacientesFiltrados)
  }

  myControl = new FormControl('');
  filteredOptions!: Observable<Paciente[]>;

  ngOnInit() {
    this.formPaso1.get('cliente')!.valueChanges.subscribe(value=>{
      const v = value ? <Cliente>value : null
      const idCliente = v?.getId()
      this.filterPacientes(idCliente ? idCliente.toString() : '')
    })
    this.filteredOptions = this.formPaso1.get('paciente')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): Paciente[] {
    const filterValue = value.toLowerCase();
    return this.pacientesFiltrados.filter(p => 
      p.dni?.toString().toLowerCase().includes(filterValue) ||
      p.nombre?.toLowerCase().includes(filterValue) ||
      p.apellido?.toLowerCase().includes(filterValue)
    );
  }

  displayFn(paciente: Paciente): string {
    return paciente && paciente.apellido && paciente.nombre ? `${paciente.apellido}, ${paciente.nombre}` : '';
  }

  
  files: any[] = [
    {name: 'Electrocardiograma', doc:'pdf1.pdf'},
    {name: 'Audiometría', doc:'pdf2.pdf'},
    {name: 'Examen Físico', doc:'pdf3.pdf'},
    {name: 'Electroencefalograma', doc:'pdf4.pdf'},
    {name: 'Espirometría', doc:'pdf5.pdf'},
  ];

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.files, event.previousIndex, event.currentIndex);
  }

}
