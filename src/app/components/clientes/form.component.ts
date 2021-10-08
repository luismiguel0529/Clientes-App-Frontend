import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public cliente:Cliente = new Cliente();
  public titulo:string = "Crear cliente";
  public errores!: string[];

  constructor(private clienteService: ClienteService,
              private router: Router,
              private activateRouter: ActivatedRoute) { } 

  ngOnInit(): void {
    this.cargarCliente()
  }

  public cargarCliente():void{
    this.activateRouter.params.subscribe( params => {
      let id = params['id'];
      if(id){
        this.clienteService.getCliente(id).subscribe( (c) => this.cliente = c)
      }
    })
  }

  public createCliente():void {
    this.clienteService.createCliente(this.cliente).subscribe( 
      response =>  {
        this.router.navigate(['/clientes'])
        swal.fire('Nuevo Cliente', `Cliente ${this.cliente.nombre} creado con éxito`,'success') 
      },
      err => {
        this.errores = err.error.errors as string[];
      }
    );
  }

  public updateCliente():void{
    this.clienteService.updateCliente(this.cliente).subscribe(
        response => {
          this.router.navigate(['/clientes'])
          swal.fire("Cliente Actualizado",`Cliente ${response.cliente.nombre} actualizado con éxito`, 'success')
        },
        err => {
          this.errores = err.error.errors as string[];
        }
    )
  }

  public deleteCliente():void  {
    this.activateRouter.params.subscribe( params => {
      let id = params['id'];
      if(id){
        this.clienteService.deleteCliente(id).subscribe(
          response => {
            this.router.navigate(['/clientes'])
            swal.fire("Cliente Eliminado",`Cliente ${this.cliente.nombre} eliminado con éxito`, "success")
          }
        )
      }
    })
  }

}
