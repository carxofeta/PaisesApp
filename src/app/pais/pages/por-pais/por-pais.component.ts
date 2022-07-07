import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';

import { Country } from '../../interfaces/pais.interface';
//import { PaisInputComponent } from '../../components/pais-input/pais-input.component';

@Component({
   templateUrl: './por-pais.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `
  ]
})
export class PorPaisComponent {
  
  termino: string = "";
  hayError: boolean = false;
  paises: Country[] = [];

  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;

  constructor( private paisService: PaisService ) { }

  buscar( termino: string ) {

    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = false;

    // this.paisService.buscarPais( this.termino )
    //   .subscribe( (resp) => {
    //     console.log( resp );
    //   }, (err) => {
    //     this.hayError = true;
    //   });

    this.paisService.buscarPais( this.termino )
      .subscribe ({
        next: (paises) => {
          //console.log(paises);
          this.paises = paises;
        },
        error: (err) => {
          this.hayError = true;
          this.paises = [];
        }
      });
  }

  sugerencias ( termino: string ) {
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;

    this.paisService.buscarPais( termino )
      .subscribe({
        next: (paises) => {
          this.paisesSugeridos = paises.splice( 0,5 );
        },
        error: (err) => {
          this.paisesSugeridos = [];
        }
      }); 
  }

  buscarSugerido( termino: string ) {
    this.buscar( termino );
  }

}
