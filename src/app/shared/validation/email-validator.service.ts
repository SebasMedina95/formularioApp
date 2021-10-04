import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator { //Para la validación asincrona ...

  constructor( private http : HttpClient ) { }
  validate(control: AbstractControl) : Observable<ValidationErrors | null> {
    const email = control.value;
    return this.http.get<any[]>(`http://localhost:3000/usuarios?q=${email}`)
      .pipe(
        delay(500), //Si yo veo que hay algo que se está haciendo muy rápido y no me da tiempo para verlo, puedo aplicar un pipe delay para hacer un retardo.
        map ( resp => { //Recordemos que el map extrae la respuesta y nos permite usarla según lo que requerimos.
          return (resp.length === 0) ? null : { emailTomado : true }
        })
      )
  }




}
