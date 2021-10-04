import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [
  ]
})
export class SwitchesComponent implements OnInit {

  constructor( private fb : FormBuilder ) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      ...this.persona, 
      terminosCondic : false
    });

    //RXJS para tener el valiue y lo demás sincronizado.
    this.miFormulario.valueChanges.subscribe (formulario => {  //Si quieramos desestructurar formulario ({ condiciones, ...rest }) quitamos condiciones y dejamos el resto.
      delete formulario.terminosCondic; //Quitamos el que trabajamos independiente
      this.persona = formulario;
      console.log(formulario)
    })

    //Si deseo ver en tiempo real los cambios de alguno en específico.
    //this.miFormulario.get('condiciones')?.valueChanges.subscribe( nuevoValor => { console.log(nuevoValor) } )

  }

  persona = {
    genero : 'F',
    notificaciones : true,
    //terminosCondic : false
  }
  /**Puedo definir a través del objeto los valores iniciales también, es otra forma. */
  miFormulario : FormGroup = this.fb.group({
    genero         : [ this.persona.genero , Validators.required ],
    notificaciones : [ this.persona.notificaciones , Validators.required ],
    terminosCondic : [ '' , Validators.requiredTrue ]
  });

  guardar(){
    const formValue = {... this.miFormulario.value};
    delete formValue.terminosCondic; //Para que no nos aparezca terminosCondic que lo trabajaremos aparte.
    console.warn(formValue);
    this.persona = formValue;
  }


}
