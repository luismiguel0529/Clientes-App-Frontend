import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json'
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint:string = "http://localhost:8080/api/clientes";
  private httpHeaders = new HttpHeaders({'Content-type':'application/json'})

  constructor(private http:HttpClient) { }


  getClientes(): Observable<Cliente[]>{
    //return of(CLIENTES);
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Cliente[])
    );
  }

  createCliente(cliente:Cliente): Observable<Cliente> {

    return this.http.post(this.urlEndPoint,cliente, {headers: this.httpHeaders}).pipe(
      map(response => response as Cliente)
    );
  }

  getCliente(id: number): Observable<Cliente>{
    return this.http.get(`${this.urlEndPoint}/${id}`).pipe(
      map( response => response as Cliente)
    );
  } 

  updateCliente(cliente: Cliente): Observable<Cliente>{
    return this.http.put(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      map(response=> response as Cliente)
    )
  }

  deleteCliente(id: number): Observable<Cliente>{
    return this.http.delete(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      map( response => response as Cliente)
    )
  }
}
