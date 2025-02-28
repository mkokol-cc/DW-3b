import { Component } from '@angular/core';
import { FormProvider } from '../../dynamic-forms/interfaces/form-provider';
import { ActivatedRoute } from '@angular/router';
import { TipoEstudio } from '../../model/tipo-estudio';
import { Usuario } from '../../model/usuario';
import { Paciente } from '../../model/paciente';
import { Cliente } from '../../model/cliente';

@Component({
  selector: 'app-gestion-crud',
  standalone: true,
  imports: [],
  templateUrl: './gestion-crud.component.html',
  styleUrl: './gestion-crud.component.scss'
})
export class GestionCrudComponent {
  entity!: string;
  edit!: boolean;
  data!:FormProvider[]

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Obtener el parámetro string desde la URL
    this.entity = this.route.snapshot.paramMap.get('entity')!;
    
    // Puedes recibir el booleano como parte de un query param
    this.route.queryParams.subscribe(params => {
      this.edit = params['edit'] === 'true'; // Convertir string a booleano
    });

    /*
    switch (this.entity) {
      case 'cliente':
        const obj1:Cliente = new Cliente();
        obj1.getAll(undefined).subscribe((response)=>{
          this.data = response.map((item: any) => new Cliente(item));
        })
        break;
      case 'paciente':
        const obj2:Paciente = new Paciente();
        obj2.getAll(undefined).subscribe((response)=>{
          this.data = response.map((item: any) => new Paciente(item));
        })
        break;
      case 'usuario':
        const obj3:Usuario = new Usuario();
        obj3.getAll(undefined).subscribe((response)=>{
          this.data = response.map((item: any) => new Usuario(item));
        })
        break;
      case 'tipo-estudio':
        alert('hola')
        const obj4:TipoEstudio = new TipoEstudio();
        obj4.getAll(undefined).subscribe((response)=>{
          this.data = response.map((item: any) => new TipoEstudio(item));
          console.log(this.data)
        })
        break;
    
      default:
        break;
    }*/
  }
}
