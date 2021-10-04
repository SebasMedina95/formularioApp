import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

  //Input recibe un elemento que viene desde el componente padre.
  //Output emite un evento 
  //ViewChild para buscar un elemento, si queremos buscar en algo que tiene como referencia local, colocamos el nombre de esta sin el #
  @ViewChild('miFormulario') miFormularioVC! : NgForm;

  valorInicial = {
    producto    : '',
    precio      : 0,
    existencias : 1
  }
  
  
  constructor() { }

  ngOnInit(): void {
  }

  // guardarInfo(miFormulario : NgForm){
  //   console.warn(miFormulario.value);
  // }

  // Los ? que hay en miFormularioVC asi como en producto define que, la validación se efectua apenas tenga el elemento cargado.
  validarNombreProducto() : boolean{
    return this.miFormularioVC?.controls.producto?.invalid && this.miFormularioVC?.controls.producto?.touched
  }

  validarPrecioProducto() : boolean{
    return (this.miFormularioVC?.controls.precio?.value <= 0 && this.miFormularioVC?.controls.precio?.touched) ? true : false;
  }

  guardarInfo(){
    console.info(this.miFormularioVC);
    console.warn('********* POSTEO CORRECTO **********')
    this.miFormularioVC.resetForm({
      precio : 0, 
      existencias : 0
    }); ///Reseteamos el formulario, recordemos que hacemos referencia al ViewChild que esta obteniendo el formulario de su referencia.
  }

}
