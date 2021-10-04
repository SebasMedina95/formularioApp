import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent implements OnInit {

  miFormulario : FormGroup = this.fb.group({
    persona    : [ '', [Validators.required, Validators.minLength(3)] ],
    favoritos  : this.fb.array( [
      [ 'Gears 5' ],
      [ 'Halo MCC' ],
      [ 'Zomby Army - Dead War 4' ]
    ], Validators.required )               
  });

  /**Para capturar los valores del formulario, podríamos ...
   * crear un valor nuevo para el formulario ...
   */
  nuevoFavorito : FormControl = this.fb.control('', Validators.required)

  get favoritosArray(){
    return this.miFormulario.get('favoritos') as FormArray; //Defino que favoritos es un FormArray.
  }

  constructor( private fb : FormBuilder ) { }

  ngOnInit(): void {
  }

  campoEsValido( campo : string) : boolean | null{
    return this.miFormulario.controls?.[campo].errors && this.miFormulario.controls?.[campo].touched;
  }

  agregarJuegoFavorito(){
    if(this.nuevoFavorito.invalid){
      alert('Llene el favorito para ingresar ...');
      return;
    }

    /**Me apoyo del get que hicimos, como todos los objetos en JS pasan por referencia, entonces podemos manipularlo aquí,
     * de igual modo, a pesar de que hablamos de un FormArray, los elementos internos siguen siento FormControls, por tanto
     * definimos la propiedad como agregaar un nuevo FormControl.
     */
    /** Si quisieramos hacerlo directamente con el formBuilder ...
     *  this.favoritosArray.push(this.fb.control(this.nuevoFavorito.value, Validators.required));
     */
    this.favoritosArray.push( new FormControl( this.nuevoFavorito.value , Validators.required ) );
    this.nuevoFavorito.reset();
  }

  quitarJuegoFavorito( elimi : number){
    this.favoritosArray.removeAt(elimi); /**Remuevo el control en una posición dada. */
  }

  guardar(){
    if( this.miFormulario.invalid ){
      this.miFormulario.markAllAsTouched();
      return;
    }
    console.warn(this.miFormulario.value);

    this.miFormulario.reset();
  }

}
