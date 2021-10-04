import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  public nombreApellidoPatron : string = '([a-zñáéíóúA-ZÑÁÉÍÓÚ ]+)';
  public emailPatron          : string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  noPuedeSerStrider (control : FormControl) : ValidationErrors | null {
      const val : string = control.value?.trim().toLowerCase();
      console.log(val);
      if(val === "strider"){
        return {
          noStrider : true
        }
      }else{
        return null;
      }
  }

  camposIguales( campo1 : string , campo2 : string ){
      return ( formGroupParam : AbstractControl ) :  ValidationErrors | null => {
        //console.log(formGroupParam);
        const pass1 = formGroupParam.get(campo1)?.value;
        const pass2 = formGroupParam.get(campo2)?.value;

        if(pass1 !== pass2){
          formGroupParam.get(campo2)?.setErrors({passNoIguales : true}); //Asignamos a la propiedad confirmarPass que viene siendo el campo2 el error que se podría estar generando.
          return { passNoIguales : true };
        }

        //Tengamos cuidado por si, de pronto, este campo2 tendría otra validación, si es el caso, entonces esto que veremos a continuación también lo purgaría.
        formGroupParam.get(campo2)?.setErrors(null); //Si ya dado el caso, luego de disparado el error son iguales, entonces que desaparezca el error.
        return null;
      }
  }

  constructor() { }
}
