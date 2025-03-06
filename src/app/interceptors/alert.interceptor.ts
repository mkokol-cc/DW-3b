import { HttpInterceptorFn } from '@angular/common/http';
import { AlertService } from '../services/alert.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs';


// Definimos los métodos HTTP permitidos como un tipo
type MetodoHttp = 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'GET';

// Mensajes personalizados según el método HTTP
const mensajes: Record<MetodoHttp, { exito?: string; error: string }> = {
  POST: {
    exito: 'Registro creado exitosamente.',
    error: 'Error al insertar el nuevo registro.',
  },
  PUT: {
    exito: 'Actualización realizada con éxito.',
    error: 'Error al actualizar el registro.',
  },
  DELETE: {
    exito: 'Registro eliminado correctamente.',
    error: 'Error al eliminar el registro.',
  },
  PATCH: {
    exito: 'Cambio aplicado con éxito.',
    error: 'Error al aplicar el cambio.',
  },
  GET: {
    error: 'Error al obtener los datos.',
  },
};

export const alertInterceptor: HttpInterceptorFn = (req, next) => {
  const alertService = inject(AlertService);
  return next(req).pipe(
    tap({
      next: () => {
        const metodo = req.method as MetodoHttp;  // Indicamos a TypeScript que solo puede ser un método definido
        if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(metodo)) {
          const mensajeExito = mensajes[metodo].exito;
          if (mensajeExito) alertService.response(mensajeExito, false);
        }
      },
      error: () => {
        const metodo = req.method as MetodoHttp;  // Indicamos a TypeScript que solo puede ser un método definido
        const mensajeError = mensajes[metodo]?.error || 'Error en la solicitud.';
        alertService.response(mensajeError, true);
      },
    })
  );
};
