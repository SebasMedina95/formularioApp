import { FormControl } from "@angular/forms";

export const nombreApellidoPatron : string = '([a-zñáéíóúA-ZÑÁÉÍÓÚ ]+)';
export const emailPatron          : string = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$";

export const noPuedeSerStrider = (control : FormControl) => {
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