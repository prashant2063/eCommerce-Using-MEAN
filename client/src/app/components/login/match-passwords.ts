import { FormGroup } from '@angular/forms';

export function matchPassword(password, rePassword){
    return (control: FormGroup) => {
        if (!control) {
            return null;
        }
        // console.log(control.get(password).value === control.get(rePassword).value ? null : { matchPassword: true });
        return control.get(password).value === control.get(rePassword).value ? null : { matchPassword: true };
    };
}