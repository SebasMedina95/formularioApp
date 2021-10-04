import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { emailPatron, nombreApellidoPatron, noPuedeSerStrider } from 'src/app/shared/validation/validaciones';
import { ValidationService } from '../../../shared/validation/validation.service';
import { EmailValidatorService } from '../../../shared/validation/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  constructor( private fb : FormBuilder,
               private vs : ValidationService,
               private ev : EmailValidatorService ) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre        : 'Sebastian Medina',
      email         : 'test2@test.com',
      username      : 'sebas123',
      password      : '123456',
      confirmarPass : '123456'
    })
  }

  campoNombreNoValido( campo : string ){
    return this.miFormulario.get(campo)?.invalid && this.miFormulario.get(campo)?.touched;
  }

  // emailExiste(){
  //   return this.miFormulario.get('email')?.errors?.required && this.miFormulario.get('email')?.touched;
  // }

  // emailFormato(){
  //   return this.miFormulario.get('email')?.errors?.pattern && this.miFormulario.get('email')?.touched;
  // }
  
  // emailTomado(){
  //   return this.miFormulario.get('email')?.errors?.emailTomado && this.miFormulario.get('email')?.touched;
  // }

  get emailErrorMensaje() : string{
    const errors = this.miFormulario.get('email')?.errors;
    if(errors?.required){
      return 'El email es un campo obligatorio ...';
    }else if(errors?.pattern){
      return 'El valor ingresado no tiene formato de correo electrónico ...';
    }else if(errors?.emailTomado){
      return 'El email ingresado ya se encuentra en uso ...';
    }else{
      return '';
    }

  }


  miFormulario : FormGroup = this.fb.group({
    nombre        : ['', [Validators.required, Validators.pattern(this.vs.nombreApellidoPatron)]],
    email         : ['', [Validators.required, Validators.pattern(this.vs.emailPatron)], [this.ev]],
    username      : ['', [Validators.required, this.vs.noPuedeSerStrider]],
    password      : ['', [Validators.required, Validators.minLength(6)]],
    confirmarPass : ['', [Validators.required]]
  }, {
    validators : [ this.vs.camposIguales('password', 'confirmarPass') ]
  });

  submitFormulario(){
    console.warn(this.miFormulario.value);
    this.miFormulario.markAllAsTouched(); //Para que nos marque todos los errores que podrían estar ocurriendo en el formulario.
  }

}
