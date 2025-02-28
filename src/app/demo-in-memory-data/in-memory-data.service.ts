import { Injectable } from '@angular/core';
import { InMemoryDbService, ResponseOptions, RequestInfo } from 'angular-in-memory-web-api';
import { Usuario } from '../model/usuario';
import { Cliente } from '../model/cliente';
import { Paciente } from '../model/paciente';
import { CLIENTES } from './data/cliente-data';
import { PACIENTES } from './data/paciente-data';
import { USUARIOS } from './data/usuario-data';
import { TipoEstudio } from '../model/tipo-estudio';
import { TIPO_ESTUDIO } from './data/tipo-estudio-data';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const clientes:Cliente[] = CLIENTES
    const pacientes:Paciente[] = PACIENTES
    const usuarios:Usuario[] = USUARIOS
    const tiposestudio:TipoEstudio[] = TIPO_ESTUDIO
    return { pacientes, clientes, usuarios, tiposestudio };
  }

  // Genera un nuevo ID automáticamente si no se proporciona en un POST
  genId<T extends { id?: number }>(collection: T[]): number {
    return collection.length > 0
      ? Math.max(...collection.map(item => item.id || 0)) + 1
      : 1;
  }
  
}
