import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  styleUrls: ['./directiva.component.css']
})
export class DirectivaComponent  {

  title = 'Bienvenido a Angular';

  curso: string = 'Curso Spring 5 Con Angular';

  profesor: string = 'Luis Miguel';

  listaCurso: string[] = ['TypeScript','JavaScript','Java','Python','Go'];
  
  habilitar: boolean = true;
  constructor() { }

  setHabilitar(): void {
    this.habilitar = !this.habilitar;
  }
}
