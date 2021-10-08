import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json'
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DatePipe, formatDate } from '@angular/common';

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
      tap(response =>{
        let clientes = response as Cliente[];
        clientes.forEach( c => console.log(c))
      }),
      map(response => {
        let clientes = response as Cliente[];
        return clientes.map(c => {
          c.nombre = c.nombre.toUpperCase();
          //c.apellido = c.apellido.toUpperCase();
          let datePipe = new DatePipe('CO')
         // c.createAt = datePipe.transform(c.createAt, 'EEEE dd,MMMM yyyy');
         // c.createAt = formatDate(c.createAt, 'dd-MM-yyyy', 'en-US')
          return c;
        });
      })
    );
  }
  
  createCliente(cliente:Cliente): Observable<Cliente> {

    return this.http.post(this.urlEndPoint,cliente, {headers: this.httpHeaders}).pipe(
      map((response:any) => response.cliente as Cliente),     
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
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
        if (e.status == 400) {
          return throwError(e);
        }
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
