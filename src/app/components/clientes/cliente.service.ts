import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json'
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint:string = "http://localhost:8080/api/clientes";
  private httpHeaders = new HttpHeaders({'Content-type':'application/json'})

  constructor(private http:HttpClient, private router:Router) { }


  getClientes(): Observable<Cliente[]>{
    //return of(CLIENTES);
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Cliente[])
    );
  }

  createCliente(cliente:Cliente): Observable<Cliente> {

    return this.http.post(this.urlEndPoint,cliente, {headers: this.httpHeaders}).pipe(
      map((response:any) => response.cliente as Cliente),     
      catchError(e => {
        this.router.navigate(['/clientes'])
        Swal.fire('Error al guardar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  getCliente(id: number): Observable<Cliente>{
    return this.http.get(`${this.urlEndPoint}/${id}`).pipe(
      map( response => response as Cliente),
      catchError(e => {
        this.router.navigate(['/clientes'])
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  } 

  updateCliente(cliente: Cliente): Observable<any>{
    return this.http.put(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      map(response=> response as any),      
      catchError(e => {
        this.router.navigate(['/clientes'])
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }

  deleteCliente(id: number): Observable<Cliente>{
    return this.http.delete(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      map( response => response as Cliente),
      catchError(e => {
        this.router.navigate(['/clientes'])
        Swal.fire('Error al eliminar', e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }
}
