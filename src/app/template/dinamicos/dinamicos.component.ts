import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Persona {
  nombre    : string;
  favoritos : Favorito[];
}

interface Favorito {
  id : number;
  nombre : string;
}

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent implements OnInit {

  @ViewChild('miFormularioPersona') miFormularioVC! : NgForm;

  nuevoJuego : string = '';

  constructor() { }

  ngOnInit(): void {
  }

  persona : Persona = {
    nombre : 'Yulieth',
    favoritos : [
      { id : 1, nombre : 'Mario Kart' },
      { id : 2, nombre : 'Crash Bandicot' },
      { id : 3, nombre : 'Metal Slug' }
    ]
  }

  guardar(){
    console.log('Formulario Posteado.');
    this.miFormularioVC.resetForm();
  }

  quitarJuego( indice : number){
    this.persona.favoritos.splice(indice , 1); //Borramos desde el indice que envío, 1 sola posición.
  }

  agregarJuego(){
    const nuevoFavorito : Favorito = {
      id : this.persona.favoritos.length + 1,
      nombre : this.nuevoJuego
    };
    this.persona.favoritos.push({...nuevoFavorito}); //Usamos el SpreedOperator para mandarlo como un NUEVO OBJETO.
    this.nuevoJuego = '';
  }

}
