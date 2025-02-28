import { Observable, throwError } from "rxjs";
import { ApiService } from "./services/api.service";


export class Persistable<T> {
  
    private apiService: ApiService;
    
    constructor(private url: string, apiService: ApiService) {
      this.apiService = apiService
    }

    protected getApiService(): ApiService {
      return this.apiService;  // <-- Método para acceder a apiService
    }
  
    create(data: Partial<T>): Observable<T> {
      return this.apiService.create(this.url, data);
    }
  
    update(data: Partial<T>, id: string|number): Observable<T> {
      return this.apiService.edit(this.url+'/'+id, data);
    }
  
    getAll(filters: any = {}): Observable<T[]> {
      return this.apiService.list(this.url, filters);
    }
  
    getById(id: string | number): Observable<T> {
      return this.apiService.getById(`${this.url}/${id}`);
    }
  
    delete(id: string | number): Observable<void> {
      return this.apiService.delete(`${this.url}/${id}`);
    }
  }