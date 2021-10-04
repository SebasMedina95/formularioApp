import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

  //Manera normal de hacerlo, pero, hay una mejor :v
  // miFormulario : FormGroup = new FormGroup({
  //   'producto'    : new FormControl('NVIDIA RTX 3080ti'),
  //   'precio'      : new FormControl('8600000'),
  //   'existencias' : new FormControl('4')
  // })

  //Por que entre [ ] ? por que primero va el valor, luego la validacion normal y luego validación asíncrona.
  miFormulario : FormGroup = this.fb.group({
    producto    : [ , [Validators.required, Validators.minLength(3)] ],
    precio      : [ , [Validators.min(0), Validators.required] ],
    existencias : [ , [Validators.min(0), Validators.required] ]
  })
  
  constructor( private fb : FormBuilder ) { } //Inyectamos FormBuilder para trabajar FormGroup mucho mas fácil.

  ngOnInit(): void {  
    this.miFormulario.reset({
      producto    : 'Laptop MSI Katana',
      precio      : 7950000,
      existencias : 3
    })   
  }

  campoEsValido( campo : string) : boolean | null{
    return this.miFormulario.controls?.[campo].errors && this.miFormulario.controls?.[campo].touched;
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
